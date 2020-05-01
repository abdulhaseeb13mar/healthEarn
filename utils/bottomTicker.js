/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';
import WarnIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const BottomTicker = props => (
  <View style={styles.popup}>
    <Text
      style={
        props.type === 'net'
          ? {...styles.popupText, fontSize: 17}
          : styles.popupText
      }>
      {props.message}{' '}
    </Text>
    {props.type === 'loc' ? (
      <Button title="ALLOW" color="#3F51B5" onPress={props.onPress} />
    ) : props.type === 'net' ? (
      <WarnIcon name="alert-circle" size={25} color="yellow" />
    ) : null}
  </View>
);

export default BottomTicker;

const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 60,
    backgroundColor: 'black',
    color: 'white',
    bottom: 0,
    top: HEIGHT - 60,
    opacity: 0.8,
  },
  popupText: {
    color: 'white',
    fontSize: 14,
  },
});
