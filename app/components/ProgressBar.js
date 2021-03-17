import React, { Component } from 'react';
import { StyleSheet, Animated } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  outer: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  bar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
});

class AnimatedBar extends Component {
  constructor(props) {
    super(props);
    const { progress } = this.props;
    this.state = {
      animation: new Animated.Value(progress),
    };
  }

  componentWillMount() {
    const { animation } = this.state;
    this.widthInterpolate = animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
      extrapolate: 'clamp',
    });
  }

  componentDidMount() {
    this.attachListener();
  }

  componentDidUpdate(prevProps) {
    const {
      animate, progress, duration, onAnimate,
    } = this.props;
    const { animation } = this.state;
    // If our function changes then attach the new one
    if (prevProps.onAnimate !== onAnimate) {
      this.attachListener();
    }
    // If our progress has changed we should animate
    if (prevProps.progress !== progress) {
      if (animate) {
        Animated.timing(animation, {
          toValue: progress,
          duration,
        }).start();
      } else {
        animation.setValue(progress);
      }
    }
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  attachListener = () => {
    const { onAnimate } = this.props;
    this.removeListeners();

    if (typeof onAnimate === 'function') {
      this.attachListener(onAnimate);
    }
  };

  removeListeners = () => {
    const { animation } = this.state;
    animation.removeAllListeners();
  };

  render() {
    const {
      children,
      height,
      borderColor,
      borderWidth,
      borderRadius,
      barColor,
      fillColor,
      row,
      style,
      wrapStyle,
      fillStyle,
      barStyle,
    } = this.props;

    return (
      <Animated.View style={[styles.outer, { height, borderRadius }, row ? styles.flex : undefined, style]}>
        <Animated.View style={[styles.flex, { borderColor, borderWidth, borderRadius }, wrapStyle]}>
          <Animated.View
            style={[StyleSheet.absoluteFill, { backgroundColor: fillColor, borderRadius }, fillStyle]}
          />
          <Animated.View
            style={[
              styles.bar,
              {
                width: this.widthInterpolate,
                backgroundColor: barColor,
                borderRadius,
              },
              barStyle,
            ]}
          />
          {children}
        </Animated.View>
      </Animated.View>
    );
  }
}

AnimatedBar.propTypes = {
  height: PropTypes.number,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.number,
  borderRadius: PropTypes.number,
  barColor: PropTypes.string,
  fillColor: PropTypes.string,
  duration: PropTypes.number,
  animate: PropTypes.bool,
  children: PropTypes.node,
  row: PropTypes.bool,
  progress: PropTypes.number,
  onAnimate: PropTypes.func,
};

AnimatedBar.defaultProps = {
  height: 10,
  borderColor: '#000',
  borderWidth: 1,
  borderRadius: 0,
  barColor: '#FFF',
  fillColor: 'rgba(0,0,0,.5)',
  duration: 100,
  animate: true,
  children: null,
  row: null,
  progress: 0,
  onAnimate: undefined,
};

export default AnimatedBar;
