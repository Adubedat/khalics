import React from 'react';
import {
  View,
  StatusBar,
  Text,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
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
        <View style={{ marginBottom: 2 }}>
          <Text style={styles.title}>Old password</Text>
        </View>
        <Input
          containerStyle={styles.textInputContainer}
          value={oldPassword}
          onChangeText={(text) => { this.setState({ oldPassword: text }); }}
        />
        <View style={styles.titleBorder}>
          <Text style={styles.title}>New password</Text>
        </View>
        <Input
          containerStyle={styles.textInputContainer}
          value={newPassword}
          onChangeText={(text) => { this.setState({ newPassword: text }); }}
        />
        <Button
          title="CHANGE"
          raised
          containerStyle={{ borderRadius: 2, backgroundColor: theme.darkGray2 }}
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
