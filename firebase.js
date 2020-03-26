import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig.json';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
