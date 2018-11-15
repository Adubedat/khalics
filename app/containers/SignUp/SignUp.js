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
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from 'amazon-cognito-identity-js';
import styles from './styles';

class SignUp extends React.PureComponent {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  signUp = () => {
    const poolData = {
      UserPoolId: 'eu-west-1_jrpxZzyiw',
      ClientId: '2h58edhdok2kc8ujlankvev9cj',
    };
    const userPool = new CognitoUserPool(poolData);
    const attributeList = [];
    const dataEmail = {
      Name: 'email',
      Value: 'arthur.dubedat@gmail.com',
    };
    const attributeEmail = new CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);
    userPool.signUp('abcdefok', 'pD42assword', attributeList, null, (err, result) => {
      if (err) {
        console.log(err);
        // console.error(err);
        // alert(err);
        return;
      }
      const cognitoUser = result.user;
      console.log(`user name is ${cognitoUser.getUsername()}`);
    });
  }

  render() {
    console.log('SIGN UP !');
    this.signUp();
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
              labelStyle={styles.form_label}
              inputStyle={styles.form_input}
              containerStyle={styles.form_input_container}
              leftIconContainerStyle={{ marginLeft: 0 }}
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
              labelStyle={styles.form_label}
              inputStyle={styles.form_input}
              containerStyle={styles.form_input_container}
              leftIconContainerStyle={{ marginLeft: 0 }}
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
              leftIconContainerStyle={{ marginLeft: -10 }}
              inputStyle={[styles.form_input, { marginLeft: 0 }]}
              labelStyle={styles.form_label}
              containerStyle={styles.form_input_container}
            />
          </View>
          <View style={styles.validation_container}>
            <Button
              buttonStyle={styles.form_button}
              title="Sign up"
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
