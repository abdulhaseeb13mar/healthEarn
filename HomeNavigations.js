/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import StepScreen from './Component/stepScreen/src/screens/stepScreen';
import {Text, Dimensions, StyleSheet, View, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import SplashScreen from './Component/splashScreen';

const Drawer = createDrawerNavigator();
const WIDTH = Dimensions.get('window').width;
export default function HomeNavigations(props) {
  const clearUserToken = async () => {
    await AsyncStorage.multiRemove(['name', 'email', 'uid'], error =>
      error === null ? null : console.log('clearData error:', error),
    );
    props.userToken();
  };
  return (
    <>
      <Drawer.Navigator
        initialRouteName="Home"
        edgeWidth={WIDTH * 0.4}
        drawerStyle={{
          backgroundColor: 'white',
          width: 280,
        }}
        drawerContent={drawerComponentProps => (
          <CustomNavigator
            signout={() => clearUserToken()}
            currentUser={props.currentUser}
            {...drawerComponentProps}
          />
        )}
        drawerContentOptions={{
          itemStyle: {},
        }}>
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
  <DrawerContentScrollView {...props}>
    <View style={styles.header}>
      <Text style={styles.headerName}>
        {props.currentUser.name.toUpperCase()}
      </Text>
      <Text style={styles.headerEmail}>{props.currentUser.email}</Text>
    </View>
    <DrawerItemList {...props} />
    <DrawerItem
      label="Log out"
      inactiveBackgroundColor="yellow"
      activeBackgroundColor="blue"
      icon={() => <Icon size={25} name="logout" />}
      onPress={() => {
        props.signout();
      }}
    />
  </DrawerContentScrollView>
);

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#3F51B5',
    width: '100%',
    height: 140,
    marginTop: '-1.45%',
    textAlign: 'center',
    color: 'yellow',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: '10%',
    // paddingBottom: '20%',
  },
  headerName: {
    color: 'white',
    fontSize: 32,
    marginTop: 6,
    marginBottom: 6,
    textAlign: 'center',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  headerEmail: {
    color: 'white',
    fontSize: 15,
    alignSelf: 'center',
  },
});

// <DrawerItemList {...props} />
// <DrawerItem
// label="help"
// inactiveBackgroundColor="yellow"
// activeBackgroundColor="blue"
// icon={() => <Icon size={25} name="help" />}
// />
// <Text>Hellp</Text>
