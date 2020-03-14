/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import StepScreen from './Component/stepScreen/src/screens/stepScreen';
import {Text, Dimensions} from 'react-native';
import {Container, Header, Body} from 'native-base';

const Drawer = createDrawerNavigator();
const WIDTH = Dimensions.get('window').width;
export default function HomeNavigations(props) {
  return (
    <>
      <Drawer.Navigator
        initialRouteName="Home"
        edgeWidth={WIDTH * 0.4}
        drawerStyle={{
          backgroundColor: '#3F51B5',
          width: 240,
        }}
        drawerContent={props => <CustomNavigator {...props} />}>
        <Drawer.Screen name="Home">
          {homeProps => (
            <StepScreen {...homeProps} userToken={() => props.userToken()} />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </>
  );
}

const CustomNavigator = props => (
  <DrawerContentScrollView>
    <Text>Hellp</Text>
  </DrawerContentScrollView>
);
