import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Text, Button } from 'react-native-elements';
import theme from '../../theme';
import styles from './styles';

export default class TestMySkills extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View>
          <Text h2 style={styles.mainTitle}>
            Test my skills
          </Text>
          <Text h4 style={styles.presentationTxt}>
            In Khalics we will generate a workout that fit you.
            {'\n\n'}
            We use powerful algorithm to reach this goal.
            {'\n\n'}
            We first need to test you, then we will be able to evaluate your skill
            and generate for you a workout.
            {'\n\n'}
            The aim of the workout is to improve your skill towards mastering
            calisthenics figures.
            {/* {'\n\n'}
          Morbi ut urna venenatis, dictum tortor eget, consequat ante.
          Suspendisse id convallis mauris, in fermentum urna. Etiam at ornare orci.
          Praesent arcu massa, eleifend quis turpis in, auctor consequat lectus.
          Etiam ornare, massa vitae iaculis mattis, mi velit porta libero, et egestas tellus ex cursus sem.
          Nam vel pulvinar eros, aliquet aliquam nunc.
            {'\n\n'}
          Ut vel tellus elementum, efficitur felis quis, finibus arcu.
          Maecenas efficitur nulla urna, fermentum vehicula dolor ornare at.
          Duis posuere nisl tincidunt tortor venenatis, non venenatis dolor porta.
          Quisque sit amet suscipit nisi */}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button
              raised
              containerStyle={{ flex: 0.8 }}
              buttonStyle={{ backgroundColor: 'white' }}
              titleStyle={{ color: theme.darkGray3, fontWeight: 'bold', fontSize: 25 }}
              title="Test my skills"
            />
          </View>
        </View>
      </View>
    );
  }
}
