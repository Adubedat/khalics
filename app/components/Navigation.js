import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import WorkoutList from '../containers/WorkoutList/WorkoutList';
import Workout from '../containers/Workout/Workout';
import Exercise from '../containers/Exercise/Exercise';
import Profile from '../containers/Profile/Profile';
import Settings from '../containers/Settings/Settings';
import OnGoingWorkout from '../containers/OnGoingWorkout/OnGoingWorkout';

const WorkoutStackNavigator = createStackNavigator(
  {
    WorkoutList,
    Workout,
    Exercise,
    OnGoingWorkout,
  },
  {
    navigationOptions: {
      headerStyle: { backgroundColor: '#181818' },
      headerTitleStyle: { fontWeight: 'bold' },
      headerBackTitle: null,
      headerTintColor: 'white',
    },
  },
);

const SettingsStackNavigator = createStackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: () => ({
      title: 'Settings',
      headerStyle: { backgroundColor: '#181818' },
      headerTitleStyle: { fontWeight: 'bold' },
      headerBackTitle: null,
      headerTintColor: 'white',
    }),
  },
});

const MainTabNavigator = createMaterialBottomTabNavigator(
  {
    Settings: {
      screen: SettingsStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="cog"
            type="entypo"
            color={tintColor}
          />
        ),
      },
    },
    Workout: {
      screen: WorkoutStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="dumbbell"
            type="material-community"
            color={tintColor}
          />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="user"
            type="entypo"
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'Workout',
    shifting: true,
    labeled: true,
    activeColor: 'white',
    inactiveColor: '#808080',
    barStyle: {
      backgroundColor: '#282828',
      borderTopWidth: 1,
      borderTopColor: '#484848',
    },
  },
);

export default MainTabNavigator;
