import { StyleSheet } from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkGray2,
  },
  mainTitle: {
    marginVertical: 35,
    textAlign: 'center',
    flexDirection: 'column',
    color: 'white',
  },
});
