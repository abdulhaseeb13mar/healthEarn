/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import Toast from 'react-native-easy-toast';
import MaterialButtonViolet from './MaterialButtonViolet';
import WarnIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

export const InitialPopup = props => {
  const netInfo = useNetInfo();
  const toastRef = useRef(null);

  const nextPopupHandler = () => {
    netInfo.isConnected
      ? props.nextPopup()
      : toastRef.current.show(
          <Text>
            <Text style={{color: 'white'}}>No Internet Connection</Text>{' '}
            <WarnIcon name="alert-circle" size={20} color="yellow" />
          </Text>,
          2000,
        );
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.topElement}>
          <Text style={styles.header}>Send Your Data!</Text>
        </View>
        <View style={styles.bodyElement}>
          <Text style={styles.bodyText}>
            You have not sent your data after{' '}
            <Text style={styles.date}>
              {moment(props.lastSyncDate).format('DD MMMM YYYY')}
            </Text>
          </Text>
        </View>
        <View style={styles.footerElement}>
          <MaterialButtonViolet
            text="Send Data"
            style={styles.materialButtonViolet}
            onPress={nextPopupHandler}
          />
        </View>
      </View>
      <Toast
        ref={toastRef}
        style={{backgroundColor: 'black', borderRadius: 10, padding: 5}}
        position="center"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 30,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  topElement: {},
  bodyElement: {
    maxWidth: '94%',
  },
  footerElement: {
    width: '60%',
    height: '20%',
  },
  bodyText: {
    fontSize: 17,
    lineHeight: 30,
    textAlign: 'center',
  },
  materialButtonViolet: {
    height: '100%',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowColor: 'rgba(0,0,0,1)',
    borderRadius: 7,
    elevation: 5,
  },
  date: {
    fontWeight: 'bold',
  },
});
