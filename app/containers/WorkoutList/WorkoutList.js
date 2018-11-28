import React, { Component } from 'react';
import {
  View, StyleSheet, FlatList, StatusBar,
} from 'react-native';
import { Text } from 'react-native-elements';
import StepIndicator from 'react-native-step-indicator';

const stepIndicatorStyles = {
  stepIndicatorSize: 42,
  currentStepIndicatorSize: 45,
  separatorStrokeWidth: 4,
  currentStepStrokeWidth: 6,
  stepStrokeCurrentColor: '#fe7013',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#aaaaaa',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 20,
  currentStepIndicatorLabelFontSize: 20,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 30,
  currentStepLabelColor: '#fe7013',
};

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

export default class VerticalStepIndicator extends Component {
  constructor() {
    super();

    this.state = {
      currentWorkout: 0,
    };
    this.viewabilityConfig = { itemVisiblePercentThreshold: 40 };
  }

  renderPage = (rowData) => {
    const item = rowData.item;
    return (
      <View style={styles.rowItem}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    const visibleItemsCount = viewableItems.length;
    if (visibleItemsCount !== 0) {
      this.setState({ currentWorkout: viewableItems[visibleItemsCount - 1].index });
    }
  }

  render() {
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
            currentPosition={this.state.currentWorkout}
            labels={workouts.map(item => item.name)}
          />
        </View>
        {/* <FlatList
          style={{ flexGrow: 1 }}
          data={workouts}
          renderItem={this.renderPage}
          onViewableItemsChanged={this.onViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3C3C3C',
  },
  mainTitle: {
    marginTop: 50,
    alignItems: 'center',
    flexDirection: 'column',
  },
  stepIndicator: {
    paddingLeft: 42,
    flexDirection: 'row',
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'red',
  },
  rowItem: {
    flex: 3,
    paddingVertical: 20,
  },
  name: {
    flex: 1,
    fontSize: 20,
    color: '#333333',
    paddingVertical: 16,
    fontWeight: '600',
  },
  description: {
    flex: 1,
    fontSize: 15,
    color: '#606060',
    lineHeight: 24,
    marginRight: 8,
  },
});
