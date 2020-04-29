import NetInfo from '@react-native-community/netinfo';

export const CheckInternet = () => {
  NetInfo.fetch().then(state => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
    console.log('Details ', state.details);
  });
};

// import React from 'react';
// import {Alert, NetInfo, Platform} from 'react-native';

// export const CheckInternet = () => {
//   // for Android
//   if (Platform.OS === 'android') {
//     NetInfo.isConnected.fetch().then(isConnected => {
//       if (isConnected) {
//         Alert.alert('You are online!');
//       } else {
//         Alert.alert('You are offline!');
//       }
//     });
//   } else {
//     // For iOS devices
//     NetInfo.isConnected.addEventListener(
//       'connectionChange',
//       handleFirstConnectivityChange,
//     );
//   }

//   const handleFirstConnectivityChange = isConnected => {
//     NetInfo.isConnected.removeEventListener(
//       'connectionChange',
//       this.handleFirstConnectivityChange,
//     );

//     if (isConnected === false) {
//       Alert.alert('You are offline!');
//     } else {
//       Alert.alert('You are online!');
//     }
//   };
// };
