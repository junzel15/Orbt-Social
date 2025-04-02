import React, {memo} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../../../constants/colors';
import {fonts} from '../../../constants/fonts';
import {getScaledFontSize} from '../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';

type iProps = {
  value: string;
  onChangeText: (val: string) => void;
  customStyle?: ViewStyle;
  customTextStyles?: TextStyle;
  countryCode?: any;
  maxLength?: number;
  onCountryCodePress?: () => void;
};

const PhoneInput = ({
  value,
  onChangeText,
  customStyle,
  customTextStyles,
  countryCode,
  maxLength,
  onCountryCodePress,
}: iProps) => {
  return (
    <View style={[styles.container, customStyle]}>
      <TouchableOpacity
        style={styles.rowContainer}
        activeOpacity={0.9}
        onPress={onCountryCodePress}>
        <Text style={styles.label}>{countryCode?.flag}</Text>
        <Feather name="chevron-down" color={colors.secondaryText} size={15} />
      </TouchableOpacity>
      <Text style={styles.label}>({countryCode?.code})</Text>
      <TextInput
        style={[styles.input, customTextStyles]}
        value={value}
        onChangeText={onChangeText}
        keyboardType="number-pad"
        maxLength={maxLength}
      />
    </View>
  );
};

export default memo(PhoneInput);

const styles = StyleSheet.create({
  container: {
    marginTop: globalStyleDefinitions.mt_15.marginTop,
    height: 50,
    borderWidth: 1,
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
    borderColor: colors.borderColor,
    backgroundColor: colors.white,
    paddingHorizontal: globalStyleDefinitions.cardInnerPadding.padding,
    gap: globalStyleDefinitions.gap.gap,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: colors.placeholderColor,fontSize:getScaledFontSize(14),fontFamily:fonts.fontRegular
  },
  input: {
    height: 'auto',
    fontFamily: fonts.fontRegular,
    fontSize: getScaledFontSize(14),
    color: colors.black,
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:  globalStyleDefinitions.gap.gap,
    borderRightWidth: 1,
    borderRightColor: colors.borderColor,
    height: 50,
    paddingRight: globalStyleDefinitions.gap.gap,
  },
});
