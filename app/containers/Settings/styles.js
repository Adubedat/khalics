import { StyleSheet } from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  item_container: {
    height: 60,
    backgroundColor: theme.darkGray2,
    borderBottomWidth: 1,
    borderBottomColor: theme.gray5,
  },
  title: {
    color: theme.lightGray4,
    fontSize: 18,
    fontWeight: '300',
  },
  separator: {
    width: '100%',
    backgroundColor: theme.darkGray1,
    padding: 5,
    paddingLeft: 16,
  },
  separator_label: {
    color: theme.lightGray1,
    fontWeight: '500',
    fontSize: 18,
  },
});
