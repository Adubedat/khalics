import React from 'react'
import styles from '../styles/SignUp_style'
import { View, Text, StatusBar } from 'react-native'

class SignUp extends React.PureComponent {
  render() {
    return (
      <View backgroundColor="#303030">
        <StatusBar barStyle="light-content" />
        <View>
          <StatusBar hidden={route.statusBarHidden} />
          <Text style={styles.text}>Welcome to the sign up screen.</Text>
        </View>
      </View>
    )
  }
}

export default SignUp;
