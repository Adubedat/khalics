import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Text } from 'react-native-elements';
import StepIndicator from '../../components/StepIndicator';
import { styles, stepIndicatorStyles } from './styles';
import TestMySkills from '../testMySkills/testMySkills';

export default class WorkoutList extends Component {
  constructor() {
    super();

    this.testFetch = false; // to test fetching, to delete
    this.state = {
      currentWorkout: 0,
      workouts: [],
      fetch: false, // true when all data has been fetched
      // because componentWillUpdate is deprecated and should never be used
    };
  }

  async componentDidMount() {
    const getWorkoutUrl = 'https://qmzsdq8495.execute-api.eu-west-1.amazonaws.com/dev/workout/get';
    if (this.testFetch) {
      // below is example normally get workouts ids from user data
      const res = await fetch(`${getWorkoutUrl}?ids=["test", "test2"]`);
      const resJson = await res.json();
      const state = { ...this.state, workouts: resJson.workouts, fetch: true };
      this.setState(state);
    }
  }

  render() {
    this.state.fetch = true; // to delete
    const { currentWorkout, workouts, fetch } = this.state;
    if (!fetch) { return <View />; } // loading page ?
    if (workouts.length === 0) {
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
