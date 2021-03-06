import React, { Component } from 'react';
import {
  View, StatusBar, FlatList, Text,
} from 'react-native';
import { Button } from 'react-native-elements';
import styles from './styles';
import TestMySkills from '../testMySkills/testMySkills';
import LoadingView from '../../components/LoadingView';
import WorkoutItem from '../../components/WorkoutItem';
import theme from '../../theme';

export default class WorkoutList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', 'WORKOUT'),
  });

  constructor() {
    super();

    this.state = {
      currentWorkout: 0,
      workouts: [],
      isLoading: true,
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
    const workouts = resJson.workouts || [];
    let currentWorkout;
    for (let i = 0; i < workouts.length; i += 1) {
      if (!workouts[i].done) {
        currentWorkout = i;
        break;
      }
    }
    const { navigation } = this.props;
    navigation.setParams({ title: 'WEEK 1' });
    const state = {
      ...this.state, workouts, fetch: true, isLoading: false, currentWorkout,
    };
    this.setState(state);
  }

  displayWorkout = (workout, index) => {
    const { navigation } = this.props;
    navigation.navigate(
      'Workout',
      { workout, index: index + 1 },
    );
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) { return <LoadingView />; }
    const { currentWorkout, workouts } = this.state;
    if (workouts.length === 0) {
      return (
        <TestMySkills />
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={{
          height: 70, justifyContent: 'space-around', paddingLeft: 16, paddingRight: 16,
        }}
        >
          <Text style={{ color: theme.gray1, fontSize: 14, fontWeight: '400' }}>
            Here is your weekly goal, try to spread your workouts over the week.
            {'\n'}
            Rest days are as important as workout days.
          </Text>
        </View>
        <View style={styles.workouts_container}>
          <FlatList
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            keyExtractor={item => item._id} // eslint-disable-line
            data={workouts}
            renderItem={({ item, index }) => (
              <WorkoutItem
                workout={item}
                index={index}
                displayWorkout={this.displayWorkout}
                done={item.done}
                current={(index === currentWorkout)}
                workoutsNbr={workouts.length}
              />
            )}
          />
        </View>
        <View style={{
          flex: 1, justifyContent: 'center', backgroundColor: theme.darkGray2, padding: 16,
        }}
        >
          <Button
            title="FINISH WEEK"
            raised
            containerStyle={{ borderRadius: 2 }}
            buttonStyle={{ backgroundColor: theme.red }}
            titleStyle={{ fontWeight: 'bold' }}
          />
        </View>
      </View>
    );
  }
}
