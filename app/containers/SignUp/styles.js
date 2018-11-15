import { StatusBar, Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  main_container: {
    marginTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
    backgroundColor: '#424242',
    flex: 1,
  },
  small_text: {
    fontSize: 12,
    color: 'white',
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
  form_container: {
    flex: 2,
    justifyContent: 'space-evenly',
  },
  form_button: {
    backgroundColor: '#D60000',
    borderRadius: 10,
    margin: 20,
  },
  left_icon_container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});
