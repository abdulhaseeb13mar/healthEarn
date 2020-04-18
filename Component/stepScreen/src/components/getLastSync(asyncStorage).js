import {AsyncStorage} from 'react-native';
export const GetLastSyncAsyncStorageFunc = async () => {
  let lastSync;
  await AsyncStorage.getItem('LatestUpdate', (_err, result) => {
    lastSync = result;
  });
  return lastSync;
};
