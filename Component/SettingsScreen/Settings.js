import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ResetPassword from './Screens/ResetPassword';
import HomeSettings from './Screens/HomeSettings';
const Stack = createStackNavigator();
const Settings = props => {
  // console.log(props);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#3F51B5'},
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        currentUser={props.currentUser}
        name="HomeSettings"
        component={HomeSettings}
        options={{headerTitle: 'Settings'}}
      />
      <Stack.Screen
        initialParams={props.currentUser}
        name="ResetPassword"
        component={ResetPassword}
      />
    </Stack.Navigator>
  );
};

export default Settings;
