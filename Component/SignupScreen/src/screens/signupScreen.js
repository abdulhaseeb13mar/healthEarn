/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Alert,
  Text,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import MaterialMessageTextbox from '../components/MaterialMessageTextbox';
import MaterialButtonViolet from '../components/MaterialButtonViolet';
// import firebase from '../../../../firebase';
import {checkUsername, register} from '../../../Firebase';
import {createUserHealthProfile} from '../../../Firebase';

const Untitled1 = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailErrMsg, setemailErrMsg] = useState('');
  const [usernameErrMsg, setUsernameErrMsg] = useState(false);
  const [passwordErrMsg, setPasswordErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  // const h = {
  //   additionalUserInfo: {isNewUser: true, providerId: 'password'},
  //   credential: null,
  //   operationType: 'signIn',
  //   user: {
  //     apiKey: 'AIzaSyA8zuDkFpCatxEyHTjOqypps31UXUyadms',
  //     appName: '[DEFAULT]',
  //     authDomain: 'iota-data-marketplace-b074f.firebaseapp.com',
  //     createdAt: '1584982393868',
  //     displayName: null,
  //     email: 'abdulhaseeb13mar@gmail.com',
  //     emailVerified: false,
  //     isAnonymous: false,
  //     lastLoginAt: '1584982393868',
  //     phoneNumber: null,
  //     photoURL: null,
  //     providerData: [Array],
  //     redirectEventId: null,
  //     stsTokenManager: [Object],
  //     tenantId: null,
  //     uid: 'VrWuMnjEmIUOLK9lRrG5gMwEkBr1',
  //   },
  // };

  const signUp = async () => {
    try {
      if (await isFormValid()) {
        const response = await register(username, email.trim(), password);
        if (response.status) {
          setemailErrMsg('');
          setPasswordErrMsg('');
          setUsernameErrMsg('');
          await AsyncStorage.multiSet(
            // eslint-disable-next-line prettier/prettier
            [
              ['name', username],
              ['email', email],
              ['uid', response.user.uid],
            ],
            error => {
              error ? console.log('setData error:', error) : null;
            },
          );
          console.log(response.user.uid);
          await createUserHealthProfile({
            uid: response.user.uid,
            name: username,
          });
          props.userToken();
        } else {
          setLoading(false);
          if (response.message.includes('email')) {
            if (response.message.includes('formatted')) {
              setemailErrMsg(response.message);
            } else if (response.message.includes('already')) {
              setemailErrMsg('Email already in use');
            }
            setPasswordErrMsg('');
            setUsernameErrMsg('');
          } else if (
            response.message.includes('Password') ||
            response.message.includes('password')
          ) {
            setPasswordErrMsg(response.message);
            setUsernameErrMsg('');
            setemailErrMsg('');
          }
        }
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Error occured while signing up');
    }
  };
  const isFormValid = async () => {
    if (username !== '') {
      const isUsernameValid = await checkUsername(username);
      if (isUsernameValid) {
        setUsernameErrMsg('This Username Already Exists');
        setPasswordErrMsg('');
        setemailErrMsg('');
        return false;
      } else {
        return true;
      }
    } else {
      setUsernameErrMsg('Please Enter Your Name');
      return false;
    }
  };

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
          textInput1="Enter your Username"
          style={styles.signupUsername}
          error={usernameErrMsg ? true : false}
          errorMessage={usernameErrMsg ? usernameErrMsg : null}
          handleChange={text => {
            setUsername(text);
          }}
          value={username}
        />
        <MaterialMessageTextbox
          text1="Email"
          textInput1="Enter your email address"
          style={styles.signupEmail}
          error={emailErrMsg ? true : false}
          errorMessage={emailErrMsg ? emailErrMsg : null}
          handleChange={text => {
            setEmail(text);
          }}
          value={email}
        />
        <MaterialMessageTextbox
          text1="Password"
          textInput1="Enter your password"
          style={styles.signupPassword}
          error={passwordErrMsg ? true : false}
          errorMessage={passwordErrMsg ? passwordErrMsg : null}
          handleChange={text => {
            setPassword(text);
          }}
          value={password}
          isPassword={true}
        />
        <MaterialButtonViolet
          onPress={() => {
            setLoading(true);
            signUp();
          }}
          text1="Sign Up"
          style={styles.signupButton}
          isLoading={loading}
        />
        <Text style={styles.alreadyText}>
          Already have an account?{' '}
          <Text
            onPress={() => {
              props.navigation.navigate('Login');
            }}
            style={{color: '#3F51B5', fontWeight: 'bold'}}>
            Log In here
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  image: {
    marginTop: '5%',
    width: '60%',
    height: 150,
    alignSelf: 'center',
  },
  signupUsername: {
    width: '75%',
    height: 80,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.01,
    //marginLeft: 62,
    alignSelf: 'center',
  },
  signupEmail: {
    position: 'relative',
    width: '75%',
    height: 80,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.01,
    marginTop: 10,
    alignSelf: 'center',
  },
  signupPassword: {
    position: 'relative',
    width: '75%',
    height: 80,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.01,
    marginTop: 10,
    //marginLeft: 64,
    alignSelf: 'center',
  },
  signupButton: {
    width: '75%',
    height: 50,
    marginTop: 10,
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
  alreadyText: {
    fontSize: 15,
    color: '#121212',
    fontFamily: 'roboto-regular',
    marginTop: '2%',
    //marginLeft: 53,
    alignSelf: 'center',
    marginBottom: '2%',
  },
});

export default React.memo(Untitled1);
