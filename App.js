/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import home from './Component/home';
import login from './Component/LoginScreen/src/screens/loginScreen';
import signup from './Component/SignupScreen/src/screens/signupScreen';
import stepScreen from './Component/stepScreen/src/screens/stepScreen';

//import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Login" component={login} />
        <Stack.Screen name="Signup" component={signup} />
        <Stack.Screen name="Home" component={home} />
        <Stack.Screen name="StepScreen" component={stepScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// <>
//   <StatusBar barStyle="dark-content" />
//   <SafeAreaView>
//     <ScrollView
//       contentInsetAdjustmentBehavior="automatic"
//       style={styles.scrollView}>
//       <Header />
//       {global.HermesInternal == null ? null : (
//         <View style={styles.engine}>
//           <Text style={styles.footer}>Engine: Hermes</Text>
//         </View>
//       )}
//       <View style={styles.body}>
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Step One</Text>
//           <Text style={styles.sectionDescription}>
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//               </Text>
//         </View>
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>See Your Changes</Text>
//           <Text style={styles.sectionDescription}>
//             <ReloadInstructions />
//           </Text>
//         </View>
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Debug</Text>
//           <Text style={styles.sectionDescription}>
//             <DebugInstructions />
//           </Text>
//         </View>
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Learn More</Text>
//           <Text style={styles.sectionDescription}>
//             Read the docs to discover what to do next:
//               </Text>
//         </View>
//         <LearnMoreLinks />
//       </View>
//     </ScrollView>
//   </SafeAreaView>
// </>
// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });
