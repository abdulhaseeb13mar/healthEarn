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
    console.log(obj);
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

// export const register = async (name, email, password) => {
//   let user;
//   try {
//     user = await firebase
//       .auth()
//       .createUserWithEmailAndPassword(email, password);
//     // persistLoginInfo(true);
//     await user.user.updateProfile({
//       displayName: name,
//     });
//     await createUserHealthProfile({...user.user, name});
//     // await firebase.auth().currentUser.sendEmailVerification();
//   } catch ({code, message}) {
//     console.log('exception -> ', {code, message});
//     return {status: false, message, code};
//   }

//   return {status: true, message: user};
// };

// export const login = async (email, password) => {
//   let user;

//   try {
//     user = await firebase.auth().signInWithEmailAndPassword(email, password);
//     persistLoginInfo(true);
//   } catch ({code, message}) {
//     console.log('exception -> ', {code, message});
//     return {status: false, message, code};
//   }

//   return {status: true, message: user};
// };

// export const onAuthStateChanges = async () => {
//   await firebase.auth().onAuthStateChanged(user => {

//     return user;
//   });

// };
