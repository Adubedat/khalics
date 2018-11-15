import { createStackNavigator } from 'react-navigation';

import * as Expo from 'expo';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';

const App = createStackNavigator({
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
});

Expo.registerRootComponent(App);
