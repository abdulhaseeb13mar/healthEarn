import NetInfo from '@react-native-community/netinfo';

export const CheckInternet = async () => {
  let internetStatus;
  await NetInfo.fetch().then(state => {
    if (state.isConnected === true && state.isInternetReachable === true) {
      internetStatus = true;
    } else {
      internetStatus = false;
    }
  });
  return internetStatus;
};
