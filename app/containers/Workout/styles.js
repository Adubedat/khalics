import { StyleSheet } from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkGray2,
    justifyContent: 'space-around',
  },
  item_container: {
    backgroundColor: theme.darkGray2,
    height: 90,
    borderTopColor: theme.gray5,
    borderTopWidth: 1,
  },
  exercisesContainer: {
    flex: 9,
    justifyContent: 'center',
  },
  button_container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.darkGray2,
    padding: 16,
  },
});
