import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import styles from '../styles/SignUp_style';

class SignUp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.main_container}>
        <StatusBar barStyle="light-content" backgroundColor="#101010" />
        <Text style={styles.text}>Welcome to the sign up screen.</Text>
      </View>
    );
  }
}

export default SignUp;
