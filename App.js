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
// import home from './Component/home';
import Login from './Component/LoginScreen/src/screens/loginScreen';
import Signup from './Component/SignupScreen/src/screens/signupScreen';
import {AsyncStorage} from 'react-native';
import HomeScreen from './HomeNavigations';
import SplashScreen from './Component/splashScreen';

const Stack = createStackNavigator();
const App: () => React$Node = () => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchUserToken();
  }, []);

  const fetchUserToken = async () => {
    await AsyncStorage.getItem('uid', (error, result) => {
      if (error === null) {
        setIsLoading(false);
        setUserToken(result);
      } else {
        console.log('FetchData Error app wala:', error);
      }
    });
  };
  return isLoading === false ? (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {userToken == null ? (
          <>
            <Stack.Screen name="Login">
              {props => <Login {...props} userToken={() => fetchUserToken()} />}
            </Stack.Screen>
            <Stack.Screen name="Signup">
              {props => (
                <Signup {...props} userToken={() => fetchUserToken()} />
              )}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="HomeScreen">
            {props => (
              <HomeScreen {...props} userToken={() => fetchUserToken()} />
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
