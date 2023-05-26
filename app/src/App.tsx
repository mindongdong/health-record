/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {View} from 'react-native';

import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';

const App: React.FC = () => (
  <View>
    <SignupScreen />
    <LoginScreen />
    <MainScreen />
  </View>
);

export default App;
