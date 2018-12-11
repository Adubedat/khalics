import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import theme from '../../theme';
import styles from './styles';

class OnGoingWorkout extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', 'EXERCISE'),
  });

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.workout = navigation.getParam('workout');
    this.exercises = navigation.getParam('exercises');
    this.state = {
      currentExerciseIndex: 0,
      currentSetIndex: 1,
      totalSetDone: 0,
    };
    const { currentExerciseIndex } = this.state;
    navigation.setParams({ title: this.exercises[currentExerciseIndex].name });
    console.log(this.props.navigation.state.params);
  }

  nextSet = () => {
    const { navigation } = this.props;
    const { workout, exercises } = this;
    const { totalSetDone } = this.state;
    const len = workout.exercises.length;
    let temp = totalSetDone + 1;
    for (let i = 0; i < len; i += 1) {
      if (temp < workout.exercises[i].totalSet) {
        this.setState({
          currentExerciseIndex: i,
          currentSetIndex: temp + 1,
          totalSetDone: totalSetDone + 1,
        });
        navigation.setParams({ title: exercises[i].name });
        return;
      }
      temp -= workout.exercises[i].totalSet;
    }
  }

  render() {
    const { currentExerciseIndex, currentSetIndex } = this.state;
    console.log(this.state);
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text>Rest container</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>Exercise component</Text>
        </View>
        <View style={{
          flex: 1, justifyContent: 'center', backgroundColor: theme.darkGray2, padding: 16,
        }}
        >
          <Button
            title="START"
            raised
            containerStyle={{ borderRadius: 2, backgroundColor: theme.darkGray2 }}
            buttonStyle={{ backgroundColor: theme.red }}
            titleStyle={{ fontWeight: 'bold' }}
            onPress={() => this.nextSet()}
          />
        </View>
      </View>
    );
  }
}

export default OnGoingWorkout;
