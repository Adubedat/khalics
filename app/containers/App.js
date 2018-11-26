import React from 'react';
import { createStackNavigator } from 'react-navigation';
import * as Expo from 'expo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import toggleSignIn from '../reducers/signInReducer';

const App = () => {
  const store = createStore(toggleSignIn);
  const Navigation = createStackNavigator({
    SignIn: { screen: SignIn },
    SignUp: { screen: SignUp },
  });
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

Expo.registerRootComponent(App);
