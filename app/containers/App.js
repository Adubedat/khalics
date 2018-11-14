import React from 'react';
import * as Expo from 'expo';
import SignUp from './SignUp';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.PureComponent {
  render() {
    return (
      <SignUp />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);
