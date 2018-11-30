import { StyleSheet } from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkGray2,
  },
  mainTitle: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 8,
  },
  presentationTxt: {
    color: 'white',
    textAlign: 'center',
    // fontSize: 18,
    marginBottom: 25,
  },
});
