import { StyleSheet, Platform, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  main_container: {
    flexGrow: 1,
    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    backgroundColor: '#202020',
    justifyContent: 'space-around',
  },
  header_container: {
    height: 180,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#282828',
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
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
    height: 250,
    width: '95%',
    marginBottom: 20,
    backgroundColor: '#282828',
  },
  linechart_container: {
    flex: 6,
    flexDirection: 'row',
    padding: 10,
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
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 2,
    borderRadius: 1,
    zIndex: 1,
    borderRightWidth: 1,
    borderRightColor: 'gray',
  },
  button_text: {
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 5,
  },
});

export default styles;
