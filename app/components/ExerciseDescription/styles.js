import { StyleSheet } from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  container: {
    paddingTop: '10%',
    flex: 1,
    backgroundColor: theme.darkGray2,
    padding: 10,
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  rowContainer: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  divider: {
    backgroundColor: theme.gray3,
    width: '90%',
    height: 1,
  },
  techniquesContainer: {
    alignItems: 'flex-start',
    marginLeft: 30,
    marginBottom: 20,
  },
});
