import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const SettingsOptions = props => (
  <TouchableOpacity onPress={props.onPress} style={styles.optionContainer}>
    <View style={styles.InnerOptionContainer}>
      <Icon
        name={props.iconName}
        color={ThemeColor}
        size={30}
        style={styles.iconsStyle}
      />
      <Text style={styles.TextStyle}>{props.text}</Text>
    </View>
  </TouchableOpacity>
);

const height = '12%';
const ThemeColor = '#3F51B5';

const styles = StyleSheet.create({
  optionContainer: {
    borderWidth: 1,
    borderColor: 'transparent',
    borderStyle: 'solid',
    backgroundColor: '#f8f8ff',
    borderBottomColor: '#dcdcdc',
    height,
    alignSelf: 'stretch',
  },
  InnerOptionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconsStyle: {
    borderColor: 'blue',
    marginLeft: '4%',
  },
  TextStyle: {
    borderColor: 'blue',
    fontSize: 25,
    marginLeft: '4%',
    width: '100%',
  },
});

export default SettingsOptions;
