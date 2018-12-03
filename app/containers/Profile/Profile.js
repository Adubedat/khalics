import React from 'react';
import {
  ScrollView, View, Text, StatusBar, SafeAreaView, TouchableHighlight, StyleSheet, Dimensions,
} from 'react-native';
import {
  LineChart, Grid, XAxis, YAxis,
} from 'react-native-svg-charts';
import Radar from '../../components/RadarChart';
import ProgressBar from '../../components/ProgressBar';
import LoadingView from '../../components/LoadingView';
import styles from './styles';

class Profile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFLactive: true,
      isBLactive: false,
      isHDSactive: false,
      isLSactive: false,
      isMUactive: false,
      isPSTactive: false,
      isHFactive: false,
      isPLKactive: false,
      isLoading: true,
    };
    this.skills = [{
      name: 'FL',
      value: 1.25,
    }, {
      name: 'FL',
      value: 1.78,
    }, {
      name: 'FL',
      value: 2.75,
    }, {
      name: 'FL',
      value: 3.02,
    }, {
      name: 'FL',
      value: 4.12,
    }, {
      name: 'BL',
      value: 3.12,
    }, {
      name: 'BL',
      value: 3.30,
    }, {
      name: 'BL',
      value: 3.78,
    }, {
      name: 'HDS',
      value: 5.14,
    }, {
      name: 'HDS',
      value: 5.32,
    }, {
      name: 'HDS',
      value: 6.03,
    }, {
      name: 'HDS',
      value: 6.08,
    }, {
      name: 'HDS',
      value: 6.15,
    }, {
      name: 'PLK',
      value: 0.21,
    }, {
      name: 'PLK',
      value: 2.10,
    }, {
      name: 'LS',
      value: 1.12,
    }, {
      name: 'LS',
      value: 1.52,
    }, {
      name: 'LS',
      value: 1.78,
    }, {
      name: 'LS',
      value: 2.31,
    }, {
      name: 'LS',
      value: 2.54,
    }, {
      name: 'LS',
      value: 3.42,
    }, {
      name: 'LS',
      value: 4.12,
    }, {
      name: 'LS',
      value: 4.76,
    }, {
      name: 'PST',
      value: 2.15,
    }, {
      name: 'PST',
      value: 3.78,
    }, {
      name: 'PST',
      value: 5.48,
    }, {
      name: 'PST',
      value: 6.75,
    }, {
      name: 'PST',
      value: 7.85,
    }, {
      name: 'PST',
      value: 9.98,
    }, {
      name: 'MU',
      value: 1.45,
    }, {
      name: 'MU',
      value: 2.97,
    }, {
      name: 'MU',
      value: 3.45,
    }, {
      name: 'MU',
      value: 5.78,
    }, {
      name: 'HF',
      value: 0.12,
    }, {
      name: 'HF',
      value: 0.31,
    }];
  }

  displayLineChart = (skillName, isActive, color) => {
    if (isActive) {
      const { skills } = this;
      let data = skills.filter(skill => skill.name === skillName);
      data = data.map(skill => skill.value);
      return (
        <LineChart
          style={StyleSheet.absoluteFill}
          data={data}
          svg={{ stroke: color, strokeWidth: 2 }}
          contentInset={{ top: 10, bottom: 20 }}
          yMin={0}
          yMax={10}
          xMin={0}
          xMax={8}
        />
      );
    }
  }

  displayChartButton = (skillName, isActive) => (
    <TouchableHighlight
      style={[{ backgroundColor: isActive ? '#181818' : '#383838' }, styles.chart_button]}
      onPress={() => this.handleChartButton(skillName)}
    >
      <Text style={[{ color: 'white' }, styles.button_text]}>{skillName}</Text>
    </TouchableHighlight>
  )

  handleChartButton = (skillName) => {
    const {
      isFLactive,
      isBLactive,
      isHDSactive,
      isLSactive,
      isMUactive,
      isPSTactive,
      isHFactive,
      isPLKactive,
    } = this.state;
    switch (skillName) {
      case 'FL':
        this.setState({ isFLactive: !isFLactive });
        break;
      case 'BL':
        this.setState({ isBLactive: !isBLactive });
        break;
      case 'HDS':
        this.setState({ isHDSactive: !isHDSactive });
        break;
      case 'LS':
        this.setState({ isLSactive: !isLSactive });
        break;
      case 'MU':
        this.setState({ isMUactive: !isMUactive });
        break;
      case 'PST':
        this.setState({ isPSTactive: !isPSTactive });
        break;
      case 'HF':
        this.setState({ isHFactive: !isHFactive });
        break;
      case 'PLK':
        this.setState({ isPLKactive: !isPLKactive });
        break;
      default:
        break;
    }
  }

  // TODO: Change value by timestamp when DB setup

  getSkillsLevel = () => {
    const { skills } = this;
    const skillLevels = skills.reduce((acc, skill) => {
      if (!acc[skill.name] || acc[skill.name] < skill.value) {
        acc[skill.name] = skill.value;
      }
      return acc;
    }, {});
    return ({
      'Front-lever (FL)': skillLevels.FL || 0,
      'Back-lever (BL)': skillLevels.BL || 0,
      'L-sit (LS)': skillLevels.LS || 0,
      'Pistol (PST)': skillLevels.PST || 0,
      'Handstand (HDS)': skillLevels.HDS || 0,
      'Human flag (HF)': skillLevels.HF || 0,
      'Plank (PLK)': skillLevels.PLK || 0,
      'Muscle up (MU)': skillLevels.MU || 0,


    });
  }

  render() {
    const {
      isFLactive,
      isBLactive,
      isHDSactive,
      isLSactive,
      isMUactive,
      isPSTactive,
      isHFactive,
      isPLKactive,
      isLoading,
    } = this.state;
    const skillsLevel = this.getSkillsLevel();
    const options = {
      rings: 5,
      r: Dimensions.get('window').width / 4,
      max: 11,
      fill: '#D00000',
      stroke: '#606060',
      animate: {
        type: 'oneByOne',
        duration: 200,
      },
      label: {
        fontSize: 12,
        fontWeight: true,
        fill: 'white',
      },
    };
    console.log('sreen width : ', Dimensions.get('window').width);
    if (isLoading) {
      return <LoadingView />;
    }
    return (
      <View style={{ flex: 1, backgroundColor: '#181818' }}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.main_container}
          >
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
              <Text style={{ color: 'white', fontSize: 30, top: 40 }}>My skills</Text>
              <Radar data={[skillsLevel]} options={options} />
              <Text style={{ color: 'white', fontSize: 30, bottom: 30 }}>My progression</Text>
              <View style={styles.chart_container}>
                <View style={styles.linechart_container}>
                  <YAxis
                    data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                    style={{ marginBottom: -10 }}
                    contentInset={{ top: 10, bottom: 33 }}
                    svg={{ fontSize: 12, fill: 'gray' }}
                  />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <LineChart
                      style={{ flex: 1 }}
                      data={[0]}
                      svg={{ stroke: '', strokeWidth: 0 }}
                      contentInset={{ top: 10, bottom: 10 }}
                      yMin={0}
                      yMax={10}
                      xMin={0}
                      xMax={8}
                    >
                      <Grid />
                    </LineChart>
                    {this.displayLineChart('FL', isFLactive, '#64DD17')}
                    {this.displayLineChart('BL', isBLactive, '#18FFFF')}
                    {this.displayLineChart('HDS', isHDSactive, '#FF9800')}
                    {this.displayLineChart('LS', isLSactive, '#AA00FF')}
                    {this.displayLineChart('MU', isMUactive, '#D00000')}
                    {this.displayLineChart('PST', isPSTactive, 'white')}
                    {this.displayLineChart('HF', isHFactive, '#304FFE')}
                    {this.displayLineChart('PLK', isPLKactive, '#EC407A')}
                    <XAxis
                      data={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
                      formatLabel={(value, index) => index}
                      style={{ marginHorizontal: -10 }}
                      contentInset={{ top: 50, left: 10, right: 10 }}
                      svg={{ fontSize: 10, fill: 'gray' }}
                    />
                  </View>
                </View>
                <View style={styles.button_chart_container}>
                  {this.displayChartButton('FL', isFLactive)}
                  {this.displayChartButton('BL', isBLactive)}
                  {this.displayChartButton('HDS', isHDSactive)}
                  {this.displayChartButton('LS', isLSactive)}
                  {this.displayChartButton('MU', isMUactive)}
                  {this.displayChartButton('PST', isPSTactive)}
                  {this.displayChartButton('HF', isHFactive)}
                  <TouchableHighlight
                    style={[styles.chart_button, { backgroundColor: isPLKactive ? '#181818' : '#383838', borderRightWidth: 0 }]}
                    onPress={() => this.handleChartButton('PLK')}
                  >
                    <Text style={[{ color: 'white' }, styles.button_text]}>PLK</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default Profile;
