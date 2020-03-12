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
import StepScreen from './Component/stepScreen/src/screens/stepScreen';
import {AsyncStorage} from 'react-native';

const Stack = createStackNavigator();
const App: () => React$Node = () => {
  const [userToken, setUserToken] = useState(null);
  useEffect(() => {
    fetchUserToken();
  }, []);

  const fetchUserToken = async () => {
    await AsyncStorage.getItem('uid', (error, result) => {
      console.log('FetchData Error app wala:', error);
      setUserToken(result);
      console.log(result);
    });
  };
  return (
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
              <StepScreen {...props} userToken={() => fetchUserToken()} />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
