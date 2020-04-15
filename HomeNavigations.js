/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  Text,
  Dimensions,
  StyleSheet,
  View,
  AsyncStorage,
  Image,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeartRateScreen from './Component/HeartRateScreen/HeartRate';
import SettingScreen from './Component/SettingsScreen/Settings';
import WalletScreen from './Component/WalletScreen/Wallet';
import StepScreen from './Component/stepScreen/src/screens/stepScreen';

const Drawer = createDrawerNavigator();
const WIDTH = Dimensions.get('window').width;
const HomeNavigations = props => {
  const clearUserToken = async () => {
    await AsyncStorage.multiRemove(
      ['name', 'email', 'uid', 'LatestUpdate'],
      error => (error === null ? null : console.log('clearData error:', error)),
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
          labelStyle: {
            color: 'black',
            fontSize: 17,
            paddingLeft: '5%',
            paddingBottom: '3%',
          },
          itemStyle: {
            borderStyle: 'solid',
            borderColor: 'transparent',
            borderBottomColor: '#dcdcdc',
            borderWidth: 1,
          },
        }}>
        <Drawer.Screen
          name="Home"
          options={{
            drawerIcon: () => <Icon name="home" size={27} />,
            unmountOnBlur: true,
          }}>
          {homeProps => (
            <StepScreen
              {...homeProps}
              currentUser={props.currentUser}
              userToken={() => props.userToken()}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="HeartRate"
          options={{
            drawerIcon: () => <Icon name="heart" size={27} />,
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
            drawerIcon: () => <Icon name="wallet" size={27} />,
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
            drawerIcon: () => <Icon name="settings" size={27} />,
            unmountOnBlur: true,
            gestureEnabled: true,
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
};

const CustomNavigator = props => {
  return (
    <DrawerContentScrollView {...props}>
      <ImageBackground
        source={require('./Component/stepScreen/src/assets/images/drawerback.jpg')}
        style={styles.header}>
        <Image
          source={require('./Component/stepScreen/src/assets/images/blankProfile.png')}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.headerName}>{props.currentUser.name}</Text>
          <Text style={styles.headerEmail}>{props.currentUser.email}</Text>
        </View>
      </ImageBackground>
      <DrawerItemList {...props} />
      <DrawerItem
        style={{
          borderStyle: 'solid',
          borderColor: 'transparent',
          borderBottomColor: '#dcdcdc',
          borderWidth: 1,
        }}
        label="Log out"
        labelStyle={{
          color: '#fd3847',
          fontSize: 17,
          paddingLeft: '5%',
        }}
        icon={() => <Icon size={27} name="logout" color="#fd3847" />}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: '4%',
  },
  headerName: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    backgroundColor: 'black',
  },
  headerEmail: {
    color: 'white',
    fontSize: 15,
    backgroundColor: 'black',
  },
  image: {
    marginLeft: '4%',
    width: '25%',
    height: 100,
    borderRadius: 200,
  },
});

export default React.memo(HomeNavigations);

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
