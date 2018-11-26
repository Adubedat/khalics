import React from 'react';
import { createStackNavigator } from 'react-navigation';
// import { withAuthenticator } from 'aws-amplify-react-native'; //TODO: delete if not used
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
      session: null,
    };
  }

  authStateChange() {
    this.setState({ session: Auth.user });
  }

  render() {
    const store = createStore(toggleSignIn);
    const Navigation = createStackNavigator({
      SignIn: { screen: SignIn },
      SignUp: { screen: SignUp },
    });
    let loggedIn = false;
    console.log(Auth.user);
    if (Auth.user) {
      const { user: { signInUserSession: { accessToken: { payload: { exp, iat } } } } } = Auth;
      if (iat < exp) loggedIn = true;
    }
    if (loggedIn) {
      return (
        <Provider store={store}>
          <WorkoutList session={() => { this.authStateChange(); }} />
        </Provider>
      );
    }
    return (
      <Provider store={store}>
        <Navigation screenProps={{ session: () => { this.authStateChange(); } }} />
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
