import React from 'react';
import {
  View,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {
  Text,
  Button,
} from 'react-native-elements';
import {
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import styles from './styles';

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
      username: 'test42',
      email: 'test42test.fr',
      password: 'Pas42sword1',
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

  signUpError = (username, email, password) => {
    const error = { username: '', email: '', password: '' };
    if (/\s/.test(username) || username.length === 0 || username.length > 32) {
      error.username = 'must be between between 1 and 32 characters';
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,256}$/.test(password)) {
      error.password = 'must require at least one number, one uppercase letter,'
      + ' one lowercase letter and be between 8 and 256 characters';
    }
    if (!/^\S+@\S+[\.][0-9a-z]{3,255}$/.test(email) //eslint-disable-line
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

  signUp = () => {
    const poolData = {
      UserPoolId: 'eu-west-1_jrpxZzyiw',
      ClientId: '2h58edhdok2kc8ujlankvev9cj',
    };
    const { username, email, password } = this.state;
    // if error signUpError refresh the state
    if (this.signUpError(username, email, password)) {
      return;
    }
    const userPool = new CognitoUserPool(poolData);
    const attributeList = [];
    const dataEmail = {
      Name: 'email',
      Value: email,
    };
    const attributeEmail = new CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);
    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      const cognitoUser = result.user;
      console.log(`user name is ${cognitoUser.getUsername()}`);
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
                <Text style={styles.title}>Khalics</Text>
              </View>
              <View style={styles.form_container}>
                <FloatingLabelInput
                  label="Username"
                  value={username}
                  error={error.username.length !== 0}
                  onChangeText={this.handleUsernameTextChange}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => { this.EmailTextInput.focus(); }}
                  error={(error.username.length !== 0)}
                />
                { this.fieldError(error.username) }
                <FloatingLabelInput
                  inputRef={(input) => { this.EmailTextInput = input; }}
                  label="Email"
                  value={email}
                  error={error.email.length !== 0}
                  onChangeText={this.handleEmailTextChange}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  keyboardType="email-address"
                  onSubmitEditing={() => { this.PasswordTextInput.focus(); }}
                  error={(error.email.length !== 0)}
                />
                { this.fieldError(error.email) }
                <FloatingLabelInput
                  inputRef={(input) => { this.PasswordTextInput = input; }}
                  label="Password"
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
                  title="Sign up"
                  titleStyle={{ fontWeight: 'bold' }}
                  color="white"
                  onPress={this.signUp}
                />
                <Text style={[styles.small_text, { textAlign: 'center' }]}>
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
