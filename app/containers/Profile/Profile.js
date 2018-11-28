import React from 'react';
import {
  ScrollView, View, Text, StatusBar, SafeAreaView,
} from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import styles from './styles';

class Profile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
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
              <Text>Statistics</Text>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default Profile;
