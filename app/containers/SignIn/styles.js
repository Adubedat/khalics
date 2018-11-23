import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  main_container: {
    flex: 1,
  },
  small_text: {
    fontSize: 15,
    color: 'white',
  },
  forgot_password_text: {
    textAlign: 'right',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 20,
  },
  title_container: {
    flex: 2,
    justifyContent: 'flex-end',
  },
  facebook_button: {
    backgroundColor: '#3b5998',
    margin: 30,
    marginTop: 10,
    marginBottom: 10,
    elevation: 0,
    height: 40,
  },
  google_button: {
    backgroundColor: '#dd4b39',
    margin: 30,
    marginTop: 10,
    marginBottom: 10,
    elevation: 0,
    height: 40,
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
    margin: 30,
    marginBottom: 10,
    elevation: 0,
    height: 40,
  },
  field_error: {
    marginLeft: 20,
    marginRight: 20,
    color: '#EB241A',
  },
  info_box: {
    backgroundColor: '#008CBA',
    margin: 20,
    marginBottom: 10,
    marginTop: 10,
    padding: 5,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
