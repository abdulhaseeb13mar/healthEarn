import PushNotification from 'react-native-push-notification';
import moment from 'moment';
export const LocalNotificationSchedule = () => {
  PushNotification.localNotificationSchedule({
    // date: new Date(Date.now() + 10 * 1000),
    date: new Date(
      moment()
        .startOf('date')
        .valueOf() +
        86400 * 1000,
    ),
    largeIcon: 'healthearnlogo',
    smallIcon: 'healthearnlogo',
    vibrate: true,
    vibration: 300,
    title: 'Another day came to an end',
    message: "Let's save it",
    playSound: true,
    soundName: 'mysound.mp3',
    repeatType: 'day',
  });
};
