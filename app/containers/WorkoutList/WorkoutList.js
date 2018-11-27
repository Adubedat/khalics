import React from 'react';
import { View, FlatList, StatusBar } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { ListItem, Text } from 'react-native-elements';

// do we add a warm up ?

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

const stepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: '#fe7013',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#aaaaaa',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 15,
  currentStepLabelColor: '#fe7013',
};

class WorkoutList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0, //
    };
  }

  listItemBorder = (index) => {
    if (index !== workouts.length - 1) {
      return {
        backgroundColor: '#3c3c3c', borderBottomWidth: 1, borderBottomColor: 'white',
      };
    }
    return { backgroundColor: '#3c3c3c' };
  }

  keyExtractor = (item, index) => index;

  renderItem = ({ item, index }) => (
    <ListItem
      title={item.name}
      containerStyle={this.listItemBorder(index)}
      titleStyle={{ color: 'white', fontWeight: 'bold' }}
      subtitleStyle={{ color: 'white' }}
      subtitle={item.description}
    />
  );

  render() {
    // '#EB241A' -> red
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#3c3c3c' }}>
        <View>
          <StepIndicator
            customStyles={stepIndicatorStyles}
            stepCount={6}
            direction="vertical"
            currentPosition={this.state.currentIndex}
            labels={workouts.map(item => item.title)}
          />
        </View>

        <StatusBar barStyle="light-content" />
        <View style={{ flex: 1, marginTop: 50, alignItems: 'center' }}>
          <Text h2 style={{ color: 'white' }}>Workouts</Text>
        </View>
        <View style={{ flex: 6 }}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={workouts}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}

export default WorkoutList;
