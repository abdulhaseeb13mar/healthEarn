import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import MaterialMessageTextbox from '../../LoginScreen/src/components/MaterialMessageTextbox';
import MaterialButtonViolet from '../../LoginScreen/src/components/MaterialButtonViolet';
import firebase from '../../../firebase';
const ResetPassword = props => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordAgain, setNewPasswordAgain] = useState('');
  const [currentPasswordErrMsg, setCurrentPasswordErrMsg] = useState('');
  const [newPasswordErrMsg, setNewPasswordErrMsg] = useState('');
  const [newPasswordAgainErrMsg, setNewPasswordAgainErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const changePassword = async () => {
    setLoading(true);
    const inputCheck = PasswordsChecker();
    if (!inputCheck) {
      setLoading(false);
      return;
    }
    const user = await firebase.auth().currentUser;
    const cred = await firebase.auth.EmailAuthProvider.credential(
      props.route.params.email,
      currentPassword,
    );
    user
      .reauthenticateWithCredential(cred) // first it will reauthenticate fresh
      .then(() => {
        user
          .updatePassword(newPassword)
          .then(() => {
            Alert.alert('Password Changed Successfully');
            props.navigation.goBack();
          })
          .catch(err => {
            Alert.alert(err.message);
            props.navigation.goBack();
          });
      })
      .catch(err => {
        console.log(err);
        errorMessagesHandler('currentPassword', 'Invalid Current Password');
        setLoading(false);
      });
  };

  const PasswordsChecker = () => {
    let res = false;
    currentPassword === ''
      ? errorMessagesHandler(
          'currentPassword',
          'Please Enter your Current Password',
        )
      : newPassword === ''
      ? errorMessagesHandler('newPassword', 'New Password should not be empty')
      : newPasswordAgain === ''
      ? errorMessagesHandler('newPasswordAgain', 'Enter New Password Again')
      : newPassword !== newPasswordAgain
      ? errorMessagesHandler('newPasswordAgain', 'Passwords Does not Match')
      : (res = true);
    return res;
  };

  const errorMessagesHandler = (errorCategory, errorMessage) => {
    if (errorCategory === 'currentPassword') {
      setCurrentPasswordErrMsg(errorMessage);
      setNewPasswordErrMsg('');
      setNewPasswordAgainErrMsg('');
    } else if (errorCategory === 'newPassword') {
      setNewPasswordErrMsg(errorMessage);
      setNewPasswordAgainErrMsg('');
      setCurrentPasswordErrMsg('');
    } else if (errorCategory === 'newPasswordAgain') {
      setNewPasswordAgainErrMsg(errorMessage);
      setNewPasswordErrMsg('');
      setCurrentPasswordErrMsg('');
    }
  };
  return (
    <View style={styles.container}>
      <MaterialMessageTextbox
        text1="Current Password:"
        textInput1="Enter your Current password"
        error={currentPasswordErrMsg ? true : false}
        errorMessage={currentPasswordErrMsg ? currentPasswordErrMsg : null}
        style={styles.PasswordsInput}
        isPassword={true}
        handleChange={text => {
          setCurrentPassword(text);
        }}
        value={currentPassword}
      />
      <MaterialMessageTextbox
        text1="New Password:"
        textInput1="Enter your new password"
        error={newPasswordErrMsg ? true : false}
        errorMessage={newPasswordErrMsg ? newPasswordErrMsg : null}
        style={styles.PasswordsInput}
        isPassword={true}
        handleChange={text => {
          setNewPassword(text);
        }}
        value={newPassword}
      />
      <MaterialMessageTextbox
        text1="Re-enter New Password"
        textInput1="Enter your new password again"
        error={newPasswordAgainErrMsg ? true : false}
        errorMessage={newPasswordAgainErrMsg ? newPasswordAgainErrMsg : null}
        style={styles.PasswordsInput}
        isPassword={true}
        handleChange={text => {
          setNewPasswordAgain(text);
        }}
        value={newPasswordAgain}
      />
      <MaterialButtonViolet
        onPress={() => changePassword()}
        text1="Change Password"
        style={styles.signupButton}
        isLoading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  PasswordsInput: {
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
