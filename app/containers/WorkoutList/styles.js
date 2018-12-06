import { StyleSheet } from 'react-native';
import theme from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkGray2,
    justifyContent: 'center',
  },
  stepIndicator: {
    paddingLeft: 42,
    flexDirection: 'row',
    flex: 1,
  },
  // name: {
  //   flex: 1,
  //   fontSize: 20,
  //   color: '#333333',
  //   paddingVertical: 16,
  //   fontWeight: '600',
  // },
  // description: {
  //   flex: 1,
  //   fontSize: 15,
  //   color: theme.gray3,
  //   lineHeight: 24,
  //   marginRight: 8,
  // },
});

export const stepIndicatorStyles = {
  stepIndicatorSize: 40,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 4,
  stepStrokeCurrentColor: theme.red,
  separatorFinishedColor: theme.red,
  separatorUnFinishedColor: theme.gray3,
  stepIndicatorFinishedColor: theme.red,
  stepIndicatorUnFinishedColor: theme.gray3,
  stepIndicatorCurrentColor: 'white',
  stepIndicatorLabelFontSize: 20,
  currentStepIndicatorLabelFontSize: 20,
  stepIndicatorLabelCurrentColor: 'black',
  stepIndicatorLabelFinishedColor: 'black',
  stepIndicatorLabelUnFinishedColor: theme.lightGray1,
  labelColor: theme.gray3,
  labelSize: 30,
  currentStepLabelColor: 'white',
};
