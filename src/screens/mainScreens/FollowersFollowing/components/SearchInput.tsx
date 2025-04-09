import React, {memo} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../../../../constants/colors';
import {fonts} from '../../../../constants/fonts';
import {getScaledFontSize} from '../../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../../constants/globalStyleDefinitions';

interface iProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchInput = ({value, onChangeText}: iProps) => {
  return (
    <View style={styles.inputWrapper}>
      <Feather name="search" color={colors.placeholderColor} size={24} />
      <TextInput
        placeholder="Search"
        placeholderTextColor={colors.placeholderColor}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    borderWidth: 1,
    borderColor: colors.placeholderColor,
    paddingHorizontal: globalStyleDefinitions.cardInnerPadding.padding,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
    gap: globalStyleDefinitions.gap.gap,
  },
  input: {
    height: 40,
    fontFamily: fonts.fontRegular,
    fontSize: getScaledFontSize(14),
    color: colors.black,
    textAlignVertical: 'center',
    paddingVertical: 0,
    flex: 1,
  },
});

export default memo(SearchInput);
