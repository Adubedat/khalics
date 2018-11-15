import React from 'react';
import { StyleSheet } from 'react-native';
import * as Expo from 'expo';
import SignUp from './SignUp';


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
