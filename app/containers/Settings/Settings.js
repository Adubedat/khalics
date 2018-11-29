import React from 'react';
import { View } from 'react-native';

class Settings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
    );
  }
}

export default Settings;
