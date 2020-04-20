/* eslint-disable react-native/no-inline-styles */
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
import moment from 'moment';
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
import {GetLastSyncAsyncStorageFunc} from '../components/getLastSync(asyncStorage)';
import {checkDateDifferenceFunc} from '../components/DifferenceDates';
import {getUserLastSync, setUserLastSync} from '../../../Firebase/index';
import {LocalNotification} from '../../../../Notifications/LocalPushNotification';

const HEIGHT = Dimensions.get('window').height;

const Untitled = props => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabledRefreshBtn, setIsDisabledRefreshBtn] = useState(false);
  const [locationAllowed, setLocationAllowed] = useState(true);
  const [toastColor, setToastColor] = useState('black');
  const [initialPopup, setInitialPopup] = useState(false);
  const [secondPopup, setSecondPopup] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const [dataDate, setDataDate] = useState('');
  const [lastSync, setLastSync] = useState('');
  const toastRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    locationAuthorize();
    CheckLastSyncDate();
    return () => {
      GoogleFit.unsubscribeListeners();
    };
  }, []);

  const CheckLastSyncDate = async () => {
    let lastServerSyncDate = await getUserLastSync(props.currentUser.name);
    console.log(
      'server date: ',
      lastServerSyncDate,
      moment(lastServerSyncDate).format('DD-MM-YYYY'),
    );
    let lastSyncDate = await GetLastSyncAsyncStorageFunc();
    console.log('Async Date: ', lastSyncDate);
    if (!lastSyncDate) {
      //this will be true in case of signIn
      lastSyncDate = lastServerSyncDate;
    } else if (lastServerSyncDate !== moment(lastSyncDate).valueOf()) {
      //this will be true incase of any server side problem in date update
      await setUserLastSync(
        props.currentUser.uid,
        props.currentUser.name,
        lastSyncDate,
      );
    }

    console.log('Async Date: ', lastSyncDate);
    const diff = checkDateDifferenceFunc(
      moment(lastSyncDate).format('YYYY-MM-DD'),
      moment().format('YYYY-MM-DD'),
    );
    console.log('mounted: ', lastSyncDate, diff);
    if (diff <= 1) {
      return;
    }
    setLastSync(lastSyncDate);
    setInitialPopup(true);
  };
  //-----------------authorize location--------------------------
  const locationAuthorize = async () => {
    const loc_perm = await locationAuthorizeFunc();
    setLocationAllowed(loc_perm);
    stepsRetriever();
  };

  //--------------------retrieve steps----------------------------
  const stepsRetriever = async () => {
    const steps = await stepsRetrieverFunc({
      startDate: new Date(
        moment()
          .startOf('day')
          .format(),
      ).toISOString(),
      endDate: new Date().toISOString(),
    });
    setCount(steps);
    setTimeout(() => {
      setIsDisabledRefreshBtn(false);
    }, 3500);
    setIsLoading(false);
  };

  const publishDataHandler = async date => {
    const steps = await stepsRetrieverFunc({
      startDate: new Date(
        moment(date)
          .startOf('day')
          .format(),
      ).toISOString(),
      endDate: new Date(
        moment(date)
          .endOf('day')
          .format(),
      ).toISOString(),
    });
    console.log(date, steps);
    const time = moment(date).valueOf();
    const {name, uid} = props.currentUser;

    // More fields in future would be added here after its structure being pushed
    // in devices -> sesnorId -> dataTypes
    const packet = {
      'No of Steps': steps,
    };

    await publishData(uid, name, {time, data: packet}, showToast, progress);
  };

  const progress = (value, message) => {
    setProgressValue(value);
    setProgressMessage(message);
    return true;
  };

  const showToast = (message, type = 'black', duration = 3000) => {
    setToastColor(type);
    toastRef.current.show(message, duration);
  };

  const testingDates = async () => {
    // await AsyncStorage.setItem(
    //   'LatestUpdate',
    //   moment('2020-04-15T07:59:23')
    //     .format('YYYY-MM-DD')
    //     .valueOf(),
    //   err => console.log('error :', err),
    // );
    const diff = checkDateDifferenceFunc(
      moment(lastSync).format('YYYY-MM-DD'),
      moment().format('YYYY-MM-DD'),
    );
    let updatedDate = moment(lastSync)
      .add(1, 'days')
      .format('YYYY-MM-DD');
    setDataDate(moment(updatedDate).format('DD MMMM YYYY'));
    for (let i = 0; i < diff - 1; i++) {
      await publishDataHandler(updatedDate);
      console.log('done, ', i);
      updatedDate = moment(updatedDate)
        .add(1, 'days')
        .format('YYYY-MM-DD');
      console.log('updatedDate: ', updatedDate);
      setDataDate(moment(updatedDate).format('DD MMMM YYYY'));
    }
    setTimeout(() => {
      setInitialPopup(false);
      setLastSync(updatedDate);
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={10}
      behavior="padding"
      style={{flex: 1}}>
      <SafeAreaView>
        {initialPopup ? (
          <Modal style={styles.modal} isVisible={true}>
            {secondPopup ? (
              <SecondPopup
                date={dataDate}
                message={progressMessage}
                progress={progressValue}
              />
            ) : (
              <InitialPopup
                lastSyncDate={lastSync}
                nextPopup={() => {
                  setSecondPopup(true);
                  testingDates();
                }}
              />
            )}
            <Toast
              ref={toastRef}
              style={{
                backgroundColor: toastColor,
                borderRadius: 10,
              }}
            />
          </Modal>
        ) : null}
        <View style={styles.hamburger}>
          <Icon
            name="menu"
            size={45}
            color="#3F51B5"
            onPress={() => props.navigation.openDrawer()}
          />
        </View>
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
                    // eslint-disable-next-line no-shadow
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
              text="Send Notification"
              onPress={() => LocalNotification()}
              style={styles.materialButtonViolet}
            />
            {/* <MaterialButtonViolet
              text="Date"
              onPress={testingDates}
              style={styles.materialButtonViolet}
            /> */}
          </View>
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
    marginTop: '5%',
    // borderColor: 'red',
    // borderStyle: 'solid',
    // borderWidth: 1,
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
    elevation: 13,
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
  hamburger: {
    marginLeft: '5%',
    marginTop: '3%',
  },
});

export default React.memo(Untitled);
