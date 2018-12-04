import React from 'react';
import { Text } from 'react-native';

class Workout extends React.PureComponent {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {};
  }

  async componentDidMount() {
    const getExerciseUrl = 'https://qmzsdq8495.execute-api.eu-west-1.amazonaws.com/dev/exercise/get';
    // below is example normally get workouts ids from user data

    const { navigation } = this.props;
    const { exercises } = navigation.state.params.workout;
    const ids = exercises.reduce((acc, val, index, array) => {
      let param = `"${val.id}"`;
      if (index !== array.length - 1) { param += ', '; }
      return acc + param;
    }, '');
    const res = await fetch(`${getExerciseUrl}?ids=[${ids}]`);
    const resJson = await res.json();
    console.log(resJson);
    // const state = { ...this.state, workouts: resJson.workouts, loading: false };
    // this.setState(state);
  }

  render() {
    return (
      <Text>Welcome to the Workout page.</Text>
    );
  }
}

export default Workout;
