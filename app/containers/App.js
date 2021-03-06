import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Amplify, { Auth } from 'aws-amplify';
import * as Expo from 'expo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MainTabNavigator from '../components/Navigation';
import LoadingView from '../components/LoadingView';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import toggleSignIn from '../reducers/signInReducer';
import awsExport from '../../aws-exports';

Amplify.configure(awsExport);

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      isLoading: true,
    };
    this.store = createStore(toggleSignIn);
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log('initial state: ', user);
        this.setState({ loggedIn: true, isLoading: false });
      })
      .catch((err) => {
        console.log('initial state: ', err);
        this.setState({ loggedIn: false, isLoading: false });
      });
  }

  authStateChange() {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log('state changed: ', user);
        this.setState({ loggedIn: true });
      })
      .catch((err) => {
        console.log('state changed: ', err);
        this.setState({ loggedIn: false });
      });
  }

  render() {
    const SignInStackNavigation = createStackNavigator({
      SignIn: { screen: SignIn },
      SignUp: { screen: SignUp },
    });
    const { loggedIn, isLoading } = this.state;
    if (isLoading) {
      return <LoadingView />;
    }
    if (loggedIn) {
      return (
        <Provider store={this.store}>
          <MainTabNavigator screenProps={{ session: () => { this.authStateChange(); } }} />
        </Provider>
      );
    }
    return (
      <Provider store={this.store}>
        <SignInStackNavigation screenProps={{ session: () => { this.authStateChange(); } }} />
      </Provider>
    );
  }
}

Expo.registerRootComponent(App);
