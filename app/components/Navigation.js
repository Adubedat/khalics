import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import WorkoutList from '../containers/WorkoutList/WorkoutList';
import WorkoutDetails from '../containers/WorkoutDetails/WorkoutDetails';
import Profile from '../containers/Profile/Profile';
import Settings from '../containers/Settings/Settings';

const styles = StyleSheet.create({
  labelStyle: {
    color: 'white',
    textAlign: 'center',
  },
});

const WorkoutStackNavigator = createStackNavigator({
  WorkoutList,
  WorkoutDetails,
});

const MainTabNavigator = createBottomTabNavigator(
  {
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="cog"
            type="entypo"
            color={tintColor}
          />
        ),
        tabBarLabel: ({ focused }) => (focused ? <Text style={styles.labelStyle}>Settings</Text> : null),
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
        tabBarLabel: ({ focused }) => (focused ? <Text style={styles.labelStyle}>Workout</Text> : null),
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
        tabBarLabel: ({ focused }) => (focused ? <Text style={styles.labelStyle}>Profile</Text> : null),
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: true,
      showIcon: true,
      activeTintColor: 'white',
      inactiveTintColor: '#D3D3D3',
      style: { backgroundColor: '#202020' },
      labelStyle: { color: 'white' },
    },
    animationEnabled: true,
  },
);

export default MainTabNavigator;
