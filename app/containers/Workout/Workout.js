import React from 'react';
import {
  Text, View, StatusBar, SectionList,
} from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import LoadingView from '../../components/LoadingView';
import styles from './styles';
import theme from '../../theme';

class Workout extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: `WORKOUT ${navigation.getParam('index', '')}`,
  });

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.workout = navigation.state.params.workout;
    this.state = {
      isLoading: true,
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
      ...this.state, exercises: resJson.exercises, isLoading: false,
    };
    this.setState(state);
  }

  renderSectionHeader = ({ section: { title } }) => (
    <View style={{
      backgroundColor: theme.darkGray1, width: '100%', padding: 5, paddingLeft: 16,
    }}
    >
      <Text style={{ fontWeight: '600', fontSize: 14, color: 'white' }}>{title}</Text>
    </View>
  )

  renderWarmUpItem = ({ item, index }) => (
    <ListItem
      containerStyle={[
        styles.item_container,
        { borderTopWidth: (index === 0) ? 0 : 1 },
      ]}
      subtitleStyle={{ color: theme.gray1, fontSize: 14, fontWeight: '400' }}
      subtitle={item.description}
    />
  )

  renderWorkoutItem = ({ item, index }) => {
    const { repBySet, totalSet, totalRound } = this.workout.exercises[index];
    const set = totalRound === 0 ? totalSet : totalRound;
    const { navigation } = this.props;
    return (
      <ListItem
        chevron
        containerStyle={[
          styles.item_container,
          { borderTopWidth: (index === 0) ? 0 : 1 },
        ]}
        title={item.name}
        titleStyle={{ color: 'white', fontSize: 20, fontWeight: '700' }}
        subtitleStyle={{ color: theme.gray1, fontSize: 14, fontWeight: '400' }}
        subtitle={item.description}
        onPress={() => { navigation.navigate('Exercise', { exercise: item }); }}
        leftIcon={() => (
          <View style={{
            width: 30, height: 30, justifyContent: 'center', alignItems: 'center',
          }}
          >
            <Text style={{ color: 'white', fontWeight: '700', fontSize: 18 }}>{repBySet}</Text>
          </View>
        )}
        rightIcon={() => (
          <View style={{
            width: 30, height: 30, justifyContent: 'center', alignItems: 'center',
          }}
          >
            <Text style={{ color: 'white', fontWeight: '400', fontSize: 18 }}>{`x${set}`}</Text>
          </View>
        )}
      />
    );
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) { return <LoadingView />; }
    const { exercises } = this.state;
    const { navigation } = this.props;
    // TEST
    // navigation.navigate('Exercise', { exercise: exercises[0] });
    // return (<View />);
    //
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.exercisesContainer}>
          <SectionList
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            keyExtractor={item => item._id} // eslint-disable-line
            renderItem={this.renderWorkoutItem}
            renderSectionHeader={this.renderSectionHeader}
            sections={[
              { title: 'Warm-up', data: [{ description: 'Feature coming soon' }], renderItem: this.renderWarmUpItem },
              { title: 'Workout', data: exercises },
              { title: 'Stretching', data: [{ description: 'Feature coming soon' }], renderItem: this.renderWarmUpItem },
            ]}
          />
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
            onPress={() => navigation.navigate('OnGoingWorkout', { workout: this.workout, exercises })}
          />
        </View>
      </View>
    );
  }
}

export default Workout;
