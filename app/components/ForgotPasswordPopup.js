import React from 'react';
import { StyleSheet } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import FloatingLabelInput from './FloatingLabelInput';

class ForgotPasswordPopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isVisible: false,
    };
  }

  handleEmailTextChange = (newText) => {
    this.setState({
      email: newText,
    });
  }

  visible() {
    this.setState({ isVisible: true });
  }

  render() {
    const { isVisible, email } = this.state;
    return (
      <Overlay
        isVisible={isVisible}
        windowBackgroundColor="rgba(52, 52, 52, 0.7)"
        onBackdropPress={() => this.setState({ isVisible: false })}
        width="80%"
        height="auto"
        borderRadius={10}
      >
        <FloatingLabelInput
          label="Email"
          value={email}
          onChangeText={this.handleEmailTextChange}
        />
        <Button
          title="Recover password"
          style={{ borderRadius: 4 }}
          buttonStyle={styles.form_button} // eslint-disable-line
        />
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  form_button: {
    backgroundColor: '#EB241A',
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    elevation: 0,
    height: 40,
  },
});

export default ForgotPasswordPopup;
