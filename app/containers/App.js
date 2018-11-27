import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Auth } from 'aws-amplify';
import * as Expo from 'expo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import WorkoutList from './WorkoutList/WorkoutList';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import toggleSignIn from '../reducers/signInReducer';
import awsExport from '../../aws-exports';

Auth.configure(awsExport);

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
    this.store = createStore(toggleSignIn);
  }

  componentDidMount() {
    if (Auth.user) {
      this.setState({ loggedIn: true });
    }
  }

  authStateChange() {
    const { loggedIn } = this.state;
    this.setState({ loggedIn: !loggedIn });
  }

  render() {
    const Navigation = createStackNavigator({
      SignIn: { screen: SignIn },
      SignUp: { screen: SignUp },
    });
    this.state.loggedIn = true; // test
    const { loggedIn } = this.state;

    if (loggedIn) {
      return (
        <Provider store={this.store}>
          <WorkoutList session={() => { this.authStateChange(); }} />
        </Provider>
      );
    }
    return (
      <Provider store={this.store}>
        <Navigation screenProps={{ session: () => { this.authStateChange(); } }} />
      </Provider>
    );
  }
}

Expo.registerRootComponent(App);
