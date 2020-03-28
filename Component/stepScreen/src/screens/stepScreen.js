/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  PermissionsAndroid,
  SafeAreaView,
  KeyboardAvoidingView,
  AsyncStorage,
  Dimensions,
  Button,
  Alert,
} from 'react-native';
import GoogleFit from 'react-native-google-fit';
import AnimateNumber from 'react-native-countup';
import moment from 'moment';
import MaterialButtonViolet from '../components/MaterialButtonViolet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-easy-toast';
import localScopes from '../../../../scopes';
import {publishData} from '../iota';

const HEIGHT = Dimensions.get('window').height;

const Untitled = props => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabledRefreshBtn, setIsDisabledRefreshBtn] = useState(false);
  const [locationAllowed, setLocationAllowed] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);

  const toastRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    locationAuthorize();
    return () => {
      GoogleFit.unsubscribeListeners();
    };
  }, []);

  const locationAuthorize = async () => {
    const options = {
      scopes: [
        localScopes.FITNESS_ACTIVITY_READ_WRITE,
        localScopes.FITNESS_BODY_READ_WRITE,
      ],
    };
    await GoogleFit.authorize(options)
      .then(async authResult => {
        if (authResult.success) {
          let loc_perm = await requestLocationPermission();
          if (loc_perm) {
            GoogleFit.startRecording(x => {
              console.log(x);
            });
          }
        } else {
          return Alert.alert(
            'Alert!',
            'Please Select your account for Google Fit',
            [{text: 'OK', onPress: () => locationAuthorize()}],
            {cancelable: false},
          );
        }
      })
      .catch(e => {
        console.log(e);
      });
    stepsRetriever();
  };

  const requestLocationPermission = async () => {
    try {
      const fineGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (fineGranted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the fine location');
        setLocationAllowed(true);
        return true;
      } else {
        console.log('Location permission denied');
        setLocationAllowed(false);
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  //--------------------retrieve steps----------------------------
  const stepsRetriever = () => {
    const retrieveOptions = {
      // startDate: new Date(
      //   moment()
      //     .subtract(1, 'day')
      //     .format('YYYY-MM-DD'),
      // ).toISOString(),
      //startDate: '2019-02-01T00:00:17.971Z',
      startDate: new Date(
        moment().format('YYYY-MM-DD' + 'T' + '00:00:00' + 'Z'),
      ).toISOString(),
      endDate: new Date().toISOString(),
    };

    GoogleFit.getDailyStepCountSamples(retrieveOptions)
      .then(res => {
        for (let i = 0; i < res.length; i++) {
          if (res[i].source === 'com.google.android.gms:estimated_steps') {
            res[i].steps.length !== 0
              ? setCount(res[i].steps[0].value)
              : setCount(0);
            setTimeout(() => {
              setIsDisabledRefreshBtn(false);
            }, 3500);
            setIsLoading(false);
            break;
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
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

    publishData(uid, name, {time, data: packet}, setIsPublishing, showToast);
  };

  const showToast = (message, duration = 3000) => {
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
          backgroundColor: '#3F51B5',
          borderRadius: 10,
        }}
      />
      <SafeAreaView>
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
