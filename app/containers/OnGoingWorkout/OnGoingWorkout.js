import React from 'react';
import {
  View, Text, ScrollView, Dimensions,
} from 'react-native';
import { Button } from 'react-native-elements';
import ProgressCircle from 'react-native-progress/Circle';
import Exercise from '../Exercise/Exercise';
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
    this.timeoutId = null;
    this.state = {
      currentExerciseIndex: 0,
      currentSet: 1,
      totalSetDone: 0,
      restTime: 0,
    };
    const { currentExerciseIndex } = this.state;
    navigation.setParams({ title: this.exercises[currentExerciseIndex].name });
    console.log(this.props.navigation.state.params);
  }

  componentDidUpdate() {
    const { restTime } = this.state;
    if (!this.timeoutId && restTime > 0) {
      this.timeoutId = setInterval(
        () => this.setState(prevState => ({ restTime: prevState.restTime - 1 })),
        1000,
      );
    }
    if (restTime <= 0) {
      clearInterval(this.timeoutId);
      this.timeoutId = null;
    }
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearInterval(this.timeoutId);
    }
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
          currentSet: temp + 1,
          totalSetDone: totalSetDone + 1,
          restTime: workout.restTime,
        });
        navigation.setParams({ title: exercises[i].name });
        return;
      }
      temp -= workout.exercises[i].totalSet;
    }
  }

  renderHeader = () => {
    const { restTime } = this.state;
    if (restTime > 0) {
      return (this.renderTimer());
    }
    return (this.renderGoal());
  }

  renderTimer = () => {
    const screenWidth = Dimensions.get('window').width;
    const fontSize = screenWidth / 16;
    const { restTime } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
        <View style={{ width: screenWidth / 3, paddingRight: 20 }}>
          <Text style={[styles.header_text, { fontSize, textAlign: 'right' }]}>Rest</Text>
        </View>
        <ProgressCircle
          progress={restTime / this.workout.restTime}
          color={theme.red}
          size={screenWidth / 4}
          borderWidth={0}
          unfilledColor={theme.darkGray1}
          showsText
          formatText={() => restTime}
          textStyle={{ color: 'white', fontSize }}
        />
        <View style={{ width: screenWidth / 3, paddingLeft: 20 }}>
          <Text style={[styles.header_text, { fontSize, textAlign: 'left' }]}>seconds</Text>
        </View>
      </View>
    );
  }

  renderGoal = () => {
    const { currentSet, currentExerciseIndex } = this.state;
    const set = `Set ${currentSet}`;
    const goal = `Goal x${this.workout.exercises[currentExerciseIndex].repBySet}`;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, color: 'white', fontWeight: '400' }}>{set}</Text>
        <Text style={{ fontSize: 50, color: 'white', fontWeight: '400' }}>{goal}</Text>
      </View>
    );
  }

  render() {
    console.log(this.state);
    const { currentExerciseIndex } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header_container}>
          {this.renderHeader()}
        </View>
        <View style={styles.exercise_container}>
          <ScrollView>
            <Text>Exercise component</Text>
            {/* <Exercise exercise={this.exercises[currentExerciseIndex]} /> */}
          </ScrollView>
        </View>
        <View style={styles.button_container}>
          <Button
            title="DONE"
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
