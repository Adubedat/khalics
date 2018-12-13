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

const BugReport = () => {
  const placeholderTxt = {
    summary: 'E.g: The price mentioned on the pricing page is not correct',
    steps: 'E.g: Go to the pricing page',
    expected: 'E.g: The price for the basic plan should be 29$',
    actual: 'E.g: The price for the basic plan is 25$',
  };
  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: theme.darkGray2 }}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Summary</Text>
      <TextInput
        style={styles.textArea}
        placeholder={placeholderTxt.summary}
        placeholderTextColor={theme.gray1}
        multiline
      />
      <Text style={styles.title}>Steps to reproduce (optional)</Text>
      <TextInput
        style={styles.textArea}
        placeholder={placeholderTxt.steps}
        placeholderTextColor={theme.gray1}
        multiline
      />
      <Text style={styles.title}>Expected result (optional)</Text>
      <TextInput
        style={styles.textArea}
        placeholder={placeholderTxt.expected}
        placeholderTextColor={theme.gray1}
        multiline
      />
      <Text style={styles.title}>Actual result (optional)</Text>
      <TextInput
        style={styles.textArea}
        placeholder={placeholderTxt.actual}
        placeholderTextColor={theme.gray1}
        multiline
      />
      <Button
        title="SEND"
        raised
        containerStyle={{ borderRadius: 2, backgroundColor: theme.darkGray2 }}
        buttonStyle={{ backgroundColor: theme.red }}
        titleStyle={{ fontWeight: 'bold' }}
        // onPress={() => {}}
      />
    </View>
  );
};

export default BugReport;
