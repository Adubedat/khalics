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
          <Text h2 style={styles.mainTitle}>
            Test my skills
          </Text>
          <Text style={styles.presentationTxt}>
            In Khalics we will generate a workout that fit you.
            {'\n\n'}
            We use powerful algorithm to reach this goal.
            {'\n\n'}
            First, we need to test you, then we will be able to evaluate your skill
            and generate for you a workout.
            {'\n\n'}
            The aim of the workout is to improve your skill towards mastering
            calisthenics figures.
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button
              raised
              containerStyle={{ flex: 0.8 }}
              buttonStyle={{ backgroundColor: theme.red }}
              titleStyle={{ color: 'white', fontWeight: 'bold', fontSize: 25 }}
              title="Test my skills"
            />
          </View>
        </View>
      </View>
    );
  }
}
