import {StyleSheet} from 'react-native';
import {colors} from './colors';
import {globalStyleDefinitions} from './globalStyleDefinitions';

const commonStyles = StyleSheet.create({
  flexFull: {
    flex: 1,
  },
  wrapperContainer: {
    flex: 1,
    backgroundColor: colors.black,
  },
  fullInnerContainer: {
    flex: 1,
    padding: globalStyleDefinitions.screenPadding.padding,
  
  },
});
export default commonStyles;
