import React from 'react';
import {
  View,
  StatusBar,
  Text,
  TextInput,
} from 'react-native';
import { Button } from 'react-native-elements';
import theme from '../../theme';
import styles from './styles';

class BugReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryError: '',
      summary: '',
      stepsToReproduce: '',
      expectedResult: '',
      actualResult: '',
    };
    this.placeholderTxt = {
      summary: 'E.g: The price mentioned on the pricing page is not correct',
      steps: 'E.g: Go to the pricing page',
      expected: 'E.g: The price for the basic plan should be 29$',
      actual: 'E.g: The price for the basic plan is 25$',
    };
  }

  sendReport = async () => {
    const {
      summary, stepsToReproduce, expectedResult, actualResult,
    } = this.state;
    const postData = {
      summary, stepsToReproduce, expectedResult, actualResult, from: 'user',
    };
    const createBugUrl = 'https://qmzsdq8495.execute-api.eu-west-1.amazonaws.com/dev/bug/create';
    const res = await fetch(createBugUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    const resJson = await res.json();
  };

  render() {
    const {
      summaryError, summary, stepsToReproduce, expectedResult, actualResult,
    } = this.state;
    return (
      <View style={{ flex: 1, padding: 10, backgroundColor: theme.darkGray2 }}>
        <StatusBar barStyle="light-content" />
        <View style={{ marginBottom: 2 }}>
          <Text style={styles.title}>Summary</Text>
        </View>
        <TextInput
          style={styles.textArea}
          value={summary}
          placeholder={this.placeholderTxt.summary}
          placeholderTextColor={theme.gray1}
          multiline
          onChangeText={(text) => { this.setState({ summary: text }); }}
        />
        <View style={styles.titleBorder}>
          <Text style={styles.title}>Steps to reproduce (optional)</Text>
        </View>
        <TextInput
          style={styles.textArea}
          value={stepsToReproduce}
          placeholder={this.placeholderTxt.steps}
          placeholderTextColor={theme.gray1}
          multiline
          onChangeText={(text) => { this.setState({ stepsToReproduce: text }); }}
        />
        <View style={styles.titleBorder}>
          <Text style={styles.title}>Expected result (optional)</Text>
        </View>
        <TextInput
          style={styles.textArea}
          value={expectedResult}
          placeholder={this.placeholderTxt.expected}
          placeholderTextColor={theme.gray1}
          multiline
          onChangeText={(text) => { this.setState({ expectedResult: text }); }}
        />
        <View style={styles.titleBorder}>
          <Text style={styles.title}>Actual result (optional)</Text>
        </View>
        <TextInput
          style={styles.textArea}
          value={actualResult}
          placeholder={this.placeholderTxt.actual}
          placeholderTextColor={theme.gray1}
          multiline
          onChangeText={(text) => { this.setState({ actualResult: text }); }}
        />
        <Button
          title="SEND"
          raised
          containerStyle={{ borderRadius: 2, backgroundColor: theme.darkGray2 }}
          buttonStyle={{ backgroundColor: theme.red }}
          titleStyle={{ fontWeight: 'bold' }}
          onPress={() => { this.sendReport(); }}
        />
      </View>
    );
  }
}

export default BugReport;
