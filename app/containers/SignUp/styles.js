import { StatusBar, Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  main_container: {
    // marginTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
    backgroundColor: 'transparent',
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
    justifyContent: 'flex-end',
  },
  validation_container: {
    flex: 1,
  },
  form_button: {
    backgroundColor: '#EB241A',
    borderRadius: 4,
    margin: 20,
    marginBottom: 10,
    elevation: 0,
  },
});
