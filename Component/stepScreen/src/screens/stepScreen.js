/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Dimensions,
  Button,
} from 'react-native';
import GoogleFit from 'react-native-google-fit';
import AnimateNumber from 'react-native-countup';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-easy-toast';
import MaterialButtonViolet from '../components/MaterialButtonViolet';
import {publishData} from '../iota';
import {InitialPopup} from '../components/initialPopup';
import {SecondPopup} from '../components/secondPopup';
import {stepsRetrieverFunc} from '../components/stepsRetriever';
import {locationAuthorizeFunc} from '../components/locationAuthorize';

const HEIGHT = Dimensions.get('window').height;

const Untitled = props => {
  const [count, setCount] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabledRefreshBtn, setIsDisabledRefreshBtn] = useState(false);
  const [locationAllowed, setLocationAllowed] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [toastColor, setToastColor] = useState('black');
  const [initialPopup, setInitialPopup] = useState(false);
  const [secondPopup, setSecondPopup] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const toastRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    locationAuthorize();
    return () => {
      GoogleFit.unsubscribeListeners();
    };
  }, []);

  const locationAuthorize = async () => {
    const loc_perm = await locationAuthorizeFunc();
    setLocationAllowed(loc_perm);
    stepsRetriever();
  };

  //--------------------retrieve steps----------------------------
  const stepsRetriever = async () => {
    const steps = await stepsRetrieverFunc();
    setCount(steps);
    setTimeout(() => {
      setIsDisabledRefreshBtn(false);
    }, 3500);
    setIsLoading(false);
  };

  const publishDataHandler = () => {
    setIsPublishing(true);
    const time = Date.now();
    const {name, uid} = props.currentUser;

    // More fields in future would be added here after its structure being pushed
    // in devices -> sesnorId -> dataTypes
    const packet = {
      'No of Steps': count,
    };

    publishData(
      uid,
      name,
      {time, data: packet},
      setIsPublishing,
      showToast,
      progress,
    );
  };

  const progress = (value, message) => {
    setProgressValue(value);
    setProgressMessage(message);
  };

  const showToast = (message, type = 'black', duration = 10000) => {
    setToastColor(type);
    toastRef.current.show(message, duration);
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={10}
      behavior="padding"
      style={{flex: 1}}>
      <Toast
        ref={toastRef}
        style={{
          backgroundColor: toastColor,
          borderRadius: 10,
        }}
      />
      <SafeAreaView>
        {initialPopup ? (
          <Modal style={styles.modal} isVisible={true}>
            {secondPopup ? (
              <SecondPopup message={progressMessage} progress={progressValue} />
            ) : (
              <InitialPopup
                nextPopup={() => {
                  setSecondPopup(true);
                  publishDataHandler();
                }}
              />
            )}
          </Modal>
        ) : null}

        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Text style={styles.UpperLine}>Hello {props.currentUser.name}</Text>
            <Text style={styles.UpperLine}>Today you have walked:</Text>
            <Text style={styles.stepsLine}>
              <Text style={styles.loremIpsum}>
                {isLoading ? (
                  <Text>0</Text>
                ) : (
                  <AnimateNumber
                    value={count}
                    interval={14}
                    timing={(interval, progress) => {
                      return interval * (1 - Math.sin(Math.PI * progress)) * 10;
                    }}
                    formatter={val => {
                      // eslint-disable-next-line radix
                      return parseInt(val);
                    }}
                  />
                )}
              </Text>
              <Text style={styles.stepsToday}>Steps</Text>
            </Text>
            <MaterialButtonViolet
              text="Refresh"
              onPress={() => {
                setIsLoading(true);
                setIsDisabledRefreshBtn(true);
                stepsRetriever();
              }}
              isDisabled={isDisabledRefreshBtn}
              style={styles.materialButtonViolet}
            />
            <MaterialButtonViolet
              text="Send Data"
              onPress={publishDataHandler}
              style={styles.materialButtonViolet}
              isDisabled={isPublishing}
            />
          </View>
        </View>
        <View>
          <Icon
            name="menu"
            size={40}
            onPress={() => props.navigation.openDrawer()}
          />
        </View>
        {locationAllowed ? null : (
          <View style={styles.popup}>
            <Text style={styles.popupText}>
              You have not allowed Location Permission!{' '}
            </Text>
            <Button title="ALLOW" color="#3F51B5" />
          </View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  innerContainer: {
    marginTop: 50,
  },
  modal: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  stepsLine: {
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  loremIpsum: {
    color: '#121212',
    justifyContent: 'space-between',
    fontSize: 111,
    fontFamily: 'roboto-regular',
    marginTop: 10,
    alignSelf: 'center',
  },
  stepsToday: {
    color: '#121212',
    fontSize: 25,
    fontFamily: 'arial-regular',
    marginTop: 1,
    alignSelf: 'center',
  },
  UpperLine: {
    color: '#121212',
    fontSize: 30,
    fontFamily: 'arial-regular',
    marginTop: 15,
    alignSelf: 'center',
  },
  materialButtonViolet: {
    width: 140,
    height: 44,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowColor: 'rgba(0,0,0,1)',
    marginTop: 15,
    alignSelf: 'center',
  },
  popup: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 60,
    backgroundColor: 'black',
    color: 'white',
    bottom: 0,
    top: HEIGHT - 60,
    opacity: 0.8,
  },
  popupText: {
    color: 'white',
    fontSize: 14,
  },
});

export default React.memo(Untitled);
