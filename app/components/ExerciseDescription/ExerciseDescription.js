import React from 'react';
import { View, StatusBar } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import styles from './styles';
import DifficultyBar from '../DifficultyBar';
import theme from '../../theme';

class ExerciseDescription extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // const { exercise } = this.props;
  //   // this.exercise = exercise;
  //   // this.state = {};
  // }

  musclesInvolvedToStr = (musclesInvolved) => {
    // const { musclesInvolved } = this.exercise;
    const musclesInvolvedTxt = musclesInvolved.reduce((acc, val, index, array) => {
      let musclesInvolvedStr = acc + val;
      if (index !== array.length - 1) {
        musclesInvolvedStr += ', ';
      }
      return musclesInvolvedStr;
    }, '');
    return musclesInvolvedTxt;
  }

  render() {
    console.log('exercise props : ', this.props);
    const { exercise } = this.props;
    const { description, difficultyNum, musclesInvolved } = exercise;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={{ marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold', ...styles.basicText }}>
              Difficulty
          </Text>
          <DifficultyBar activeSquareNb={difficultyNum} />
        </View>
        <View style={{ marginBottom: 12, flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold', ...styles.basicText }}>
              Muscles
          </Text>
          <View style={{ flex: 1 }}>
            <Text style={{ ...styles.basicText, flexWrap: 'wrap' }}>
              {this.musclesInvolvedToStr(musclesInvolved)}
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

export default ExerciseDescription;
