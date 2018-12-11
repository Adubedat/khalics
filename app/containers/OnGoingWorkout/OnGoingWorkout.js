import React from 'react';
import {
  View, Text, ScrollView, Dimensions,
} from 'react-native';
import { Button } from 'react-native-elements';
import ProgressCircle from 'react-native-progress/Circle';
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
      currentSetIndex: 1,
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
          restTime: workout.restTime,
        });
        navigation.setParams({ title: exercises[i].name });
        return;
      }
      temp -= workout.exercises[i].totalSet;
    }
  }

  renderTimer = () => {
    const screenWidth = Dimensions.get('window').width;
    const fontSize = screenWidth / 16;
    return (
      <View style={{
        flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
      }}
      >
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

  render() {
    const { currentExerciseIndex, currentSetIndex, restTime } = this.state;
    console.log(this.state);
    return (
      <View style={styles.container}>
        <View style={styles.header_container} />
        <View style={styles.exercise_container}>
          <ScrollView>
            <Text>Exercise component</Text>
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
