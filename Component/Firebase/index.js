import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import api from '../../utils/api';
import moment from 'moment';

export const register = async (name, email, password) => {
  let userStatus;
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(createdUser => {
      createdUser.user.updateProfile({
        displayName: name,
      });
      userStatus = {status: true, ...createdUser};
    })
    .catch(err => {
      userStatus = {status: false, message: err.message};
    });
  return userStatus;
};

export const checkUsername = async name => {
  try {
    const docRef = firebase
      .firestore()
      .collection('devices')
      .doc(name);
    const doc = await docRef.get();
    return doc.exists;
  } catch (e) {
    console.log('error occured while checking username', e);
  }
};

export const createUserHealthProfile = async user => {
  try {
    const obj = await api.get('user', {userId: user.uid});
    const {apiKey} = obj;
    // Assign to user
    const profile = {
      sensorId: user.name,
      type: 'health',
      healthData: true,
      buyers: [],
      dataTypes: [{id: 'steps', name: 'No Of Steps', unit: ''}],
      price: 100,
      date: moment().format('DD MMMM, YYYY H:mm a'),
      lastSynced: moment()
        .subtract(1, 'days')
        .valueOf(),
      subscribers: [],
    };

    profile.owner = user.uid;
    // Deactivate the Device
    profile.inactive = true;

    const packet = {
      apiKey,
      id: profile.sensorId,
      device: profile,
    };

    // Call server
    await api.post('newDevice', packet);
  } catch (e) {
    console.log(e);
  }
};

export const setUserLastSync = async (uId, username, date) => {
  try {
    console.log('-----seting user last sync date on firebase-------------');
    console.log('Server lastsyncdate set is: ', date);
    const obj = await api.get('user', {userId: uId});
    const {apiKey} = obj;
    const packet = {
      apiKey: apiKey,
      uid: uId,
      username: username,
      lastSynced: date,
    };
    console.log(packet);
    const res = await api.post('setLastSynced', packet);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export const getUserLastSync = async name => {
  console.log('-----geting user last sync date from firebase-------------');
  const packet = {
    username: name,
  };
  const date = await api.post('getLastSynced', packet);
  return date.lastSynced;
};
