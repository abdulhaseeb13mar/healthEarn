/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {decode, encode} from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}
import App from './App';
import './shim';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
