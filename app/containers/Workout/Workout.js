import React from 'react';
import { Text } from 'react-native';

class Workout extends React.PureComponent {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    console.log(navigation.state.params);
    this.state = {};
  }

  render() {
    return (
      <Text>Welcome to the Workout page.</Text>
    );
  }
}

export default Workout;
