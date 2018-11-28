import { StyleSheet, Platform, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    backgroundColor: '#383838',
  },
  header_container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#282828',
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    margin: 15,
    elevation: 2,
    zIndex: 1,
  },
  username: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
  },
  bar_text: {
    color: 'white',
  },
  content_container: {
    flex: 2,
  },
});

export default styles;
