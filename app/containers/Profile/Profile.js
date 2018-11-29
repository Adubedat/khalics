import React from 'react';
import {
  ScrollView, View, Text, StatusBar, SafeAreaView, TouchableHighlight,
} from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts';
import ProgressBar from '../../components/ProgressBar';
import styles from './styles';

class Profile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFLactive: false,
      isBLactive: false,
      isHDSactive: false,
      isLSITactive: false,
      isMUactive: false,
      isPSTactive: false,
    };
  }

  displayLineChart(skill, isActive) {
    return (
      <LineChart
        style={{ flex: 1 }}
        data={data}
        svg={{ stroke: 'rgba(134, 65, 244, 1)', strokeWidth: 3 }}
        contentInset={{ top: 20, bottom: 20 }}
      >
        <Grid />
      </LineChart>
    );
  }

  render() {
    const data = [1, 4, 8, 12, 13, 14, 47];
    const {
      isFLactive,
      isBLactive,
      isHDSactive,
      isLSITactive,
      isMUactive,
      isPSTactive,
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ backgroundColor: '#383838' }}
          contentContainerStyle={{ flexGrow: 1, backgroundColor: '#181818' }}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <View style={styles.main_container}>

              <View style={styles.header_container}>
                <Text style={styles.username}>Username</Text>
                <ProgressBar
                  height={30}
                  borderRadius={15}
                  borderWidth={0}
                  style={{ width: '80%' }}
                  fillColor="#181818"
                  barColor="#D00000"
                  progress={0.42}
                >
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.bar_text}>Level 8 - 42%</Text>
                  </View>
                </ProgressBar>
              </View>
              <View style={styles.content_container}>
                <View style={styles.chart_container}>
                  <View style={styles.linechart_container}>
                    <LineChart
                      style={{ flex: 1 }}
                      data={data}
                      svg={{ stroke: 'rgba(134, 65, 244, 1)', strokeWidth: 3 }}
                      contentInset={{ top: 20, bottom: 20 }}
                    >
                      <Grid />
                    </LineChart>
                  </View>
                  <View style={styles.button_chart_container}>
                    <TouchableHighlight style={[{ backgroundColor: '#181818' }, styles.chart_button]}>
                      <Text style={[{ color: 'white' }, styles.button_text]}>FL</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[{ backgroundColor: '#181818' }, styles.chart_button]}>
                      <Text style={[{ color: 'white' }, styles.button_text]}>BL</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[{ backgroundColor: '#181818' }, styles.chart_button]}>
                      <Text style={[{ color: 'white' }, styles.button_text]}>HDS</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[{ backgroundColor: '#181818' }, styles.chart_button]}>
                      <Text style={[{ color: 'white' }, styles.button_text]}>L-SIT</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[{ backgroundColor: '#181818' }, styles.chart_button]}>
                      <Text style={[{ color: 'white' }, styles.button_text]}>MU</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[{ backgroundColor: '#181818' }, styles.chart_button]}>
                      <Text style={[{ color: 'white' }, styles.button_text]}>PST</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}

export default Profile;
