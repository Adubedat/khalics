import React from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Text } from 'react-native-elements';

const workouts = [
  {
    name: 'Full body',
    description: 'dips, pullup, squat',
  },
  {
    name: 'Upper body',
    description: 'push up, chin up, l-sit',
  },
];

class WorkoutList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  keyExtractor = (item, index) => index;

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      containerStyle={{ backgroundColor: '#3c3c3c' }}
      titleStyle={{ color: 'white', fontWeight: 'bold' }}
      subtitleStyle={{ color: 'white' }}
      subtitle={item.description}
      topDivider
    />
  );

  render() {
    // '#EB241A' -> red
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#3c3c3c' }}>
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
