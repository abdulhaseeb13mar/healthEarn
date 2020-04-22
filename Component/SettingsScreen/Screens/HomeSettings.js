import React from 'react';
import {View, StyleSheet} from 'react-native';
import SettingsOptions from './components/homesettingsOptions';
const HomeSettings = props => {
  return (
    <View style={styles.container}>
      <SettingsOptions
        onPress={() => props.navigation.navigate('ResetPassword')}
        iconName="lock-reset"
        text="Change Password"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default HomeSettings;
