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
import styles from './styles';

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
          <View style={{ flex: 0.7, alignItems: 'center' }}>
            <Input label="username" containerStyle={{ marginBottom: '2%' }} inputStyle={{ color: 'white' }} labelStyle={{ color: 'white' }} />
            <Input label="password" containerStyle={{ marginBottom: '4%' }} inputStyle={{ color: 'white' }} labelStyle={{ color: 'white' }} />
            <Button borderRadius={10} title="Sign up" buttonStyle={{ backgroundColor: '#e74c3c', marginBottom: '6%' }} color="white" />
            {/* TODO: cannot set fontSize on text */}
            <Text style={{ color: 'white' }}>Don't have an account? Sign up</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default SignUp;
