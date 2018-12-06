import React from 'react';
import { View, StatusBar } from 'react-native';
import { Text } from 'react-native-elements';
import styles from './styles';
import theme from '../../theme';

class Workout extends React.PureComponent {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.exercise = navigation.state.params.exercise;
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    const { description, name } = this.exercise;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text h2 style={styles.mainTitle}>{name}</Text>
      </View>
    );
  }
}

export default Workout;
