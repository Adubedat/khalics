import React from 'react';
import { View, Text } from 'react-native';

class OnGoingWorkout extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'WALLAH',
  });

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>Wallah</Text>
      </View>
    );
  }
}

export default OnGoingWorkout;
