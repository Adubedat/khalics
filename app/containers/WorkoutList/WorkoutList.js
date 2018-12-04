import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Text } from 'react-native-elements';
import StepIndicator from '../../components/StepIndicator';
import { styles, stepIndicatorStyles } from './styles';
import TestMySkills from '../testMySkills/testMySkills';

export default class WorkoutList extends Component {
  constructor() {
    super();

    this.state = {
      currentWorkout: 0,
      workouts: [],
      loading: true, // false when all data has been fetched
      // because componentWillUpdate is deprecated and should never be used
    };
  }

  async componentDidMount() {
    const getWorkoutUrl = 'https://qmzsdq8495.execute-api.eu-west-1.amazonaws.com/dev/workout/get';
    // below is example normally get workouts ids from user data
    const workoutsIds = ['4e720443-9165-44ac-8366-d970390409c1', 'f6e6f739-e568-4bfb-8671-1bac585a9544', '48e76214-7c0a-439a-8170-54cb37b620a1'];
    const ids = workoutsIds.reduce((acc, val, index, array) => {
      let param = `"${val}"`;
      if (index !== array.length - 1) { param += ', '; }
      return acc + param;
    }, '');
    const res = await fetch(`${getWorkoutUrl}?ids=[${ids}]`);
    const resJson = await res.json();
    console.log(resJson);
    const state = { ...this.state, workouts: resJson.workouts, loading: false };
    this.setState(state);
  }

  render() {
    const { currentWorkout, workouts, loading } = this.state;
    const { navigation } = this.props;
    if (loading) { return <View />; } // loading page ?
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
            onPress={(number) => { navigation.navigate('Workout', { workout: workouts[number] }); }}
          />
        </View>
      </View>
    );
  }
}
