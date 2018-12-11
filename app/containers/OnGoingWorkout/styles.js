import { StyleSheet } from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkGray2,
    justifyContent: 'space-around',
  },
  header_container: {
    flex: 3,
    backgroundColor: theme.darkGray3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header_text: {
    color: 'white',
    fontWeight: '500',
  },
  exercise_container: {
    flexGrow: 7,
  },
  button_container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.darkGray2,
    padding: 16,
  },
});
