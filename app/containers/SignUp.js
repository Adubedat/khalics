import React from 'react';
import {
  View,
  StatusBar,
} from 'react-native';
import {
  Text,
  Input,
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
            <Input />
            <Input />
            <Input />
            <Button borderRadius={10} title="Sign up" backgroundColor="#C00000" color="white" />
          </View>
        </View>
      </View>
    );
  }
}

export default SignUp;
