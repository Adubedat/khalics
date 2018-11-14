import React from 'react'
import styles from '../styles/SignUp_style'
import { View, Text, StatusBar } from 'react-native'

class SignUp extends React.PureComponent {
  render() {
    return (
      <View style={styles.main_container}>
        <StatusBar barStyle="light-content" />
          <Text style={styles.text}>Welcome to the sign up screen.</Text>
      </View>
    )
  }
}

export default SignUp;
