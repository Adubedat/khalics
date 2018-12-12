import React from 'react';
import ExerciseDescription from '../../components/ExerciseDescription/ExerciseDescription';

class Exercise extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.exercise.name,
  })

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.exercise = navigation.state.params.exercise;
    this.state = {};
  }

  componentDidMount() {}

  render() {
    // const { description, difficultyNum } = this.exercise;

    return (
      // <View />
      <ExerciseDescription exercise={this.exercise} />
    );
  }
}

export default Exercise;
