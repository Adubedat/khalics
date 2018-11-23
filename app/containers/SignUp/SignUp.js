import React from 'react';
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
import Amplify, { Auth } from 'aws-amplify';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import styles from './styles';
import awsExports from '../../../aws-exports';

Amplify.configure(awsExports);

class SignUp extends React.PureComponent {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      error: { username: '', email: '', password: '' },
    };
    // below for testing
    this.state = {
      username: 'tedst42',
      email: 'test@test.fr',
      password: 'Password1',
      error: { username: '', email: '', password: '' },
    };
  }

  handleUsernameTextChange = (newText) => {
    this.setState({
      username: newText,
    });
  }

  handleEmailTextChange = (newText) => {
    this.setState({
      email: newText,
    });
  }

  handlePasswordTextChange = (newText) => {
    this.setState({
      password: newText,
    });
  }

  signUpFrontError = (username, email, password) => {
    const error = { username: '', email: '', password: '' };
    if (/\s/.test(username) || username.length === 0 || username.length > 32) {
      error.username = 'must be between between 1 and 32 characters';
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,256}$/.test(password)) {
      error.password = 'Your password must have at least one number, one uppercase letter,'
      + ' one lowercase letter and be between 8 and 256 characters';
    }
    if (!/^\S+@\S+[\.][0-9a-z]{1,}$/.test(email) //eslint-disable-line
        || email.length < 3 || email.length > 256) {
      error.email = 'invalid email format';
    }
    const invalid = Object.values(error).some(val => val.length !== 0);
    if (invalid) {
      const state = { ...this.state, error };
      this.setState(state);
    }
    return invalid;
  }

  signUpBackError = (error) => {
    const errorMsg = { username: '', email: '', password: '' };
    if (error.code === 'UsernameExistsException') {
      errorMsg.username = error.message;
    }
    const state = { ...this.state, error: errorMsg };
    this.setState(state);
  }

  signUp = () => {
    const { username, email, password } = this.state;
    const { navigation } = this.props;
    if (this.signUpFrontError(username, email, password)) {
      return;
    }
    Auth.signUp({
      username,
      password,
      attributes: { email },
    })
      .then((data) => {
        navigation.state.params.displayVerifyEmail();
        navigation.goBack();
        console.log(data);
      })
      .catch((err) => {
        this.signUpBackError(err);
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

  render() {
    const {
      username,
      email,
      password,
      error,
    } = this.state;
    const { navigation } = this.props;
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} enableOnAndroid>
        <ImageBackground
          source={require('../../../assets/gym-background.jpg')}
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
                  title="Sign up with facebook"
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
                />
                <Button
                  title="Sign up with google"
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
                  onSubmitEditing={() => { this.EmailTextInput.focus(); }}
                />
                { this.fieldError(error.username) }
                <FloatingLabelInput
                  inputRef={(input) => { this.EmailTextInput = input; }}
                  label="Email"
                  focusColor="white"
                  unfocusColor="#D3D3D3"
                  value={email}
                  error={error.email.length !== 0}
                  onChangeText={this.handleEmailTextChange}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onSubmitEditing={() => { this.PasswordTextInput.focus(); }}
                />
                { this.fieldError(error.email) }
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
              </View>
              <View style={styles.validation_container}>
                <Button
                  buttonStyle={styles.form_button}
                  style={{ borderRadius: 4 }}
                  title="Sign up"
                  titleStyle={{ fontWeight: 'bold' }}
                  color="white"
                  onPress={this.signUp}
                />
                <Text
                  style={[styles.small_text, { textAlign: 'center' }]}
                  onPress={() => { navigation.navigate('SignIn'); }}
                >
                  Already have an account ?
                  <Text style={{ fontWeight: 'bold' }}> Sign in</Text>
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    );
  }
}

export default SignUp;
