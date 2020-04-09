/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler';

import React, {useState, useEffect} from 'react';
import {AsyncStorage} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Component/LoginScreen/src/screens/loginScreen';
import Signup from './Component/SignupScreen/src/screens/signupScreen';
import HomeScreen from './HomeNavigations';
import SplashScreen from './Component/SplashScreen/splashScreen';

const Stack = createStackNavigator();
const App: () => React$Node = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    fetchUserToken();
  }, []);

  const fetchUserToken = async () => {
    let userinfo = {};
    await AsyncStorage.multiGet(['name', 'email', 'uid'], (error, stores) => {
      if (error) {
        console.log(error);
        return;
      }
      stores.map((_, i, store) => {
        userinfo = {...userinfo, [store[i][0]]: store[i][1]};
      });
      setCurrentUser(userinfo);
      setIsLoading(false);
    });
  };

  return isLoading === false ? (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {currentUser.uid == null ? (
          <>
            <Stack.Screen name="Login">
              {(props) => (
                <Login {...props} userToken={() => fetchUserToken()} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Signup">
              {(props) => (
                <Signup {...props} userToken={() => fetchUserToken()} />
              )}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="HomeScreen">
            {(props) => (
              <HomeScreen
                {...props}
                currentUser={currentUser}
                userToken={() => fetchUserToken()}
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <SplashScreen />
  );
};

export default App;
