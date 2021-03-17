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
  textInputContainer: {
    backgroundColor: theme.gray6,
    width: '100%',
    color: 'white',
    marginBottom: 16,
  },
  titleBorder: {
    marginBottom: 3,
  },
  field_error: {
    marginLeft: 20,
    marginRight: 20,
    color: '#EB241A',
  },
});
