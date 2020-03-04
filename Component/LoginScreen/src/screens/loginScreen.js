import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import MaterialMessageTextbox from '../components/MaterialMessageTextbox';
import MaterialButtonViolet from '../components/MaterialButtonViolet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

function Untitled2(props) {
  return (
    //<View style={styles.container}>
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={-220}>
      <ScrollView>
        <View style={styles.imageStack}>
          <Image
            source={require('../assets/images/HealthEarnLogo.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <MaterialMessageTextbox
          text1="Username"
          textInput1="Enter your username"
          style={styles.materialMessageTextbox1}
        />
        <MaterialMessageTextbox
          text1="Password"
          textInput1="Enter your password"
          style={styles.materialMessageTextbox2}
        />
        <MaterialButtonViolet
          text1="Sign In"
          style={styles.materialButtonViolet1}
        />
      </ScrollView>
    </KeyboardAvoidingView>
    // {/* <Text style={styles.error}>Error</Text> */}
    //</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    top: 0,
    width: 200,
    height: 200,
    position: 'absolute',
    left: 16,
  },
  materialMessageTextbox1: {
    // top: 190,
    marginTop: 0,
    width: 275,
    height: 90,
    //position: 'absolute',
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.01,
    left: 0,
    marginLeft: 40,
    alignSelf: 'flex-start',
  },
  imageStack: {
    width: 233,
    height: 150,
    marginLeft: 64,
  },
  materialMessageTextbox2: {
    width: 275,
    height: 90,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.01,
    marginTop: 45,
    alignSelf: 'flex-start',
    marginLeft: 40,
  },
  materialButtonViolet1: {
    width: 264,
    height: 50,
    marginTop: 29,
    marginLeft: 50,
  },
  error: {
    width: 60,
    height: 18,
    color: 'rgba(0,0,0,1)',
    fontSize: 21,
    fontFamily: 'roboto-regular',
    lineHeight: 19,
    letterSpacing: 0,
    marginTop: -209,
    marginLeft: 50,
  },
});

export default Untitled2;
