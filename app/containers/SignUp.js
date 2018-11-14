import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TextInput,
} from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
} from 'react-native-elements';
import styles from '../styles/SignUp';

class SignUp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#303030' }}>
        <StatusBar barStyle="light-content" />
        <View style={styles.main_container}>
          <View style={styles.title_container}>
            <Text style={styles.title}>Khalics</Text>
          </View>
          <View style={{ flex: 2 }}>
            <FormLabel labelStyle={styles.form_label}>Username</FormLabel>
            <FormInput inputStyle={styles.form_input} />
            <FormValidationMessage>Error message</FormValidationMessage>
            <FormLabel labelStyle={styles.form_label}>Email</FormLabel>
            <FormInput inputStyle={styles.form_input} />
            <FormValidationMessage>Error message</FormValidationMessage>
            <FormLabel labelStyle={styles.form_label}>Password</FormLabel>
            <TextInput secureTextEntry style={styles.form_input} />
            <FormValidationMessage>Error message</FormValidationMessage>
            <Button borderRadius={10} title="Sign up" backgroundColor="#C00000" color="white" />
          </View>
        </View>
      </View>
    );
  }
}

export default SignUp;
