import React from 'react';
import { View, StatusBar } from 'react-native';
import { Text, Divider, Badge } from 'react-native-elements';
import PropTypes from 'prop-types';
import styles from './styles';
import DifficultyBar from '../DifficultyBar';
import theme from '../../theme';

class ExerciseDescription extends React.Component {
  static defaultProps = {
    titleSize: 18,
    titleColor: 'white',
    textSize: 15,
    textColor: theme.lightGray2,
  }

  constructor(props) {
    super(props);
    const { exercise } = this.props;
    this.exercise = exercise;
    this.state = {};
  }

  musclesInvolvedToBadge = (musclesInvolved) => {
    const badges = [];
    musclesInvolved.forEach((val) => {
      badges.push(
        <Badge
          key={val}
          value={val}
          containerStyle={{ backgroundColor: theme.gray5, margin: 2 }}
          textStyle={{ color: 'white' }}
        />,
      );
    });
    return badges;
  }

  techniquesToList = (techniques) => {
    // const { techniques } = this.exercise;
    const { textSize, textColor } = this.props;
    const techniquesList = [];
    if (techniques) {
      techniques.forEach((val, index) => {
        techniquesList.push(
          <View
            style={{ marginBottom: 5 }}
            key={`${index}42`} //eslint-disable-line
          >
            <Text style={{
              color: textColor, fontSize: textSize + 1, textAlign: 'center', fontWeight: '400',
            }}
            >
              {`${'\u2022 '}${val}`}
            </Text>
          </View>,
        );
      });
      return techniquesList;
    }
    return (
      <View style={{ marginBottom: 5 }}>
        <Text style={{
          color: textColor, fontSize: textSize + 1, textAlign: 'center', fontWeight: '400',
        }}
        >
          {`${'\u2022 '}No techniques specified`}
        </Text>
      </View>
    );
  }

  render() {
    console.log('exercise props : ', this.props);
    const {
      exercise, titleSize, textSize, titleColor, textColor,
    } = this.props;
    const { description, difficultyNum } = exercise;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.rowContainer}>
          <Text style={{ ...styles.title, fontSize: titleSize, color: titleColor }}>
              Difficulty
          </Text>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <DifficultyBar activeSquareNb={difficultyNum} />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Text style={{ ...styles.title, fontSize: titleSize, color: titleColor }}>
              Muscles
          </Text>
          <View style={{
            flex: 1, flexDirection: 'row', justifyContent: 'flex-end', flexWrap: 'wrap',
          }}
          >
            {this.musclesInvolvedToBadge(exercise.musclesInvolved)}
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Text style={{ ...styles.title, fontSize: titleSize, color: titleColor }}>
            Techniques
          </Text>
        </View>
        <View style={styles.techniquesContainer}>
          {this.techniquesToList(exercise.techniques)}
        </View>
        <View style={{ alignItems: 'center', marginBottom: 20, fontWeight: 'bold' }}>
          <Divider style={styles.divider} />
        </View>
        <Text style={{
          color: textColor, fontSize: textSize, textAlign: 'left', fontWeight: '300',
        }}
        >
          {description}
        </Text>
      </View>
    );
  }
}

ExerciseDescription.propTypes = {
  titleSize: PropTypes.number,
  titleColor: PropTypes.string,
  textSize: PropTypes.number,
  textColor: PropTypes.string,
};

export default ExerciseDescription;
