import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

export const SecondPopup = props => (
  <View style={styles.container}>
    <View style={styles.innerContainer}>
      <View style={styles.topElement}>
        <Text style={styles.header}>Sending your Data to Tangle...</Text>
      </View>
      <View style={styles.bodyElement}>
        <Text style={styles.bodyText}>Date: {props.date}</Text>
      </View>
      <View style={styles.footerElement}>
        <Text style={styles.status}>
          {props.message ? props.message : 'Sending...'}
        </Text>
        <ProgressBar
          progress={props.progress / 100}
          borderWidth={2}
          width={200}
          color="#3F51B5"
          height={13}
          animationConfig={{bounciness: 10}}
        />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 30,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  topElement: {},
  bodyElement: {
    maxWidth: '94%',
  },
  footerElement: {},
  bodyText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  status: {
    textAlign: 'center',
    fontSize: 17,
    marginBottom: '1%',
  },
});
