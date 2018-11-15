import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
} from 'react-native';

class FloatingLabelInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
  }

  componentWillMount() {
    const { value } = this.props;
    this.animatedIsFocused = new Animated.Value(value === '' ? 0 : 1);
  }

  componentDidUpdate() {
    const { isFocused } = this.state;
    const { value } = this.props;
    Animated.timing(this.animatedIsFocused, {
      toValue: (isFocused || value !== '') ? 1 : 0,
      duration: 200,
    }).start();
  }

  handleFocus = () => this.setState({ isFocused: true });

  handleBlur = () => this.setState({ isFocused: false });

  render() {
    const { label, ...props } = this.props;
    const { isFocused } = this.state;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      fontWeight: !isFocused ? 'normal' : 'bold',
      top: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0],
      }),
      fontSize: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 14],
      }),
      color: !isFocused ? '#D3D3D3' : 'white',
    };
    const styles = StyleSheet.flatten({
      textInputStyle: {
        height: 30,
        fontSize: 16,
        color: 'white',
        borderBottomWidth: !isFocused ? 1 : 2,
        borderBottomColor: !isFocused ? '#D3D3D3' : 'white',
      },
    });
    return (
      <View style={{ margin: 5, marginLeft: 20, marginRight: 20 }}>
        <View style={{ paddingTop: 18 }}>
          <Animated.Text style={labelStyle}>
            {label}
          </Animated.Text>
          <TextInput
            {...props}
            style={styles.textInputStyle}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            blurOnSubmit
          />
        </View>
      </View>
    );
  }
}

export default FloatingLabelInput;
