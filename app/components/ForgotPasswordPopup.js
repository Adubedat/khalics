import React from 'react';
import { StyleSheet } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import FloatingLabelInput from './FloatingLabelInput';

class ForgotPasswordPopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      email: '',
      newPassword: '',
      verifCode: '',
      isVisible: false,
    };
    this.cognitoUser = '';
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

  sendVerificationCode = () => {
    // const { email } = this.state;
    const email = 'arthur.dubedat@gmail.com';
    const poolData = {
      UserPoolId: 'eu-west-1_jrpxZzyiw',
      ClientId: '2h58edhdok2kc8ujlankvev9cj',
    };
    const userPool = new CognitoUserPool(poolData);
    const userData = {
      Username: email,
      Pool: userPool,
    };
    this.cognitoUser = new CognitoUser(userData);
    this.cognitoUser.forgotPassword({
      onSuccess: (result) => {
        console.log('sendVerificationCode success');
        console.log(result);
        this.setState({ step: 2 });
      },
      onFailure: (err) => {
        console.log('sendVerificationCode error');
        console.log(err);
      },
      inputVerificationCode: () => {
            setTimeout(() => {
              console.log('HELLo', this.state.verifCode);
              this.cognitoUser.confirmPassword(this.state.verifCode, 'newPassword42', {
                onSuccess: (result) => {
                  console.log('confirmPassword success');
                  console.log(result);
                },
                onFailure: (err) => {
                  console.log('confirmPassword error');
                  console.log(err);
                },
              });
            }, 20000);
            // var verificationCode = prompt('Please input verification code ' ,'');
            // var newPassword = prompt('Enter new password ' ,'');
            // const { verifCode, newPassword } = this.state;
        }
      // inputVerificationCode() {
      //   const verificationCode = prompt('Please input verification code ' ,'');
      //   const newPassword = prompt('Enter new password ' ,'');
      //   cognitoUser.confirmPassword(verificationCode, newPassword, this);
      // },
    });
  }

  changePassword = () => {
    console.log(this.cognitoUser);
    const { verifCode, newPassword, email } = this.state;
    const poolData = {
      UserPoolId: 'eu-west-1_jrpxZzyiw',
      ClientId: '2h58edhdok2kc8ujlankvev9cj',
    };
    const userPool = new CognitoUserPool(poolData);
    const userData = {
      Username: email,
      Pool: userPool,
    };
    //const cognitoUser = new CognitoUser(userData);
    this.cognitoUser.confirmPassword(verifCode, newPassword, {
      onSuccess: (result) => {
        console.log('confirmPassword success');
        console.log(result);
      },
      onFailure: (err) => {
        console.log('confirmPassword error');
        console.log(err);
      },
    });
  }

  closePopup = () => {
    this.setState({
      step: 1,
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
    const { isVisible, step, email, newPassword, verifCode } = this.state;
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
          onPress={this.sendVerificationCode}
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
          onPress={this.changePassword}
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
