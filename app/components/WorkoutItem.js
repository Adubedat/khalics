import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    height: 120,
    borderTopColor: 'gray',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  icon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  top_bar: {
    width: 2,
    height: 40,
    marginLeft: 20,
    marginTop: -41,
    backgroundColor: theme.red,
    zIndex: 999,
    top: 0,
  },
  bottom_bar: {
    width: 2,
    height: 40,
    marginLeft: 20,
    marginBottom: -40,
    backgroundColor: theme.red,
    zIndex: 999,
    top: 0,
  },
});

class WorkoutItem extends React.PureComponent {
  static defaultProps = {
    current: false,
    done: false,
  }

  displayTopBar = (index, current, done) => {
    if (index !== 0) {
      return (
        <View style={[
          styles.top_bar,
          { backgroundColor: (current || done) ? theme.red : theme.lightGray3 }]}
        />
      );
    }
  }

  displayBottomBar = (index, workoutsNbr, current, done) => {
    if ((index + 1) !== workoutsNbr) {
      return (
        <View style={[
          styles.bottom_bar,
          { backgroundColor: (done) ? theme.red : theme.lightGray3 }]}
        />
      );
    }
  }


  render() {
    const {
      workout,
      index,
      displayWorkout,
      current,
      done,
      workoutsNbr,
    } = this.props;
    return (
      <ListItem
        containerStyle={[
          styles.container,
          {
            borderTopWidth: (index === 0) ? 1 : 0,
            backgroundColor: (current) ? '#303030' : theme.darkGray2,
          }]}
        chevron
        title={`Workout ${index + 1}`}
        titleStyle={{ color: (current) ? 'white' : theme.gray3, fontSize: 20, fontWeight: '700' }}
        subtitle={workout.description}
        subtitleStyle={{ color: (current) ? theme.gray1 : theme.gray4, fontSize: 14, fontWeight: '400' }}
        onPress={() => { displayWorkout(workout); }}
        leftAvatar={() => (
          <View>
            {this.displayTopBar(index, current, done)}
            <View style={[
              styles.icon,
              { backgroundColor: (current || done) ? theme.red : theme.lightGray1 }]}
            >
              <Text style={{ color: (current || done) ? 'white' : 'black' }}>{index + 1}</Text>
            </View>
            {this.displayBottomBar(index, workoutsNbr, current, done)}
          </View>
        )}
      />
    );
  }
}

WorkoutItem.propTypes = {
  workout: PropTypes.shape({
    createdAt: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    doneAt: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    restTime: PropTypes.number.isRequired,
    startedAt: PropTypes.number.isRequired,
    updatedAt: PropTypes.number.isRequired,
    exercises: PropTypes.array.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  displayWorkout: PropTypes.func.isRequired,
  workoutsNbr: PropTypes.number.isRequired,
  current: PropTypes.bool,
  done: PropTypes.bool,
};

export default WorkoutItem;
