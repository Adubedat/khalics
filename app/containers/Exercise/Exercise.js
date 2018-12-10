import React from 'react';
import { View, StatusBar } from 'react-native';
import { Text } from 'react-native-elements';
import styles from './styles';
import theme from '../../theme';

class Exercise extends React.PureComponent {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.exercise = navigation.state.params.exercise;
    console.log(this.exercise);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { description, name, bodyParts } = this.exercise;

    console.log('-->', this.exercise);
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text h2 style={styles.mainTitle}>{name}</Text>
        <View style={{ alignItems: 'center' }} />
        {/* <Text style={{ color: 'white', fontSize: 20, marginLeft: 2 }} /> */}
      </View>
    );
  }
}

export default Exercise;
