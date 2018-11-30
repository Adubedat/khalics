import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Text, Button } from 'react-native-elements';
import theme from '../../theme';
import styles from './styles';

export default class TestMySkills extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View>
          <Text h2 style={{ color: 'white', textAlign: 'center' }}>
            Test my skills
          </Text>
          <Button
            large
            title="Test my skills"
          />
        </View>
      </View>
    );
  }
}
