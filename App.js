/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import home from './Component/home';
import login from './Component/LoginScreen/src/screens/loginScreen';
import signup from './Component/SignupScreen/src/screens/signupScreen';
import stepScreen from './Component/stepScreen/src/screens/stepScreen';

//import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Signup" component={signup} />
        <Stack.Screen name="Login" component={login} />
        <Stack.Screen name="Home" component={home} />
        <Stack.Screen name="StepScreen" component={stepScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
