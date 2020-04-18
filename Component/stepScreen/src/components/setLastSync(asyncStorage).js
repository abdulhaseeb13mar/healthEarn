import {AsyncStorage} from 'react-native';
export const SetLastSyncAsyncStorageFunc = async latestDate => {
  await AsyncStorage.setItem('LatestUpdate', latestDate, err =>
    console.log('error :', err),
  );
};
