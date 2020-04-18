/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import moment from 'moment';
import {Text} from 'react-native';
import Mam from '@iota/mam';
import crypto from 'crypto';
import {asciiToTrytes} from '@iota/converter';
import axios from 'axios';
import iotaConfig from '../../../config';
import api from '../../../utils/api';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CancelIcon from 'react-native-vector-icons/MaterialIcons';
import {SetLastSyncAsyncStorageFunc} from './components/setLastSync(asyncStorage)';
import {setUserLastSync} from '../../Firebase/index';

const generateRandomKey = length => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
  const values = crypto.randomBytes(length);
  return Array.from(
    new Array(length),
    (x, i) => charset[values[i] % charset.length],
  ).join('');
};

const faker = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    });
  });

export const publishData = async (
  userId,
  username,
  packet,
  showToast,
  progress,
) => {
  try {
    let secretKey;
    let message;
    let mamKey;
    let res;
    await progress(0, 'awaiting for api...');
    await faker();
    res = await api.get('getSk', {userId, username});
    if (!res) {
      return;
    }
    let {sk} = res;
    secretKey = sk;
    // Initialise MAM State
    let mamState = Mam.init(iotaConfig.provider);
    await progress(20, 'Generating Key...');
    await faker();
    // Change MAM encryption key on each loop
    mamKey = generateRandomKey(81);
    // Set channel mode & update key
    mamState = Mam.changeMode(mamState, 'restricted', mamKey);
    // Create Trytes
    const trytes = asciiToTrytes(JSON.stringify(packet));
    // Get MAM payload
    await progress(30, 'Creating Message...');
    await faker();
    message = Mam.create(mamState, trytes);
    // Save new mamState
    mamState = message.state;
    console.log(message, message.root);
    // Attach the payload.
    await progress(70, 'attaching mam...');
    await faker();
    await Mam.attach(message.payload, message.address, 3, 10);
    await progress(80, 'storing key...');
    await faker();
    SetLastSyncAsyncStorageFunc(moment(packet.time).format());
    await setUserLastSync(userId, username, packet.time);
    await faker();
    await storeKeysOnFirebase(
      secretKey,
      username,
      {
        sidekey: mamKey,
        root: message.root,
        time: packet.time,
      },
      showToast,
    );
    await progress(100, 'Sent!');
    await faker();
    console.log('Data published');
  } catch (e) {
    console.log('error', e);
    showToast(
      toastGenerator('Error occured while publishing data to tangle', false),
      'red',
    );
  }
};

const storeKeysOnFirebase = async (sk, username, packet, showToast) => {
  const sensorId = username;
  try {
    await axios.post(iotaConfig.firebaseEndPoint, {
      id: sensorId,
      packet,
      sk,
    });
    console.log('saved in firebase');
    showToast(
      toastGenerator(
        'Data published successfully for ' +
          moment(packet.time).format('DD-MM-YY'),
        true,
      ),
    );
  } catch (e) {
    console.log(e);
    showToast(
      toastGenerator('Error occured while storing keys to firestore', false),
      'red',
    );
  }
};

const toastGenerator = (message, success) => {
  return (
    <Text>
      {' '}
      <Text style={{color: 'white'}}>{message}</Text>{' '}
      {success ? (
        <CheckIcon name="check-circle" size={20} color="#4caf50" />
      ) : (
        <CancelIcon name="cancel" size={20} color="#9b0000" />
      )}
    </Text>
  );
};
