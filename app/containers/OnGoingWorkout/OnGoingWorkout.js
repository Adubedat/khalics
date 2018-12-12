import React from 'react';
import {
  View, Text, ScrollView, Dimensions, FlatList,
} from 'react-native';
import { Button } from 'react-native-elements';
import ProgressCircle from 'react-native-progress/Circle';
import ExerciseDescription from '../../components/ExerciseDescription/ExerciseDescription';
import HorizontalPicker from '../../components/HorizontalPicker';
import theme from '../../theme';
import styles from './styles';

class OnGoingWorkout extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', 'EXERCISE'),
    tabBarVisible: false,
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
      pickerValue: this.workout.exercises[0].repBySet,
      repsDone: [],
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
    const { totalSetDone, repsDone, pickerValue } = this.state;
    const len = workout.exercises.length;
    let temp = totalSetDone + 1;
    for (let i = 0; i < len; i += 1) {
      if (temp < workout.exercises[i].totalSet) {
        repsDone.push(pickerValue);
        this.setState({
          currentExerciseIndex: i,
          currentSet: temp + 1,
          totalSetDone: totalSetDone + 1,
          restTime: workout.restTime,
          pickerValue: workout.exercises[i].repBySet,
          repsDone,
        });
        navigation.setParams({ title: exercises[i].name });
        return;
      }
      temp -= workout.exercises[i].totalSet;
    }
  }

  // renderHeader = () => {
  //   const { restTime } = this.state;
  //   if (restTime > 0) {
  //     return (this.renderTimer());
  //   }
  //   return (this.renderGoal());
  // }

  renderTimer = () => {
    const screenWidth = Dimensions.get('window').width;
    const fontSize = screenWidth / 16;
    const { currentSet, currentExerciseIndex, restTime } = this.state;
    const leftText = (restTime > 0) ? 'Rest' : `Set ${currentSet}`;
    const rightText = () => {
      if (restTime > 0) {
        return 'seconds';
      }
      if (this.exercises[currentExerciseIndex].isIsometric) {
        return `Hold ${this.workout.exercises[currentExerciseIndex].repBySet} seconds`;
      }
      return `${this.workout.exercises[currentExerciseIndex].repBySet} reps`;
    };
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
          <View style={{ width: screenWidth / 3, paddingRight: 20 }}>
            <Text style={{ ...styles.header_text, fontSize, textAlign: 'right' }}>{leftText}</Text>
          </View>
          <ProgressCircle
            progress={restTime / this.workout.restTime}
            color={theme.red}
            size={screenWidth / 4}
            borderWidth={0}
            unfilledColor={theme.darkGray1}
            showsText
            formatText={() => (restTime > 0 ? restTime : 'Go !')}
            textStyle={{ ...styles.header_text, fontSize: fontSize + 4 }}
          />
          <View style={{ width: screenWidth / 3, paddingLeft: 20 }}>
            <Text style={{ ...styles.header_text, fontSize, textAlign: 'left' }}>{rightText()}</Text>
          </View>
        </View>
      </View>
    );
  }

  //   renderGoal = () => {
  //     const { currentSet, currentExerciseIndex } = this.state;
  //     const set = `Set ${currentSet}`;
  //     const goal = `${this.workout.exercises[currentExerciseIndex].repBySet} reps`;
  //     return (
  //       <View style={{ flex: 1, justifyContent: 'space-around' }}>
  //         <Text style={{
  //           fontSize: 30, color: 'white', fontWeight: '400', textAlign: 'center',
  //         }}
  //         >
  // Go !

  //         </Text>
  //         <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
  //           <Text style={{ fontSize: 30, color: 'white', fontWeight: '400' }}>{set}</Text>
  //           <Text style={{ fontSize: 30, color: 'white', fontWeight: '400' }}>{goal}</Text>
  //         </View>
  //       </View>
  //     );
  //   }

  renderPickerItem = () => {
    const items = [];
    for (let i = 0; i <= 200; i += 1) {
      items.push(<HorizontalPicker.Item key={i} label={`${i}`} value={i} />);
    }
    return items;
  }

  renderPickerQuestion = () => {
    const { currentExerciseIndex } = this.state;
    const { isIsometric } = this.exercises[currentExerciseIndex];
    if (isIsometric) {
      return (
        <Text style={styles.little_text}>How many seconds did you hold it ?</Text>
      );
    }
    return (
      <Text style={styles.little_text}>How many repetitions have you done ?</Text>
    );
  }

  render() {
    const { currentExerciseIndex, pickerValue } = this.state;
    console.log(this.state);
    return (
      <View style={styles.container}>
        <View style={styles.header_container}>
          {this.renderTimer()}
        </View>
        <View style={styles.exercise_container}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <ExerciseDescription exercise={this.exercises[currentExerciseIndex]} />
          </ScrollView>
        </View>
        <View style={styles.button_container}>
          {this.renderPickerQuestion()}
          <HorizontalPicker
            itemWidth={50}
            selectedValue={pickerValue}
            foregroundColor="white"
            inactiveItemOpacity={0.5}
            onChange={pickerValue => this.setState({ pickerValue })}
          >
            {this.renderPickerItem()}
          </HorizontalPicker>
          <Button
            title="SET DONE"
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
