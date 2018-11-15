import React from 'react';
import {
  View,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {
  Text,
  Button,
} from 'react-native-elements';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from 'amazon-cognito-identity-js';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import styles from './styles';

class SignUp extends React.PureComponent {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }

  handleUsernameTextChange = (newText) => {
    this.setState({
      username: newText,
    });
  }

  handleEmailTextChange = (newText) => {
    this.setState({
      email: newText,
    });
  }

  handlePasswordTextChange = (newText) => {
    this.setState({
      password: newText,
    });
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
    const { username, email, password } = this.state;
    //  const resizeMode = 'center';
    console.log('SIGN UP !');
    // this.signUp();
    return (
      <ImageBackground
        source={require('../../../assets/gym-background.jpg')}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.5)' }}>
          <StatusBar barStyle="light-content" />
          <View style={styles.main_container}>
            <View style={styles.title_container}>
              <Text style={styles.title}>Khalics</Text>
            </View>
            <View style={styles.form_container}>
              <FloatingLabelInput
                label="Username"
                value={username}
                onChangeText={this.handleUsernameTextChange}
              />
              <FloatingLabelInput
                label="Email"
                value={email}
                onChangeText={this.handleEmailTextChange}
              />
              <FloatingLabelInput
                label="Password"
                value={password}
                onChangeText={this.handlePasswordTextChange}
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
      </ImageBackground>
    );
  }
}

export default SignUp;
