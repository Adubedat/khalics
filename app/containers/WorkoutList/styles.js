import { StyleSheet } from 'react-native';
import dark from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282828',
  },
  mainTitle: {
    marginTop: 50,
    alignItems: 'center',
    flexDirection: 'column',
  },
  stepIndicator: {
    paddingLeft: 42,
    flexDirection: 'row',
    flex: 1,
  },
  name: {
    flex: 1,
    fontSize: 20,
    color: '#333333',
    paddingVertical: 16,
    fontWeight: '600',
  },
  description: {
    flex: 1,
    fontSize: 15,
    color: '#606060',
    lineHeight: 24,
    marginRight: 8,
  },
});

export const stepIndicatorStyles = {
  stepIndicatorSize: 42,
  currentStepIndicatorSize: 45,
  separatorStrokeWidth: 4,
  currentStepStrokeWidth: 6,
  stepStrokeCurrentColor: dark.red,
  separatorFinishedColor: dark.red,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: dark.red,
  stepIndicatorUnFinishedColor: '#aaaaaa',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 20,
  currentStepIndicatorLabelFontSize: 20,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 30,
  currentStepLabelColor: 'white',
};
