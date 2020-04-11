/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'react-native';
import Mam from '@iota/mam';
import crypto from 'crypto';
import {asciiToTrytes} from '@iota/converter';
import axios from 'axios';
import iotaConfig from '../../../config';
import api from '../../../utils/api';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CancelIcon from 'react-native-vector-icons/MaterialIcons';

// Random Key Generator
const generateRandomKey = length => {
  // return 'ABCDABCD9ABCDABCD9ABCDABCD9ABCDABCD9ABCDABCD9ABCDABCD9ABCDABCD9ABCDABCD9ABCDABCD9';
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
  const values = crypto.randomBytes(length);
  return Array.from(
    new Array(length),
    (x, i) => charset[values[i] % charset.length],
  ).join('');
};

export const publishData = async (
  userId,
  username,
  packet,
  loadingHandler,
  showToast,
  progress,
) => {
  try {
    const res = await api.get('getSk', {userId, username});
    if (!res) {
      return;
    }
    progress(0.4, 'waiting for api...');
    const {sk} = res;

    // Initialise MAM State
    let mamState = Mam.init(iotaConfig.provider);

    // const time = Date.now();
    // const packet = {time, data: {name: 'Ahmed'}};

    // Change MAM encryption key on each loop
    let mamKey = generateRandomKey(81);

    // Set channel mode & update key
    mamState = Mam.changeMode(mamState, 'restricted', mamKey);

    // Create Trytes
    const trytes = asciiToTrytes(JSON.stringify(packet));

    // Get MAM payload
    const message = Mam.create(mamState, trytes);

    // Save new mamState
    mamState = message.state;

    console.log(message, message.root);
    // Attach the payload.
    await Mam.attach(message.payload, message.address);
    progress(0.8, 'attaching mam...');

    await storeKeysOnFirebase(
      sk,
      username,
      {
        sidekey: mamKey,
        root: message.root,
        time: packet.time,
      },
      showToast,
    );
    progress(1, 'Sent!');
    console.log('Data published');
  } catch (e) {
    console.log('error', e);
    showToast(
      toastGenerator('Error occured while publishing data to tangle', false),
      'red',
    );
  } finally {
    loadingHandler(false);
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
    showToast(toastGenerator('Data published successfully', true));
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
