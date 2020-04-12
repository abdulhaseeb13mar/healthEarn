import {Alert} from 'react-native';
import GoogleFit from 'react-native-google-fit';
import localScopes from '../../../../scopes';
import {requestLocationPermissionFunc} from '../components/locPermission';

export const locationAuthorizeFunc = async () => {
  let loc_perm;
  const options = {
    scopes: [
      localScopes.FITNESS_ACTIVITY_READ_WRITE,
      localScopes.FITNESS_BODY_READ_WRITE,
    ],
  };
  await GoogleFit.authorize(options)
    .then(async authResult => {
      if (authResult.success) {
        loc_perm = await requestLocationPermissionFunc();
        if (loc_perm) {
          GoogleFit.startRecording(x => {
            // console.log(x);
          });
        }
      } else {
        return Alert.alert(
          'Alert!',
          'Please Select your account for Google Fit',
          [{text: 'OK', onPress: () => locationAuthorizeFunc()}],
          {cancelable: false},
        );
      }
    })
    .catch(e => {
      console.log(e);
    });
  return loc_perm;
};
