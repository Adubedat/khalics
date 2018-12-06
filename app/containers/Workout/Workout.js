import React from 'react';
import { View, StatusBar } from 'react-native';
import { Text, ListItem, Button } from 'react-native-elements';
import styles from './styles';
import theme from '../../theme';

class Workout extends React.PureComponent {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.workout = navigation.state.params.workout;
    this.state = {
      loading: true,
      exercises: [],
    };
  }

  async componentDidMount() {
    const getExerciseUrl = 'https://qmzsdq8495.execute-api.eu-west-1.amazonaws.com/dev/exercise/get';

    const ids = this.workout.exercises.reduce((acc, val, index, array) => {
      let param = `"${val.id}"`;
      if (index !== array.length - 1) { param += ', '; }
      return acc + param;
    }, '');
    const res = await fetch(`${getExerciseUrl}?ids=[${ids}]`);
    const resJson = await res.json();

    const state = {
      ...this.state, exercises: resJson.exercises, loading: false,
    };
    this.setState(state);
  }

  exerciseContainerStyle = (index, exercisesNb) => {
    if (index !== exercisesNb - 1) {
      const borderStyle = {
        borderBottomWidth: 2,
        borderBottomColor: theme.darkGray1,
        paddingBottom: 21,
      };
      return { ...styles.exercisesContainer, ...borderStyle };
    }
    // last element style
    styles.exercisesContainer = { ...styles.exercisesContainer, marginBottom: 30 };
    return styles.exercisesContainer;
  }

  render() {
    const { loading } = this.state;
    if (loading) { return <View />; }
    const { exercises } = this.state;
    const { description, name } = this.workout;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text h2 style={styles.mainTitle}>{name}</Text>
        <View>
          {
            exercises.map((val, index, array) => {
              const { repBySet, totalSet, totalRound } = this.workout.exercises[index];
              const set = totalRound === 0 ? totalSet : totalRound;
              return (
                <ListItem
                key={val._id} //eslint-disable-line
                  title={`${repBySet} ${val.name}   x ${set}`}
                  titleStyle={{ fontSize: 30, color: 'white' }}
                  subtitleStyle={{ color: 'white' }}
                  subtitle={val.description}
                  containerStyle={this.exerciseContainerStyle(index, array.length)}
                  onPress={() => { navigation.navigate('Exercise', { exercise: exercises[index] }); }}
                />
              );
            })
          }
        </View>
        <Button
          title="START WORKOUT"
          raised
          buttonStyle={{ backgroundColor: theme.red }}
          titleStyle={{ fontWeight: 'bold' }}
        />
      </View>
    );
  }
}

export default Workout;
