import { StatusBar, Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  main_container: {
    marginTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
    backgroundColor: '#424242',
    flex: 1,
  },
  small_text: {
    fontSize: 15,
    color: 'white',
  },
  text: {
    color: 'red',
  },
  title_container: {
    flex: 2,
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
    alignItems: 'center',
  },
  form_input_container: {
    margin: 10,
  },
  form_label: {
    color: 'white',
  },
  form_input: {
    color: 'white',
  },
  validation_container: {
    flex: 1,
  },
  form_button: {
    backgroundColor: '#D60000',
    borderRadius: 4,
    margin: 20,
    marginBottom: 5,
    elevation: 0,
  },
  left_icon_container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});
