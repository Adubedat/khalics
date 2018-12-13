import React from 'react';
import {
  View,
  StatusBar,
  Text,
  TextInput,
} from 'react-native';
import { Input } from 'react-native-elements';
import theme from '../../theme';
import styles from './styles';

const BugReport = () => {
  const placeHolderTxt = 'E.g: some examples..';
  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: theme.darkGray2 }}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Summary</Text>
      <TextInput
        style={{ backgroundColor: theme.gray6, color: 'white', height: '20%' }}
        placeholder={placeHolderTxt}
        placeholderTextColor={theme.gray1}
        multiline
      />
    </View>
  );
};

export default BugReport;
