import { StyleSheet } from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  container: {
    paddingTop: '20%',
    flex: 1,
    backgroundColor: theme.darkGray2,
  },
  mainTitle: {
    marginVertical: 35,
    textAlign: 'center',
    flexDirection: 'column',
    color: 'white',
  },
  basicText: {
    marginHorizontal: 10,
    fontSize: 18,
    color: 'white',
  },
});
