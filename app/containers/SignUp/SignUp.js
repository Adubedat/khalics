import React from 'react';
import {
  View,
  StatusBar,
} from 'react-native';
import {
  Text,
  Input,
  Button,
  Icon,
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
          <View style={styles.form_container}>
            <Input
              label="Username"
              leftIcon={(
                <Icon
                  name="user-o"
                  type="font-awesome"
                  color="white"
                />
              )}
            //  leftIconContainerStyle={styles.left_icon_container}
            />
            <Input
              label="Email"
              leftIcon={(
                <Icon
                  name="envelope-o"
                  type="font-awesome"
                  color="white"
                />
              )}
            //  leftIconContainerStyle={styles.left_icon_container}
            />
            <Input
              secureTextEntry
              label="Password"
              leftIcon={(
                <Icon
                  name="lock"
                  type="evilicon"
                  color="white"
                  size={45}
                />
              )}
              leftIconContainerStyle={{ marginLeft: 5 }}
              inputStyle={{ marginLeft: 0 }}
              labelStyle={styles.form_label}
              inputContainerStyle={styles.form_input_container}
            />
            <Button
              buttonStyle={styles.form_button}
              title="SIGN UP"
              titleStyle={{ fontWeight: 'bold' }}
              color="white"
            />
            <Text style={[styles.small_text, { textAlign: 'center' }]}>
              Already have an account ?
              <Text style={{ fontWeight: 'bold' }}> Sign in</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default SignUp;
