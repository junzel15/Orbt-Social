import React, {memo, useState} from 'react';
import {
  ImageSourcePropType,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import {colors} from '../../../constants/colors';
import {fonts} from '../../../constants/fonts';
import {getScaledFontSize} from '../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';
import CustomImage from '../image/CustomImage';

type iProps = {
  placeholder?: string;
  value: string;
  onChangeText?: (val: string) => void;
  customStyle?: ViewStyle;
  customTextStyles?: TextStyle;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  maxLength?: number;
  icon?: ImageSourcePropType;
  editable?: boolean;
  iconColor?: string;
};

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  customStyle,
  customTextStyles,
  secureTextEntry = false,
  keyboardType = 'default',
  maxLength,
  icon,
  editable = true,
  iconColor = colors.disable,
}: iProps) => {
  const [secureEntry, setSecureEntry] = useState<boolean>(secureTextEntry);

  const toggleSecureEntry = () => {
    setSecureEntry(!secureEntry);
  };

  return (
    <View style={[styles.container, customStyle]}>
      {icon && (
        <CustomImage url={icon} height={24} width={24} tintColor={iconColor} />
      )}
      <TextInput
        style={[styles.input, customTextStyles]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.secondaryText}
        secureTextEntry={secureEntry}
        keyboardType={keyboardType}
        maxLength={maxLength}
        editable={editable}
      />
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={toggleSecureEntry}>
          <Octicons
            name={!secureEntry ? 'eye' : 'eye-closed'}
            size={20}
            color={colors.disable}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(CustomInput);

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
  input: {
    height: 'auto',
    fontFamily: fonts.fontRegular,
    fontSize: getScaledFontSize(14),
    color: colors.black,
    flex: 1,
  },
  iconWrapper: {
    position: 'absolute',
    right: globalStyleDefinitions.cardInnerPadding.padding,
  },
});
