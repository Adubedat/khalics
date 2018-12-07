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
    color: theme.lightGray1,
    fontSize: 18,
    fontWeight: '400',
  },
});
