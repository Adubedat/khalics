import React from 'react';
import { View, StatusBar } from 'react-native';
import { Text, Divider, Badge } from 'react-native-elements';
import styles from './styles';
import DifficultyBar from '../DifficultyBar';
import theme from '../../theme';

class ExerciseDescription extends React.Component {
  constructor(props) {
    super(props);
    const { exercise } = this.props;
    this.exercise = exercise;
    this.state = {};
  }

  musclesInvolvedToBadge = () => {
    const { musclesInvolved } = this.exercise;
    const badges = [];
    musclesInvolved.forEach((val, index) => {
      badges.push(
        <Badge
          value={val}
          containerStyle={{ backgroundColor: theme.gray5, marginRight: 4 }}
          textStyle={{ color: 'white' }}
        />,
      );
    });
    return badges;
  }

  techniquesToList = () => {
    const { techniques } = this.exercise;
    const techniquesList = [];
    techniques.forEach((val, index) => {
      techniquesList.push(
        <View style={{
          marginBottom: 5,
        }}
        >
          <Text style={{
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
          }}
          >
            {`${'\u2022 '}${val}`}
          </Text>
        </View>,
      );
    });
    return techniquesList;
  }

  // techniquesToView = () => {
  //   const { techniques } = this.exercise;
  //   const techniquesViews = [];
  //   techniques.forEach((val, index) => {
  //     techniquesViews.push(
  //       <View style={{
  //         marginBottom: 5,
  //         backgroundColor: theme.gray5,
  //         marginHorizontal: 10,
  //         borderRadius: 5,
  //         paddingVertical: 5,
  //       }}
  //       >
  //         <Text style={{
  //           color: 'white',
  //           fontSize: 18,
  //           textAlign: 'center',
  //         }}
  //         >
  //           {val}
  //         </Text>
  //       </View>,
  //     );
  //   });
  // return techniquesViews;
  // }

  render() {
    const { description, difficultyNum } = this.exercise;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={{
          marginBottom: 12, flexDirection: 'row',
        }}
        >
          <Text style={{ fontWeight: 'bold', ...styles.basicText }}>
              Difficulty
          </Text>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <DifficultyBar activeSquareNb={difficultyNum} />
          </View>
        </View>
        <View style={{ marginBottom: 12, flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold', ...styles.basicText }}>
              Muscles
          </Text>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
            {this.musclesInvolvedToBadge()}
          </View>
        </View>
        <View style={{ marginBottom: 12, flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold', ...styles.basicText }}>
            Techniques
          </Text>
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
            <Text>{'\n'}</Text>
            {this.techniquesToList()}
          </View>
        </View>
        <View style={{
          alignItems: 'center', marginBottom: 20, fontWeight: 'bold',
        }}
        >
          <Divider style={{ backgroundColor: theme.gray3, width: '80%', height: 1 }} />
        </View>
        <Text style={{
          color: 'white', fontSize: 16, textAlign: 'center',
        }}
        >
          {description}
        </Text>
      </View>
    );
  }
}

export default ExerciseDescription;
