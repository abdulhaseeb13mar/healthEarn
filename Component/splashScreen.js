/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Dimensions,
} from 'react-native';
const HEIGHT = Dimensions.get('window').height;
const SplashScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={require('./LoginScreen/src/assets/images/HealthEarnLogo.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '70%',
    alignSelf: 'center',
  },
});
export default SplashScreen;
