import React from 'react';
import {
  View,
  StatusBar,
  Text,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import theme from '../../theme';
import styles from './styles';

class PasswordChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      oldPasswordErr: '',
      newPasswordErr: '',
    };
  }

  changePassword = (oldPwd, newPwd) => {
    this.state.oldPasswordErr = '';
    this.state.newPasswordErr = '';
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,256}$/.test(newPwd)) {
      const newPasswordErr = 'Your new password must have at least one number, one uppercase letter,'
      + ' one lowercase letter and be between 8 and 256 characters';
      const state = { ...this.state, newPasswordErr };
      this.setState(state);
      return;
    }
    Auth.currentAuthenticatedUser()
      .then(user => Auth.changePassword(user, oldPwd, newPwd))
      .then((data) => {
        // TODO: alert success
        console.log('data:', data);
      }).catch((err) => { // eslint-disable-line
        console.log('error:', err);
        const oldPasswordErr = 'Invalid';
        const state = { ...this.state, oldPasswordErr };
        this.setState(state);
      });
  }

  fieldError = (errMsg) => {
    if (errMsg) {
      return (
        <Text style={styles.field_error}>
          { errMsg }
        </Text>
      );
    }
  }

  render() {
    const {
      oldPassword, newPassword, oldPasswordErr, newPasswordErr,
    } = this.state;
    return (
      <View style={{ flex: 1, padding: 10, backgroundColor: theme.darkGray2 }}>
        <StatusBar barStyle="light-content" />
        <FloatingLabelInput
          label="Old password"
          focusColor="white"
          unfocusColor="#D3D3D3"
          autoCapitalize="none"
          value={oldPassword}
          error={oldPasswordErr.length !== 0}
          secureTextEntry
          onChangeText={(text) => { this.setState({ oldPassword: text }); }}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => { this.PasswordTextInput.focus(); }}
        />
        { this.fieldError(oldPasswordErr) }
        <View style={{ marginBottom: 12 }}>
          <FloatingLabelInput
            inputRef={(input) => { this.PasswordTextInput = input; }}
            label="New password"
            focusColor="white"
            unfocusColor="#D3D3D3"
            autoCapitalize="none"
            value={newPassword}
            error={newPasswordErr.length !== 0}
            secureTextEntry
            onChangeText={(text) => { this.setState({ newPassword: text }); }}
            blurOnSubmit={false}
          />
          { this.fieldError(newPasswordErr) }
        </View>
        <Button
          title="CHANGE"
          raised
          containerStyle={{
            borderRadius: 2, backgroundColor: theme.darkGray2, marginHorizontal: '6%',
          }}
          buttonStyle={{ backgroundColor: theme.red }}
          titleStyle={{ fontWeight: 'bold' }}
          onPress={() => this.changePassword(oldPassword, newPassword)}
        />
      </View>
    );
  }
}

export default PasswordChange;
