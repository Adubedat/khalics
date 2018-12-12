import { StyleSheet } from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  container: {
    paddingTop: '20%',
    flex: 1,
    backgroundColor: theme.darkGray2,
    padding: 10,
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  rowContainer: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  divider: {
    backgroundColor: theme.gray3,
    width: '80%',
    height: 1,
  },
  techniquesContainer: {
    alignItems: 'flex-start',
    marginLeft: 30,
    marginBottom: 20,
  },
});
