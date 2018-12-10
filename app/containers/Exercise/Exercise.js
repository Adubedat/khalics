import React from 'react';
import { View, StatusBar } from 'react-native';
import { Text, Divider } from 'react-native-elements';
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

  bodyPartsToStr = () => {
    const { bodyParts } = this.exercise;
    const bodyPartsTxt = bodyParts.reduce((acc, val, index, array) => {
      let bodyPartsStr = acc + val;
      console.log(array.length, index);
      if (index !== array.length - 1) {
        bodyPartsStr += ', ';
      }
      return bodyPartsStr;
    }, '');
    return bodyPartsTxt;
  }

  render() {
    const { description, name, difficultyNum } = this.exercise;

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
        <View style={{ marginBottom: 12, flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold', ...styles.basicText }}>
              Bodyparts:
          </Text>
          <View style={{ flex: 1 }}>
            <Text style={{ ...styles.basicText, flexWrap: 'wrap' }}>
              {this.bodyPartsToStr()}
            </Text>
          </View>
        </View>
        <View style={{
          alignItems: 'center', marginBottom: 20, fontWeight: 'bold', marginTop: 5,
        }}
        >
          <Divider style={{ backgroundColor: 'white', width: '80%', height: 2 }} />
        </View>
        <Text style={{
          color: 'white', fontSize: 16, marginHorizontal: 10, textAlign: 'center',
        }}
        >
          {description}
        </Text>
      </View>
    );
  }
}

export default Exercise;
