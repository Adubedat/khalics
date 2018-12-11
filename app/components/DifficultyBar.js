import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

class DifficultyBar extends React.Component {
  static defaultProps = {
    activeColor: '#D00000',
    separationColor: '#202020',
    inactiveColor: '#606060',
    squareNb: 5,
  }

  renderDiffBar() {
    const {
      activeColor, separationColor, inactiveColor, squareNb, activeSquareNb,
    } = this.props;
    const difficultyBar = [];
    for (let i = 0; i < squareNb; i += 1) {
      const backgroundColor = i < activeSquareNb ? activeColor : inactiveColor;
      difficultyBar.push(
        <View
          key={i}
          style={{
            paddingRight: 3, backgroundColor: separationColor, height: 20, width: 20,
          }}
        >
          <View style={{ flex: 1, backgroundColor, borderRadius: 1 }} />
        </View>,
      );
    }
    return difficultyBar;
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {this.renderDiffBar()}
      </View>
    );
  }
}

DifficultyBar.propTypes = {
  activeColor: PropTypes.string,
  separationColor: PropTypes.string,
  inactiveColor: PropTypes.string,
  squareNb: PropTypes.number,
  activeSquareNb: PropTypes.number.isRequired,
};

export default DifficultyBar;
