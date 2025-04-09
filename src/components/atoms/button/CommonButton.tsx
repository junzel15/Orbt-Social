import React, {memo} from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {colors} from '../../../constants/colors';
import {fonts} from '../../../constants/fonts';
import {getScaledFontSize} from '../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';

interface iProps {
  title: string;
  onPress?: () => void;
  customStyles?: ViewStyle;
  customTextStyles?: TextStyle;
  disable?: boolean;
}

const CommonButton = ({
  title,
  onPress,
  customStyles,
  customTextStyles,
  disable = false,
}: iProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.btnWrapper,
        {backgroundColor: disable ? colors.disable : colors.primary},
        customStyles,
      ]}
      disabled={disable}>
      <Text style={[styles.btnText, customTextStyles]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnWrapper: {
    alignSelf: 'center',
    backgroundColor: colors.primary,
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: globalStyleDefinitions.cardInnerPadding.padding,
    marginTop: globalStyleDefinitions.commonItemMargin.margin,
  },
  btnText: {
    color: colors.white,
    fontSize: getScaledFontSize(16),
    fontFamily: fonts.fontSemiBold,
  },
});

export default memo(CommonButton);
