import { StyleSheet } from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkGray2,
  },
  mainTitle: {
    marginVertical: 50,
    textAlign: 'center',
    flexDirection: 'column',
    color: 'white',
  },
  exercisesContainer: {
    // marginTop: 21,
    // marginVertical: 10,
    // borderWidth: 2,
    // borderStyle: 'solid',
    // borderColor: theme.red,
    backgroundColor: theme.darkGray1,
  },
});
