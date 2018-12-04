import React from 'react';
import { createStackNavigator } from 'react-navigation';
// import { withAuthenticator } from 'aws-amplify-react-native'; //TODO: delete if not used
import { Auth } from 'aws-amplify';
import * as Expo from 'expo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MainTabNavigator from '../components/Navigation';
import LoadingView from '../components/LoadingView';
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
      isLoading: true,
    };
    this.store = createStore(toggleSignIn);
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then(() => this.setState({ loggedIn: true, isLoading: false }))
      .catch(() => this.setState({ loggedIn: false, isLoading: false }));
  }

  authStateChange() {
    const { loggedIn } = this.state;
    this.setState({ loggedIn: !loggedIn });
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

// const App = () => {
// console.log(user);

// try {
//   await Auth.currentAuthenticatedUser();
//   return (
//     <Provider store={store}>
//       <WorkoutList />
//     </Provider>
//   );
// } catch (err) {
//   return (
//     <Provider store={store}>
//       <Navigation />
//     </Provider>
//   );
// }
// const home = (
//   <Provider store={store}>
//     <Navigation />
//   </Provider>
// );
// return home;
// await Auth.currentAuthenticatedUser()
//   .then((user) => {
//     home = (
//       <Provider store={store}>
//         <WorkoutList />
//       </Provider>
//     );
//   })
//   .catch((err) => {
//   home = (
//     <Provider store={store}>
//       <Navigation />
//     </Provider>
//   );
// });
// console.log(home);

// return { home };
// console.log('END', home);

// return (
//   <Provider store={store}>
//     <Navigation />
//   </Provider>
// );
// return home;
// };

Expo.registerRootComponent(App);
// export default withAuthenticator(App);
