import React from 'react';
import * as Expo from 'expo';
import {
  View,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {
  Text,
  Button,
  Icon,
} from 'react-native-elements';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import ForgotPasswordPopup from '../../components/ForgotPasswordPopup';
import styles from './styles';

class SignIn extends React.PureComponent {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: { username: '', password: '' },
      signIn: false, // TODO: keep ?
      name: '', // TODO: keep ?
    };
    // below for testing
    this.state = {
      username: 'test42',
      password: '',
      error: { username: '', password: '' },
    };
  }

  handleUsernameTextChange = (newText) => {
    this.setState({
      username: newText,
    });
  }

  handlePasswordTextChange = (newText) => {
    this.setState({
      password: newText,
    });
  }

  fieldError = (field) => {
    if (field) {
      return (
        <Text style={styles.field_error}>
          { field }
        </Text>
      );
    }
  }

  signInError = (err) => {
    const error = { username: '', password: '' };
    if (err.code === 'UserNotFoundException') {
      error.username = 'Incorrect username';
    } else if (err.code === 'UserNotConfirmedException') {
      error.username = 'You have not confirmed your account. Please check your email.';
    } else if (err.code === 'NotAuthorizedException') {
      error.username = err.message; error.password = err.message;
    }
    const state = { ...this.state, error };
    this.setState(state);
  }

  cognitoSignIn = () => {
    const { username, password } = this.state;
    const authenticationData = {
      Username: username,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const poolData = {
      UserPoolId: 'eu-west-1_jrpxZzyiw',
      ClientId: '2h58edhdok2kc8ujlankvev9cj',
    };
    const userPool = new CognitoUserPool(poolData);
    const userData = {
      Username: username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const accessToken = result.getAccessToken().getJwtToken();
        /* Use the idToken for Logins Map when Federating User Pools with identity pools or */
        /* when passing through an Authorization Header to an API Gateway Authorizer */
        const idToken = result.idToken.jwtToken;
        console.log('[success]: {accessToken}: ', accessToken, '{idToken}:', idToken);
      },
      onFailure: (err) => {
        this.signInError(err);
        console.log('[Error]:', err);
      },
    });
  }

  googleSignIn = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: '103645810049-3eii44q1peb4st03reos8u8gq50m1ihj.apps.googleusercontent.com',
        iosClientId: '103645810049-s1ko294ef5p17s4rgob3vun7pghkc6kq.apps.googleusercontent.com',
        // iosStandaloneAppClientId: '103645810049-s1ko294ef5p17s4rgob3vun7pghkc6kq.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        const state = {
          ...this.state,
          signedIn: true,
          name: result.user.name,
        };
        this.setState(state);
      } else {
        console.log('cancelled');
      }
    } catch (e) {
      console.log('error', e);
    }
  }

  facebookSignIn = async () => {
    try {
      const {
        type,
        token,
        // expires,
        // permissions,
        // declinedPermissions,
      } = await Expo.Facebook.logInWithReadPermissionsAsync('696904080692208', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        console.log(`Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  render() {
    const { username, password, error } = this.state;
    const { navigation } = this.props;
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} enableOnAndroid>
        <ImageBackground
          source={require('../../../assets/gym-background.jpg')}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.5)' }}>
            <StatusBar barStyle="light-content" />
            <View style={styles.main_container}>
              <View style={styles.title_container}>
                <Button
                  title="Sign in with facebook"
                  titleStyle={{ fontSize: 16 }}
                  buttonStyle={styles.facebook_button}
                  style={{ borderRadius: 4 }}
                  icon={(
                    <Icon
                      type="font-awesome"
                      name="facebook-square"
                      color="white"
                    />
                  )}
                  onPress={this.facebookSignIn}
                />
                <Button
                  title="Sign in with google"
                  titleStyle={{ fontSize: 16 }}
                  buttonStyle={styles.google_button}
                  style={{ borderRadius: 4 }}
                  icon={(
                    <Icon
                      type="font-awesome"
                      name="google-plus"
                      color="white"
                    />
                  )}
                  onPress={this.googleSignIn}
                />
              </View>
              <View style={styles.form_container}>
                <FloatingLabelInput
                  label="Username"
                  focusColor="white"
                  unfocusColor="#D3D3D3"
                  value={username}
                  error={error.username.length !== 0}
                  onChangeText={this.handleUsernameTextChange}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => { this.PasswordTextInput.focus(); }}
                />
                { this.fieldError(error.username) }
                <FloatingLabelInput
                  inputRef={(input) => { this.PasswordTextInput = input; }}
                  label="Password"
                  focusColor="white"
                  unfocusColor="#D3D3D3"
                  value={password}
                  error={error.password.length !== 0}
                  secureTextEntry
                  onChangeText={this.handlePasswordTextChange}
                />
                { this.fieldError(error.password) }
                <Text
                  style={styles.forgot_password_text}
                  onPress={() => { this.forgotPassword.visible(); }}
                >
                  Forgot your password ?
                </Text>
              </View>
              <View style={styles.validation_container}>
                <Button
                  buttonStyle={styles.form_button}
                  style={{ borderRadius: 4 }}
                  title="Sign in"
                  titleStyle={{ fontWeight: 'bold' }}
                  color="white"
                  onPress={this.cognitoSignIn} // TODO Sign in function
                />
                <Text
                  style={[styles.small_text, { textAlign: 'center' }]}
                  onPress={() => { navigation.navigate('SignUp'); }}
                >
                  Don&apos;t have an account?
                  <Text style={{ fontWeight: 'bold' }}> Sign up</Text>
                </Text>
              </View>
            </View>
            <ForgotPasswordPopup ref={(popup) => { this.forgotPassword = popup; }} />
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    );
  }
}

export default SignIn;
