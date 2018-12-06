import React from 'react';
import { View, StatusBar } from 'react-native';
import { Text, ListItem, Button } from 'react-native-elements';
import styles from './styles';
import theme from '../../theme';

class Workout extends React.PureComponent {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      loading: true,
      workout: {},
      exercises: [],
    };
  }

  async componentDidMount() {
    const getExerciseUrl = 'https://qmzsdq8495.execute-api.eu-west-1.amazonaws.com/dev/exercise/get';

    const { navigation } = this.props;
    const { workout } = navigation.state.params;
    const ids = workout.exercises.reduce((acc, val, index, array) => {
      let param = `"${val.id}"`;
      if (index !== array.length - 1) { param += ', '; }
      return acc + param;
    }, '');
    const res = await fetch(`${getExerciseUrl}?ids=[${ids}]`);
    const resJson = await res.json();
    delete workout.exercises;
    const state = {
      ...this.state, workout, exercises: resJson.exercises, loading: false,
    };
    this.setState(state);
  }

  containerStyle = (index, exercisesNb) => {
    console.log('=>', index, '->', exercisesNb);
    if (index !== exercisesNb - 1) {
      const borderStyle = {
        borderBottomWidth: 2,
        borderBottomStyle: 'solid',
        borderBottomColor: theme.darkGray1,
        paddingBottom: 21,
      };
      return { ...styles.exercisesContainer, ...borderStyle };
    }
    return styles.exercisesContainer;
  }

  render() {
    const { exercises, loading, workout } = this.state;
    console.log('-->', workout, '==>', exercises);
    const { description, name } = workout;
    if (loading) { return <View />; }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text h2 style={styles.mainTitle}>{name}</Text>
        <View>
          {
            exercises.map((val, index, array) => (
              <ListItem
                key={val._id} //eslint-disable-line
                title={val.name}
                titleStyle={{ fontSize: 30, color: 'white' }}
                subtitleStyle={{ color: 'white' }}
                subtitle={val.description}
                containerStyle={this.containerStyle(index, array.length)}
              />
            ))
          }
        </View>
        <Button
          title="BUTTON WITH ICON COMPONENT"
        />
      </View>
    );
  }
}

export default Workout;
