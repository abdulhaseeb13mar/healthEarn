/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native';
const Settings = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text>This is Settings screen</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Settings;
