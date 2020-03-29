import Mam from '@iota/mam';
import crypto from 'crypto';
import {asciiToTrytes} from '@iota/converter';
import axios from 'axios';
import iotaConfig from '../../../config';
import api from '../../../utils/api';

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
) => {
  try {
    const res = await api.get('getSk', {userId, username});
    if (!res) {
      return;
    }
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
    console.log('Data published');
  } catch (e) {
    console.log('error', e);
    showToast('Error occured while publishing data to tangle');
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
    showToast('Data published successfully');
  } catch (e) {
    console.log(e);
    showToast('Error occured while storing keys to firestore');
  }
};
