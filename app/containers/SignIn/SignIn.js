// import qs from 'querystring'; // npm uninstall --save qs
import React from 'react';
import * as Expo from 'expo';
// import { AuthSession } from 'expo';
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
// import AWS from 'aws-sdk';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import ForgotPasswordPopup from '../../components/ForgotPasswordPopup';
import styles from './styles';
import awsExports from '../../../aws-exports';

Amplify.configure(awsExports);

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
      error.username = 'Incorrect username / email or email not verified';
    } else if (err.code === 'UserNotConfirmedException') {
      error.username = 'You have not verified your email. Please check your mailbox.';
    } else if (err.code === 'NotAuthorizedException') {
      error.username = err.message; error.password = err.message;
    }
    const state = { ...this.state, error };
    this.setState(state);
  }

  cognitoSignIn = () => {
    const { username, password } = this.state;
    Auth.signIn(username, password)
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        this.signInError(err);
      });
  }

  facebookSignIn = async () => {
    const { type, token, expires } = await Expo.Facebook.logInWithReadPermissionsAsync('696904080692208', {
      permissions: ['public_profile', 'email'],
    });
    console.log('expires:', expires);
    if (type === 'success') {
      // sign in with federated identity
      const fields = 'email,name';
      const userData = await fetch(`https://graph.facebook.com/me?fields=${fields}&access_token=${token}`);
      Auth.federatedSignIn('facebook',
        { token, expires_at: expires },
        { name: userData.name, email: userData.email })
        .then((credentials) => {
          console.log('get aws credentials', credentials);
        }).catch((e) => {
          console.log(e);
        });
    }
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
        const { email, name } = result.user;
        const twoMonthsSeconds = 5184000;
        const expiresAt = (new Date().getTime() / 1000) + twoMonthsSeconds;
        Auth.federatedSignIn('google',
          { token: result.idToken, expires_at: expiresAt },
          { name, email })
          .then((credentials) => {
            console.log('get aws credentials', credentials);
          }).catch((e) => {
            console.log(e);
          });
      } else {
        console.log('cancelled');
      }
    } catch (e) {
      console.log('error', e);
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
                  label="Username or Email"
                  focusColor="white"
                  unfocusColor="#D3D3D3"
                  autoCapitalize="none"
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
                  autoCapitalize="none"
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
