import GoogleFit from 'react-native-google-fit';
import {CheckInternet} from '../../../../utils/checkInternet';

export const stepsRetrieverFunc = async retrieveOptions => {
  if ((await CheckInternet()) === false) {
    return false;
  }
  let steps = 0;
  await GoogleFit.getDailyStepCountSamples(retrieveOptions)
    .then(res => {
      for (let i = 0; i < res.length; i++) {
        res[i].source === 'com.google.android.gms:estimated_steps'
          ? res[i].steps.length !== 0
            ? (steps = res[i].steps[0].value)
            : null
          : null;
      }
    })
    .catch(err => {
      console.log(err);
    });
  return steps;
};
