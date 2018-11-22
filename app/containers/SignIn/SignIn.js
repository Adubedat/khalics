import qs from 'querystring'; // npm uninstall --save qs
import React from 'react';
import * as Expo from 'expo';
import { AuthSession } from 'expo';
import Amplify, { Auth } from 'aws-amplify';
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
import AWS from 'aws-sdk';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import ForgotPasswordPopup from '../../components/ForgotPasswordPopup';
import styles from './styles';

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'eu-west-1:ee3cde2b-e434-4be8-9f9b-756098823f3a',
    // REQUIRED - Amazon Cognito Region
    region: 'eu-west-1',
    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: 'eu-west-1',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'eu-west-1_jrpxZzyiw',
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '2h58edhdok2kc8ujlankvev9cj',
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,
    // OPTIONAL - Configuration for cookie storage
    cookieStorage: {
      // REQUIRED - Cookie domain (only required if cookieStorage is provided)
      domain: '.yourdomain.com',
      // OPTIONAL - Cookie path
      path: '/',
      // OPTIONAL - Cookie expiration in days
      expires: 365,
      // OPTIONAL - Cookie secure flag
      secure: true,
    },
    // OPTIONAL - customized storage object
    // storage: new MyStorage(),
    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: 'USER_PASSWORD_AUTH',
  },
});

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
    Auth.signIn(username, password)
      .then(user => console.log(user))
      .catch(err => console.log(err));
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
    const cognitoUrl = 'https://khalics.auth.eu-west-1.amazoncognito.com';
    const redirectUrl = AuthSession.getRedirectUrl();
    console.log(redirectUrl);
    const clientId = '2h58edhdok2kc8ujlankvev9cj';
    const result = await AuthSession.startAsync({
      authUrl: `${cognitoUrl}/login?response_type=code`
      + `&client_id=${clientId}`
      + `&redirect_uri=${redirectUrl}`,
    });
    console.log(result);
    const requestUrl = `${cognitoUrl}/oauth2/token`;
    const authCode = result.params.code;
    console.log(authCode);
    const token = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify({
        grant_type: 'authorization_code',
        // scope: 'email profile',
        redirect_uri: redirectUrl,
        client_id: clientId,
        code: authCode,
      }),
    });
    const tokenJson = await token.json();
    console.log(tokenJson);
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'eu-west-1:ee3cde2b-e434-4be8-9f9b-756098823f3a',
      Logins: {
        'graph.facebook.com': tokenJson.access_token,
      },
    });
    AWS.config.credentials.get(() => {
      const { accessKeyId, secretAccessKey, sessionToken } = AWS.config.credentials;
      console.log(accessKeyId, '===', secretAccessKey, ' ||| ', sessionToken);
    });
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
                  onPress={this.testSignIn} // TODO Sign in function
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
