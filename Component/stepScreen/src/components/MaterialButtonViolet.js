/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

function MaterialButtonViolet(props) {
  return (
    <TouchableOpacity
      disabled={props.isDisabled}
      onPress={props.onPress}
      style={[
        styles.container,
        props.style,
        {
          backgroundColor: props.isDisabled ? '#a4afeb' : '#3F51B5',
        },
      ]}>
      <Text style={styles.caption}>Refresh</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3F51B5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 2,
    minWidth: 88,
    borderRadius: 2,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 5,
  },
  caption: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'roboto-regular',
  },
});

export default MaterialButtonViolet;
