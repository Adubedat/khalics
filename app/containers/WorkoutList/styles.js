import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkGray2,
    justifyContent: 'space-around',
  },
  workouts_container: {
    flex: 8,
    justifyContent: 'center',
  },
  stepIndicator: {
    paddingLeft: 42,
    flexDirection: 'row',
    flex: 1,
  },
});

export default styles;
