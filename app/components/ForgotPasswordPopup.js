import React from 'react';
import { StyleSheet } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import Amplify, { Auth } from 'aws-amplify';
import FloatingLabelInput from './FloatingLabelInput';
import awsExports from '../../aws-exports';

Amplify.configure(awsExports);

class ForgotPasswordPopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      newPassword: '',
      verifCode: '',
      isVisible: false,
    };
  }

  handleEmailTextChange = (newText) => {
    this.setState({ email: newText });
  }

  handleVerifCodeChange = (newText) => {
    this.setState({ verifCode: newText });
  }

  handleNewPasswordTextChange = (newText) => {
    this.setState({ newPassword: newText });
  }

  forgotPassword = () => {
    // const { email } = this.state;
    const email = 'arthur.dubedat@gmail.com';
    Auth.forgotPassword(email)
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  forgotPasswordSubmit = () => {
    const { verifCode, newPassword, email } = this.state;
    Auth.forgotPasswordSubmit(email, verifCode, newPassword)
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  closePopup = () => {
    this.setState({
      email: '',
      newPassword: '',
      verifCode: '',
      isVisible: false,
    });
  }

  visible = () => {
    this.setState({ isVisible: true });
  }

  render() {
    const {
      isVisible, email, newPassword, verifCode,
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
          label="Email"
          value={email}
          onChangeText={this.handleEmailTextChange}
          autoCapitalize="none"
          keyboardType="email-address"
        />
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
          autoCapitalize="none"
        />
        <FloatingLabelInput
          label="New password"
          value={newPassword}
          onChangeText={this.handleNewPasswordTextChange}
          autoCapitalize="none"
          secureTextEntry
        />
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
});

export default ForgotPasswordPopup;
