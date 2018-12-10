import React from 'react';
import { View } from 'react-native';

class DifficultyBar extends React.Component {
  constructor(props) {
    super(props);
    // TODO: grayed bar / 5
  }

  render() {
    const { barColor, separationColor } = this.props;
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ backgroundColor: barColor, height: 20, width: 20 }} />
        <View style={{ backgroundColor: separationColor, height: 2, width: 2 }} />
        <View style={{ backgroundColor: barColor, height: 20, width: 20 }} />
      </View>
    );
  }
}

export default DifficultyBar;
