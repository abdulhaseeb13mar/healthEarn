/* eslint-disable no-unused-vars */
import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  PermissionsAndroid,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Button,
  AsyncStorage,
} from 'react-native';
import MaterialButtonTransparentHamburger from '../components/MaterialButtonTransparentHamburger';
import MaterialButtonViolet from '../components/MaterialButtonViolet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialMessageTextbox from '../components/MaterialMessageTextbox';
import GoogleFit from 'react-native-google-fit';
import localScopes from '../../../../scopes';
import AnimateNumber from 'react-native-countup';
import moment from 'moment';
import {DoubleBounce} from 'react-native-loader';
import {createDrawerNavigator} from '@react-navigation/drawer';

function Untitled(props) {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    console.log('component mounted');
    setIsLoading(true);
    locationAuthorize();
    fetchUserToken();
    return () => {
      GoogleFit.unsubscribeListeners();
      console.log('will unmount');
    };
  }, []);

  async function locationAuthorize() {
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
        }
      })
      .catch(e => {
        console.log(e);
        Alert.alert('error');
      });
    stepsRetriever();
  }

  async function requestLocationPermission() {
    try {
      const fineGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'fine Location Permission',
          message: 'Allow Health Earn to Access your Location',
          //buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (fineGranted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the fine location');
        return true;
      } else {
        console.log('Location permission denied');
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

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
      endDate: new Date().toISOString(), // required ISO8601Timestamp
    };

    GoogleFit.getDailyStepCountSamples(retrieveOptions)
      .then(res => {
        console.log(res);
        //console.log(res[2].steps);
        for (let i = 0; i < res.length; i++) {
          if (res[i].source === 'com.google.android.gms:estimated_steps') {
            res[i].steps.length !== 0
              ? setCount(res[i].steps[0].value)
              : setCount(0);
            console.log(res[i].steps[0].value);
            setIsLoading(false);
            break;
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const clearUserToken = async () => {
    await AsyncStorage.multiRemove(['name', 'email', 'uid'], error =>
      console.log('clearData error:', error),
    );
    props.userToken();
  };

  const fetchUserToken = async () => {
    let userinfo = {};
    await AsyncStorage.multiGet(['name', 'email', 'uid'], (error, stores) => {
      console.log('fetch data erorr:', error);
      stores.map((_, i, store) => {
        userinfo = {...userinfo, [store[i][0]]: store[i][1]};
        console.log(userinfo);
      });
    });
    setCurrentUser(userinfo);
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={10}
      behavior="padding"
      style={{flex: 1}}>
      <SafeAreaView>
        <View style={styles.container}>
          {/* <MaterialButtonTransparentHamburger
            style={styles.materialButtonTransparentHamburger}
          /> */}
          <View style={styles.innerContainer}>
            <Text style={styles.UpperLine}>Hello {currentUser.name}</Text>
            <Text style={styles.UpperLine}>Today you have walked:</Text>
            <Text style={styles.stepsLine}>
              <Text style={styles.loremIpsum}>
                {isLoading ? (
                  <DoubleBounce size={15} color="#0000" />
                ) : (
                  <AnimateNumber
                    initial={1}
                    value={count}
                    interval={14}
                    timing={(interval, progress) => {
                      // slow start, slow end
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
              onPress={() => {
                setIsLoading(true);
                stepsRetriever();
              }}
              style={styles.materialButtonViolet}
            />
            {/* <Icon name="reload" style={styles.icon} /> */}
          </View>
        </View>
        <View>
          <Icon
            onPress={() => console.log(currentUser)}
            name="logout"
            size={40}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    marginTop: 50,
  },
  materialButtonTransparentHamburger: {
    width: 46,
    height: 44,
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
  icon: {
    color: 'rgba(128,128,128,1)',
    fontSize: 40,
    marginTop: -256,
    marginLeft: 285,
  },
  materialMessageTextbox: {
    width: 307,
    height: 120,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.01,
    marginTop: 207,
    alignSelf: 'center',
  },
});

export default React.memo(Untitled);
