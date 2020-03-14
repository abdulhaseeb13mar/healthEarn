import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import StepScreen from './Component/stepScreen/src/screens/stepScreen';

const Drawer = createDrawerNavigator();
export default function HomeNavigations(props) {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home">
        {homeProps => (
          <StepScreen {...homeProps} userToken={() => props.userToken()} />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
