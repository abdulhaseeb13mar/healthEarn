import GoogleFit from 'react-native-google-fit';
import moment from 'moment';

export const stepsRetrieverFunc = () => {
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

  GoogleFit.getDailyStepCountSamples(retrieveOptions)
    .then(res => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].source === 'com.google.android.gms:estimated_steps') {
          if (res[i].steps.length !== 0) {
            return res[i].steps[0].value;
          } else {
            return 0;
          }
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
};
