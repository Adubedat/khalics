import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Text } from 'react-native-elements';
import StepIndicator from '../../components/StepIndicator';
import { styles, stepIndicatorStyles } from './styles';
import TestMySkills from '../testMySkills/testMySkills';

// TODO: fetch workouts from DB or from generate workout
const workouts = [
  {
    name: 'Full body',
    description: 'dips, pullup, squat',
  },
  {
    name: 'Upper body',
    description: 'push up, chin up, l-sit',
  },
  {
    name: 'Lower body',
    description: 'squat, deadlift, calves raise',
  },
];

export default class WorkoutList extends Component {
  constructor() {
    super();

    this.state = {
      currentWorkout: 0,
      testSkill: true,
    };
  }

  render() {
    const { currentWorkout, testSkill } = this.state;
    if (testSkill) {
      return (
        <TestMySkills />
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.mainTitle}>
          <Text h2 style={{ color: 'white', textAlign: 'center' }}>Workouts</Text>
        </View>
        <View style={styles.stepIndicator}>
          <StepIndicator
            customStyles={stepIndicatorStyles}
            stepCount={3}
            direction="vertical"
            currentPosition={currentWorkout}
            labels={workouts.map(item => item.name)}
            descriptions={workouts.map(item => item.description)}
          />
        </View>
      </View>
    );
  }
}
