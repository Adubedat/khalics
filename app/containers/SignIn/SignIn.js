import React from 'react';
import {
  View,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {
  Text,
  Input,
  Button,
} from 'react-native-elements';
import styles from './styles';

class SignIn extends React.PureComponent {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ImageBackground
        source={require('../../../assets/gym-background.jpg')}
        resizeMode="cover"
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
            <View style={{ flex: 0.7, alignItems: 'center' }}>
              <Input
                label="username"
                containerStyle={{ marginBottom: '2%' }}
                inputStyle={{ color: 'white' }}
                labelStyle={{ color: 'white' }}
              />
              <Input
                label="password"
                containerStyle={{ marginBottom: '4%' }}
                inputStyle={{ color: 'white' }}
                labelStyle={{ color: 'white' }}
              />
              <View>
                <Button
                  title="Sign up"
                  radius={10}
                  buttonStyle={{ backgroundColor: '#D60000' }}
                  onPress={() => {}}
                />
              </View>
              <Text
                style={{ color: 'white', fontSize: 15 }}
                onPress={() => { this.props.navigation.navigate('SignUp'); }}
              >
                Don&apos;t have an account?
                <Text style={{ fontWeight: 'bold' }}> SignUp</Text>
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default SignIn;
