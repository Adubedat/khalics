import React from 'react';
import { View, StatusBar } from 'react-native';
import { Text } from 'react-native-elements';
import SvgUri from 'react-native-svg-uri';
// import Svg, { Polygon, Image } from 'react-native-svg';
import styles from './styles';
import humanBodySvg from './human_body.svg';
import HumanBody from './HumanBody';
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

    // console.log('--->', require('./human_body.svg'), typeof humanBodySvg);
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text h2 style={styles.mainTitle}>{name}</Text>
        <View style={{ alignItems: 'center' }}>
          <HumanBody />
          {/* <SvgUri
            width="500"
            height="300"
            source={humanBodySvg}
            fill="red"
          /> */}
        </View>
        {/* <Text style={{ color: 'white', fontSize: 20, marginLeft: 2 }} /> */}
      </View>
    );
  }
}

export default Exercise;
