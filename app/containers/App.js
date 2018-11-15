import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import * as Expo from 'expo';
import SignUp from './SignUp';
import SignIn from './SignIn/SignIn';


// export default class App extends React.PureComponent {
//   render() {
//     return (
//       <SignIn />
//     );
//   }
// }

const App = createStackNavigator({
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);
