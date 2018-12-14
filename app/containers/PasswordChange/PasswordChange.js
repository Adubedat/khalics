import React from 'react';
import {
  View,
  StatusBar,
  Text,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import theme from '../../theme';
import styles from './styles';

class PasswordChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
    };
  }

  render() {
    const { oldPassword, newPassword } = this.state;
    return (
      <View style={{ flex: 1, padding: 10, backgroundColor: theme.darkGray2 }}>
        <StatusBar barStyle="light-content" />
        <FloatingLabelInput
          label="Old password"
          focusColor="white"
          unfocusColor="#D3D3D3"
          autoCapitalize="none"
          value={oldPassword}
        //   error={error.username.length !== 0}
          onChangeText={(text) => { this.setState({ oldPassword: text }); }}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => { this.PasswordTextInput.focus(); }}
        />
        <View style={{ marginBottom: 12 }}>
          <FloatingLabelInput
            inputRef={(input) => { this.PasswordTextInput = input; }}
            label="New password"
            focusColor="white"
            unfocusColor="#D3D3D3"
            autoCapitalize="none"
            value={newPassword}
        //   error={error.username.length !== 0}
            onChangeText={(text) => { this.setState({ newPassword: text }); }}
            blurOnSubmit={false}
          />
        </View>
        <Button
          title="CHANGE"
          raised
          containerStyle={{
            borderRadius: 2, backgroundColor: theme.darkGray2, marginHorizontal: '6%',
          }}
          buttonStyle={{ backgroundColor: theme.red }}
          titleStyle={{ fontWeight: 'bold' }}
          onPress={() => {
            // if (!this.checkError()) {
            //   this.sendReport();
            // }
          }}
        />
      </View>
    );
  }
}

export default PasswordChange;
