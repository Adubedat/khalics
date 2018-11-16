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
      email: 'test42@test.fr',
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
    let invalid = false;
    if (!/[\p{L}\p{M}\p{S}\p{N}\p{P}]+/.test(username)) {
      error.username = 'must be between between 1 and 32 characters';
      invalid = true;
    }
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
    // if error signUpError refresh state
    if (this.signUpError(username, email, password)) {
      return;
    }
    // console.log('-->', username, email, password);
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
        <Text>
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
                onChangeText={this.handleUsernameTextChange}
              />
              { this.fieldError(error.username) }
              <FloatingLabelInput
                label="Email"
                value={email}
                onChangeText={this.handleEmailTextChange}
              />
              { this.fieldError(error.email) }
              <FloatingLabelInput
                label="Password"
                value={password}
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
    );
  }
}

export default SignUp;
