import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import Amplify, { Auth } from 'aws-amplify';
import FloatingLabelInput from './FloatingLabelInput';
import awsExports from '../../aws-exports';

Amplify.configure(awsExports);

class ForgotPasswordPopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      newPassword: '',
      verifCode: '',
      isVisible: false,
      error: { username: '', verifCode: '', newPassword: '' },
    };
  }

  handleUsernameTextChange = (newText) => {
    this.setState({ username: newText });
  }

  handleVerifCodeChange = (newText) => {
    this.setState({ verifCode: newText });
  }

  handleNewPasswordTextChange = (newText) => {
    this.setState({ newPassword: newText });
  }

  fieldError = (field) => {
    if (field) {
      return (
        <Text style={styles.field_error}>  {/*eslint-disable-line*/}
          { field }
        </Text>
      );
    }
  }

  forgotPasswordError = (err) => {
    console.log(err);
    const error = { username: '', newPassword: '', verifCode: '' };
    if (err.code === 'UserNotFoundException') {
      error.username = 'Incorrect username / email or email not verified';
    } else if (err.code === 'InvalidParameterException') {
      error.username = 'You have not verified your email. Please check your mailbox.';
    } else {
      error.username = 'Incorrect username or email.';
    }
    const state = { ...this.state, error };
    this.setState(state);
  }

  forgotPasswordSubmitError = (err) => {
    const error = { username: '', newPassword: '', verifCode: '' };
    console.log(err);
    if (err.code === 'CodeMismatchException') {
      error.verifCode = 'Incorrect verification code.';
    } else if (err === 'Code cannot be empty') {
      error.verifCode = 'Cannot be empty.';
    } else if (err.code === 'ExpiredCodeException') {
      error.verifCode = 'Your code expired.';
    } else {
      error.newPassword = 'Your password must have at least one number, one uppercase letter,'
      + ' one lowercase letter and be between 8 and 256 characters';
    }
    const state = { ...this.state, error };
    this.setState(state);
  }

  forgotPassword = () => {
    const { username } = this.state;
    Auth.forgotPassword(username)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        this.forgotPasswordError(err);
      });
  }

  forgotPasswordSubmit = () => {
    const { verifCode, newPassword, username } = this.state;
    Auth.forgotPasswordSubmit(username, verifCode, newPassword)
      .then(data => console.log(data))
      .catch((err) => {
        this.forgotPasswordSubmitError(err);
      });
  }

  closePopup = () => {
    this.setState({
      username: '',
      newPassword: '',
      verifCode: '',
      isVisible: false,
      error: { username: '', verifCode: '', newPassword: '' },
    });
  }

  visible = () => {
    this.setState({ isVisible: true });
  }

  render() {
    const {
      isVisible, username, newPassword, verifCode, error,
    } = this.state;
    return (
      <Overlay
        isVisible={isVisible}
        windowBackgroundColor="rgba(52, 52, 52, 0.7)"
        onBackdropPress={this.closePopup}
        width="80%"
        height="auto"
        borderRadius={10}
      >
        <FloatingLabelInput
          label="Username or email"
          value={username}
          onChangeText={this.handleUsernameTextChange}
          error={error.username.length !== 0}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        { this.fieldError(error.username) }
        <Button
          title="Send verification code"
          style={{ borderRadius: 4 }}
          buttonStyle={styles.form_button} // eslint-disable-line
          onPress={this.forgotPassword}
        />
        <FloatingLabelInput
          label="Verification code"
          value={verifCode}
          onChangeText={this.handleVerifCodeChange}
          error={error.verifCode.length !== 0}
          autoCapitalize="none"
        />
        { this.fieldError(error.verifCode) }
        <FloatingLabelInput
          label="New password"
          value={newPassword}
          onChangeText={this.handleNewPasswordTextChange}
          error={error.newPassword.length !== 0}
          autoCapitalize="none"
          secureTextEntry
        />
        { this.fieldError(error.newPassword) }
        <Button
          title="Change password"
          style={{ borderRadius: 4 }}
          buttonStyle={styles.form_button} // eslint-disable-line
          onPress={this.forgotPasswordSubmit}
        />
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  form_button: {
    backgroundColor: '#EB241A',
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    elevation: 0,
    height: 40,
  },
  field_error: {
    marginLeft: 20,
    marginRight: 20,
    color: '#EB241A',
  },
});

export default ForgotPasswordPopup;
