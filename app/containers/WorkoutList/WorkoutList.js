import React from 'react';
import { View, FlatList, StatusBar } from 'react-native';
import { ListItem, Text, Divider } from 'react-native-elements';

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

class WorkoutList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
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
