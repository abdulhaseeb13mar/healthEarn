import GoogleFit from 'react-native-google-fit';
import moment from 'moment';

export const stepsRetrieverFunc = async () => {
  let steps = 0;
  const retrieveOptions = {
    // startDate: new Date(
    //   moment()
    //     .subtract(1, 'day')
    //     .format('YYYY-MM-DD'),
    // ).toISOString(),
    //startDate: '2019-02-01T00:00:17.971Z',
    startDate: new Date(
      moment().format('YYYY-MM-DD' + 'T' + '00:00:00' + 'Z'),
    ).toISOString(),
    endDate: new Date().toISOString(),
  };

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
