/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
  Button,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import GoogleFit from 'react-native-google-fit';
import localScopes from '../scopes';
import AnimateNumber from 'react-native-countup';
import moment from 'moment';
import {Input} from 'native-base';
//import {NavigationContainer} from '@react-navigation/native';
//import {createStackNavigator} from '@react-navigation/stack';

const Home = ({navigation}) => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      behavior="padding"
      style={{flex: 1}}>
      <SafeAreaView>
        <View>
          <TextInput>hoe</TextInput>
        </View>
        <Button title="hello" />
        <View style={{marginTop: 300}}>
          <Text>hello</Text>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Home;
