import { StyleSheet, Platform, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    backgroundColor: '#383838',
  },
  header_container: {
    height: '33%',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#282828',
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart_container: {
    height: '60%',
    width: '95%',
    backgroundColor: '#282828',
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    elevation: 2,
    borderRadius: 1,
  },
  linechart_container: {
    flex: 8,
  },
  button_chart_container: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  chart_button: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#181818',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_text: {
    fontWeight: 'bold',
  },
});

export default styles;
