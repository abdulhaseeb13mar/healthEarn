/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  AsyncStorage,
  KeyboardAvoidingView,
} from 'react-native';
import firebase from '../../../../firebase';
import MaterialMessageTextbox from '../components/MaterialMessageTextbox';
import MaterialButtonViolet from '../components/MaterialButtonViolet';

const Untitled1 = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErrMsg, setUsernameErrMsg] = useState('');
  const [passwordErrMsg, setPasswordErrMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const Login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(username.trim(), password)
      .then(async signedInUser => {
        setUsernameErrMsg('');
        setPasswordErrMsg('');
        AsyncStorage.multiSet(
          [
            ['name', signedInUser.user.displayName],
            ['email', signedInUser.user.email],
            ['uid', signedInUser.user.uid],
          ],
          error => console.log('setData error:', error),
        );
        props.userToken();
      })
      .catch(err => {
        setLoading(false);
        if (err.message.includes('email')) {
          setUsernameErrMsg(err.message);
          setPasswordErrMsg('');
        } else if (err.message.includes('password')) {
          setPasswordErrMsg('Incorrect password');
          setUsernameErrMsg('');
        } else if (err.message.includes('identifier')) {
          setUsernameErrMsg('User Does not Exist');
          setPasswordErrMsg('');
        }
      });
  };

  return (
    <KeyboardAvoidingView behavior="height">
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Image
            source={require('../assets/images/HealthEarnLogo.png')}
            resizeMode="contain"
            style={styles.image}
          />
          <MaterialMessageTextbox
            text1="Email"
            textInput1="Enter your email address"
            style={styles.signupUsername}
            error={usernameErrMsg ? true : false}
            errorMessage={usernameErrMsg ? usernameErrMsg : null}
            handleChange={text => {
              setUsername(text);
            }}
            value={username}
          />
          <MaterialMessageTextbox
            text1="Password"
            textInput1="Enter your password"
            error={passwordErrMsg ? true : false}
            errorMessage={passwordErrMsg ? passwordErrMsg : null}
            style={styles.signupPassword}
            isPassword={true}
            handleChange={text => {
              setPassword(text);
            }}
            value={password}
          />
          <MaterialButtonViolet
            onPress={() => {
              setLoading(true);
              Login();
            }}
            text1="Log In"
            style={styles.signupButton}
            isLoading={loading}
          />
          <Text style={styles.alreadyText}>
            Don't have an account?
            <Text
              onPress={() => {
                props.navigation.navigate('Signup');
              }}
              style={{color: '#3F51B5', fontWeight: 'bold'}}>
              Sign Up here
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  image: {
    marginTop: '10%',
    width: '60%',
    height: 150,
    alignSelf: 'center',
  },
  signupUsername: {
    width: '75%',
    height: '20%',
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
    height: '20%',
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
    marginTop: '2%',
    //marginLeft: 53,
    alignSelf: 'center',
    marginBottom: '5%',
  },
});

export default React.memo(Untitled1);

// const h = {
//   additionalUserInfo: { isNewUser: false, providerId: 'password' },
//   credential: null,
//   operationType: 'signIn',
//   user: {
//     apiKey: 'AIzaSyA8zuDkFpCatxEyHTjOqypps31UXUyadms',
//     appName: '[DEFAULT]',
//     authDomain: 'iota-data-marketplace-b074f.firebaseapp.com',
//     createdAt: '1583921451578',
//     displayName: null,
//     email: 'abdulhaseeb13mar@gmail.com',
//     emailVerified: false,
//     isAnonymous: false,
//     lastLoginAt: '1583932943491',
//     phoneNumber: null,
//     photoURL: null,
//     providerData: [Array],
//     redirectEventId: null,
//     stsTokenManager: [Object],
//     tenantId: null,
//     uid: 'Hxw1QTM5kObtUerbjZzkyr76amo2',
//   },
// }
