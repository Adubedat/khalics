import { StyleSheet, Platform, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    backgroundColor: '#282828',
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
      width: 0,
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
    height: '70%',
    width: '100%',
    backgroundColor: '#282828',
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 2,
    borderRadius: 1,
    zIndex: 1,
  },
  linechart_container: {
    flex: 15,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 30,
    marginLeft: 30,
  },
  button_chart_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  chart_button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_text: {
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 5,
  },
});

export default styles;
