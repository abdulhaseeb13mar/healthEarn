/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View, Image, Text, ScrollView, Alert} from 'react-native';
import MaterialMessageTextbox from '../components/MaterialMessageTextbox';
import MaterialButtonViolet from '../components/MaterialButtonViolet';
//import {ScrollView} from 'react-native-gesture-handler';

function Untitled1(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Image
          source={require('../assets/images/HealthEarnLogo.png')}
          resizeMode="contain"
          style={styles.image}
        />
        <MaterialMessageTextbox
          text1="Username"
          textInput1="Enter your username"
          style={styles.signupUsername}
          handleChange={text => {
            setUsername(text);
          }}
          value={username}
        />
        <MaterialMessageTextbox
          text1="Password"
          textInput1="Enter your password"
          style={styles.signupPassword}
          handleChange={text => {
            setPassword(text);
          }}
          value={password}
          isPassword={true}
        />
        {/* <Text style={styles.error}>Error</Text> */}
        {/* <MaterialMessageTextbox
          text1="Seed"
          textInput1="Enter your Seed Address"
          style={styles.signupSeed}
        /> */}
        <MaterialButtonViolet
          onPress={() => {
            Alert.alert(username, password);
          }}
          text1="Sign Up"
          style={styles.signupButton}
        />
        <Text style={styles.alreadyText}>
          Already have an account?{' '}
          <Text
            onPress={() => {
              Alert.alert(username, password);
            }}
            style={{color: '#3F51B5', fontWeight: 'bold'}}>
            Log In here
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  image: {
    marginTop: '10%',
    width: '60%',
    height: 150,
    alignSelf: 'center',
  },
  signupUsername: {
    width: '75%',
    height: 74,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.01,
    //marginLeft: 62,
    alignSelf: 'center',
  },
  signupPassword: {
    width: '75%',
    height: 74,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.01,
    marginTop: '3.5%',
    //marginLeft: 64,
    alignSelf: 'center',
  },
  signupButton: {
    width: '75%',
    height: 50,
    marginTop: '6%',
    //marginLeft: 50,
    alignSelf: 'center',
  },
  error: {
    width: 45,
    height: 18,
    color: 'rgba(0,0,0,1)',
    fontSize: 21,
    fontFamily: 'roboto-regular',
    lineHeight: 19,
    letterSpacing: 0,
    marginTop: -317,
    marginLeft: 62,
  },
  signupSeed: {
    width: '75%',
    height: 74,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.01,
    marginTop: '3.5%',
    //marginLeft: 64,
    alignSelf: 'center',
  },
  alreadyText: {
    fontSize: 15,
    color: '#121212',
    fontFamily: 'roboto-regular',
    marginTop: '5%',
    //marginLeft: 53,
    alignSelf: 'center',
    paddingBottom: 10,
  },
});

export default Untitled1;
