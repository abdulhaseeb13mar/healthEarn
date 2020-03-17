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
import HeartRateScreen from './Component/HeartRate';
import SettingScreen from './Component/Settings';
import WalletScreen from './Component/Wallet';
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
          activeBackgroundColor: '#bbc5f7',
          activeTintColor: '#001480',
        }}>
        <Drawer.Screen
          name="Home"
          options={{
            drawerIcon: () => <Icon name="home" size={25} />,
            unmountOnBlur: true,
          }}>
          {homeProps => (
            <StepScreen {...homeProps} userToken={() => props.userToken()} />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="HeartRate"
          options={{
            drawerIcon: () => <Icon name="heart" size={25} />,
            unmountOnBlur: true,
            gestureEnabled: false,
          }}>
          {heartRateProps => (
            <HeartRateScreen
              {...heartRateProps}
              userToken={() => props.userToken()}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Wallet"
          options={{
            drawerIcon: () => <Icon name="wallet" size={25} />,
            unmountOnBlur: true,
            gestureEnabled: false,
          }}>
          {walletProps => (
            <WalletScreen
              {...walletProps}
              userToken={() => props.userToken()}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Settings"
          options={{
            drawerIcon: () => <Icon name="settings" size={25} />,
            unmountOnBlur: true,
            gestureEnabled: false,
          }}>
          {settingsProps => (
            <SettingScreen
              {...settingsProps}
              userToken={() => props.userToken()}
            />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </>
  );
}

const CustomNavigator = props => {
  console.log(props);
  return (
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
        // inactiveBackgroundColor="yellow"
        // activeBackgroundColor="blue"
        icon={() => <Icon size={25} name="logout" />}
        onPress={() => {
          props.signout();
        }}
      />
    </DrawerContentScrollView>
  );
};

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

// const h = {
//   currentUser: {
//     email: 'abc@abc.com',
//     name: 'abc',
//     uid: 'DQ1J3LJkUWUiYWtpGlkQ7k9miJp2',
//   },
//   descriptors: {
//     'Home-PiEUHIkuk': { navigation: [Object], options: [Object], render: [] },
//   },
//   itemStyle: {},
//   navigation: {
//     addListener: [],
//     canGoBack: [],
//     closeDrawer: [],
//     dangerouslyGetParent: [],
//     dangerouslyGetState: [],
//     dispatch: [],
//     emit: [],
//     goBack: [],
//     isFocused: [],
//     jumpTo: [],
//     navigate: [],
//     openDrawer: [],
//     pop: [],
//     popToTop: [],
//     push: [],
//     removeListener: [],
//     replace: [],
//     reset: [],
//     setOptions: [],
//     setParams: [],
//     toggleDrawer: [],
//   },
//   progress: {
//     __children: [[AnimatedCallFunc], [AnimatedOperator]],
//     __initialized: true,
//     __inputNodes: [
//       [AnimatedOperator],
//       [InternalAnimatedValue],
//       [AnimatedCallFunc],
//     ],
//     __lastLoopID: { '': -1 },
//     __memoizedValue: { '': null },
//     __nodeConfig: { cond: 586, elseBlock: 588, ifBlock: 19, type: 'cond' },
//     __nodeID: 589,
//     _condition: {
//       __children: [Array],
//       __initialized: true,
//       __inputNodes: [Array],
//       __lastLoopID: [Object],
//       __memoizedValue: [Object],
//       __nodeConfig: [Object],
//       __nodeID: 586,
//       _input: [Array],
//       _op: 'eq',
//     },
//     _elseBlock: {
//       __children: [Array],
//       __initialized: true,
//       __inputNodes: [Array],
//       __lastLoopID: [Object],
//       __memoizedValue: [Object],
//       __nodeConfig: [Object],
//       __nodeID: 588,
//       _args: [Array],
//       _params: [Array],
//       _what: [AnimatedFunction],
//     },
//     _ifBlock: {
//       __children: [Array],
//       __initialized: true,
//       __inputNodes: undefined,
//       __lastLoopID: [Object],
//       __memoizedValue: [Object],
//       __nodeConfig: [Object],
//       __nodeID: 19,
//       _animation: null,
//       _constant: true,
//       _startingValue: 0,
//       _value: 0,
//     },
//   },
//   signout: [],
//   state: {
//     history: [[Object]],
//     index: 0,
//     key: 'drawer-y4lut5Vs1',
//     routeNames: ['Home'],
//     routes: [[Object]],
//     stale: false,
//     type: 'drawer',
//   },
// };
