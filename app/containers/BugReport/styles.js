import { StyleSheet } from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: theme.gray6,
    padding: 3,
  },
  textArea: {
    backgroundColor: theme.gray6,
    color: 'white',
    height: '15%',
    marginBottom: 16,
  },
  // same as textArea but not same render when error
  // summary is the only field with error (required field)
  summaryTextArea: {
    backgroundColor: theme.gray6,
    color: 'white',
    height: '15%',
    marginBottom: 16,
  },
  titleBorder: {
    marginBottom: 3,
  },
});
