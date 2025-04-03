import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomImage from '../../../../components/atoms/image/CustomImage';
import {colors} from '../../../../constants/colors';
import {fonts} from '../../../../constants/fonts';
import {windowWidth} from '../../../../constants/globalConstants';
import {getScaledFontSize} from '../../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../../constants/globalStyleDefinitions';
import {iconPath} from '../../../../constants/iconPath';

interface iProps {
  icon?: any;
  label: any;
  colors: Array<string>;
  onPress?: () => void;
  customStyle?: ViewStyle;
}

const CommonButton = ({icon, label, colors, onPress, customStyle}: iProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.button, customStyle]}>
      <LinearGradient colors={colors} style={[styles.button]} start={{x:0,y:1}}>
        <TouchableOpacity
          style={styles.innerWrapper}
          onPress={onPress}
          activeOpacity={1}>
          <CustomImage url={icon} height={44} width={44} />
          <Text style={styles.text}>{label}</Text>
          <CustomImage url={iconPath.topRightArrow} height={44} width={44} />
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: windowWidth,
    height: 120,
    borderTopRightRadius: 3 * globalStyleDefinitions.br_10.borderRadius,
    borderTopLeftRadius: 3 * globalStyleDefinitions.br_10.borderRadius,
    justifyContent: 'center',
    zIndex: 1,
    overflow: 'hidden',
  },
  innerWrapper: {
    paddingHorizontal: globalStyleDefinitions.screenPadding.padding,
    flexDirection: 'row',
    alignItems: 'center',
    gap: globalStyleDefinitions.gap.gap,
    paddingBottom: 15,
  },
  text: {
    flex: 1,
    fontSize: getScaledFontSize(24),
    fontFamily: fonts.soraRegular,
    color: colors.white,
  },
});

export default memo(CommonButton);
