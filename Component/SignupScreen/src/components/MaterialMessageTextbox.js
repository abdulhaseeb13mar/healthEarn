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
        secureTextEntry={props.isPassword}
        placeholder={props.textInput1 || 'Input'}
        onChangeText={text => props.handleChange(text)}
        value={props.value}
        style={[
          styles.inputStyle,
          {
            borderBottomColor: props.error
              ? 'red'
              : props.success
              ? 'green'
              : '#3F51B5',
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
          {props.errorMessage}
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
    marginBottom: 0,
    fontSize: 15,
    fontFamily: 'roboto-regular',
    textAlign: 'left',
  },
  inputStyle: {
    width: '100%',
    flex: 1,
    color: '#000',
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 0,
    //borderColor: '#D9D5DC',
    borderBottomColor: '#3F51B5',
    borderBottomWidth: 2,
    fontSize: 16,
    fontFamily: 'roboto-regular',
    lineHeight: 16,
    height: 50,
  },
  helper1: {
    marginBottom: 0,
    fontSize: 12,
    fontFamily: 'roboto-regular',
    textAlign: 'left',
  },
  helper2: {
    marginTop: 8,
    fontSize: 12,
    fontFamily: 'roboto-regular',
    textAlign: 'left',
  },
});

export default MaterialMessageTextbox;
