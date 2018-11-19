import React from 'react';
import { Overlay } from 'react-native-elements';

class ForgotPasswordPopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }

  visible() {
    this.setState({ isVisible: true });
  }

  render() {
    const { isVisible } = this.state;
    return (
      <Overlay
        isVisible={isVisible}
        windowBackgroundColor="rgba(52, 52, 52, 0.7)"
        onBackdropPress={() => this.setState({ isVisible: false })}
        width="80%"
        height="auto"
        borderRadius={10}
      />
    );
  }
}

export default ForgotPasswordPopup;
