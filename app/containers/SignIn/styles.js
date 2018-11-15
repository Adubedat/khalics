import { StatusBar, Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  main_container: {
    // marginTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
    // backgroundColor: 'transparent',
    flex: 1,
  },
  text: {
    color: 'red',
  },
  title_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: 'white',
  },
  form_label: {
    color: '#e6e6e6',
    fontSize: 14,
  },
  form_input: {
    color: '#cccccc',
  },
});
