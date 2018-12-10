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

  difficultyToStr = (difficultyNum) => {
    let difficultyStr;
    if (difficultyNum === 1) {
      difficultyStr = 'easy';
    } else {
      difficultyStr = '';
    }
    return difficultyStr;
  }

  render() {
    const {
      description, name, bodyParts, difficultyNum,
    } = this.exercise;

    console.log('-->', this.exercise);
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text h3 style={styles.mainTitle}>{name}</Text>
        <View style={{ marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold', ...styles.basicText }}>
              Difficulty:
          </Text>
          <Text style={{ ...styles.basicText }}>
            {this.difficultyToStr(difficultyNum)}
          </Text>
        </View>
        {/* <View style={{ marginBottom: 12, ...styles.basicText }}>
        <Text style={{ fontWeight: 'bold' }}>
              Difficulty:
          </Text>
          <Text style={{
            borderColor: 'red', borderWidth: 2, borderStyle: 'solid',
          }}
          >
            {this.difficultyToStr(difficultyNum)}

          </Text>
        </View> */}
        <Text style={{
          color: 'white', fontSize: 18, marginHorizontal: 10, textAlign: 'center',
        }}
        >
          {description}
        </Text>
      </View>
    );
  }
}

export default Exercise;
