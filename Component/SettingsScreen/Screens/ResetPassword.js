import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import MaterialMessageTextbox from '../../LoginScreen/src/components/MaterialMessageTextbox';
import MaterialButtonViolet from '../../LoginScreen/src/components/MaterialButtonViolet';

const ResetPassword = props => {
  return (
    <View style={styles.container}>
      <MaterialMessageTextbox
        text1="Current Password:"
        textInput1="Enter your Current password"
        // error={passwordErrMsg ? true : false}
        // errorMessage={passwordErrMsg ? passwordErrMsg : null}
        style={styles.PasswordsInput}
        isPassword={true}
        // handleChange={text => {
        //   setPassword(text);
        // }}
        // value={password}
      />
      <MaterialMessageTextbox
        text1="New Password:"
        textInput1="Enter your new password"
        // error={passwordErrMsg ? true : false}
        // errorMessage={passwordErrMsg ? passwordErrMsg : null}
        style={styles.PasswordsInput}
        isPassword={true}
        // handleChange={text => {
        //   setPassword(text);
        // }}
        // value={password}
      />
      <MaterialMessageTextbox
        text1="Re-enter New Password"
        textInput1="Enter your new password again"
        // error={passwordErrMsg ? true : false}
        // errorMessage={passwordErrMsg ? passwordErrMsg : null}
        style={styles.PasswordsInput}
        isPassword={true}
        // handleChange={text => {
        //   setPassword(text);
        // }}
        // value={password}
      />
      <MaterialButtonViolet
        onPress={() => {}}
        text1="Change Password"
        style={styles.signupButton}
        // isLoading={loading}
      />
    </View>
  );
};

const borders = {
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'red',
};
const styles = StyleSheet.create({
  container: {
    // ...borders,
    flex: 1,
    alignItems: 'center',
  },
  PasswordsInput: {
    // ...borders,
    width: '80%',
    height: '20%',
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.01,
    marginTop: '4%',
  },
  signupButton: {
    width: '75%',
    height: 50,
    marginTop: '6%',
  },
});

export default ResetPassword;
