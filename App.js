/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import home from './Component/home';
import login from './Component/LoginScreen/src/screens/loginScreen';
import signup from './Component/SignupScreen/src/screens/signupScreen';
import stepScreen from './Component/stepScreen/src/screens/stepScreen';
import {AsyncStorage} from 'react-native';

const Stack = createStackNavigator();
const App: () => React$Node = () => {
  const [userToken, setUserToken] = useState(null);
  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = () => {
    AsyncStorage.getItem('uid', (error, result) => {
      console.log('FetchData Error:', error);
      setUserToken(result);
      console.log(result);
    });
  };
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {userToken == null ? (
          <>
            <Stack.Screen name="Login" component={login} />
            <Stack.Screen name="Signup" component={signup} />
            <Stack.Screen name="HomeScreen" component={stepScreen} />
          </>
        ) : (
          <Stack.Screen name="HomeScreen" component={stepScreen} />
        )}
        {/* <Stack.Screen name="Home" component={home} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
