import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA8zuDkFpCatxEyHTjOqypps31UXUyadms',
  authDomain: 'iota-data-marketplace-b074f.firebaseapp.com',
  databaseURL: 'https://iota-data-marketplace-b074f.firebaseio.com',
  projectId: 'iota-data-marketplace-b074f',
  storageBucket: 'iota-data-marketplace-b074f.appspot.com',
  messagingSenderId: '112257821766',
  appId: '1:112257821766:web:8fdc78b242ef30b7ca6e47',
  measurementId: 'G-94VJJGCX7T',
};

firebase.initializeApp(firebaseConfig);
export default firebase;
