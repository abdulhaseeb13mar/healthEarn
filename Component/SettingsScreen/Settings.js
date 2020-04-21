import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ResetPassword from './Screens/ResetPassword';
import HomeSettings from './Screens/HomeSettings';
const Stack = createStackNavigator();
const Settings = props => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: '#3F51B5'},
      headerTintColor: 'white',
      headerTitleAlign: 'center',
    }}>
    <Stack.Screen
      name="HomeSettings"
      component={HomeSettings}
      options={{headerTitle: 'Settings'}}
    />
    <Stack.Screen name="ResetPassword" component={ResetPassword} />
  </Stack.Navigator>
);

export default Settings;
