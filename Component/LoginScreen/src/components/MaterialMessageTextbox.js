/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';

function MaterialMessageTextbox(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text
        style={[
          styles.label,
          {
            color: props.error
              ? 'red'
              : props.success
              ? 'green'
              : 'rgba(0,0,0,0.6)',
          },
        ]}>
        {props.text1 || 'Label'}
      </Text>
      <TextInput
        placeholder={props.textInput1 || 'Input'}
        style={[
          styles.inputStyle,
          {
            borderBottomColor: props.error
              ? 'red'
              : props.success
              ? 'green'
              : '#D9D5DC',
          },
        ]}
      />
      {props.error ? (
        <Text
          style={[
            styles.helper1,
            {
              color: props.error ? 'red' : 'transparent',
            },
          ]}>
          Error message
        </Text>
      ) : null}
      {props.success ? (
        <Text
          style={[
            styles.helper2,
            {
              color: props.success ? 'green' : 'transparent',
            },
          ]}>
          Success message
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  label: {
    paddingTop: 16,
    fontSize: 12,
    fontFamily: 'roboto-regular',
    textAlign: 'left',
  },
  inputStyle: {
    width: 275,
    flex: 1,
    color: '#000',
    alignSelf: 'stretch',
    paddingTop: 8,
    paddingBottom: 8,
    borderColor: '#D9D5DC',
    borderBottomWidth: 1,
    fontSize: 16,
    fontFamily: 'roboto-regular',
    lineHeight: 16,
  },
  helper1: {
    paddingTop: 8,
    fontSize: 12,
    fontFamily: 'roboto-regular',
    textAlign: 'left',
  },
  helper2: {
    paddingTop: 8,
    fontSize: 12,
    fontFamily: 'roboto-regular',
    textAlign: 'left',
  },
});

export default MaterialMessageTextbox;
