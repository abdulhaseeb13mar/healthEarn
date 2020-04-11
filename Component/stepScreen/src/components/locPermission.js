import {PermissionsAndroid} from 'react-native';
export const requestLocationPermissionFunc = async () => {
  try {
    const fineGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (fineGranted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the fine location');
      return true;
    } else {
      console.log('Location permission denied');
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
