import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import CustomImage from '../../../../components/atoms/image/CustomImage';
import {colors} from '../../../../constants/colors';
import {fonts} from '../../../../constants/fonts';
import {getScaledFontSize} from '../../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../../constants/globalStyleDefinitions';

interface iProps {
  item: any;
  isSelected: any;
  onSelect: () => void;
}

const GenderSelectionCard = ({item, isSelected, onSelect}: iProps) => {
  return (
    <TouchableOpacity
      style={[styles.mainWrapper, isSelected && styles.selectedWrapper]}
      onPress={onSelect} activeOpacity={0.9}>
      <CustomImage
        url={item?.icon}
        height={24}
        width={24}
        tintColor={isSelected ? colors.primary : colors.white}
      />
      <Text style={isSelected ? styles.selectedText : styles.text}>
        {item?.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
    padding: globalStyleDefinitions.cardInnerPadding.padding,
    marginTop: globalStyleDefinitions.mt_15.marginTop,
    flexDirection: 'row',
    alignItems: 'center',
    gap: globalStyleDefinitions.gap.gap,
  },
  selectedWrapper: {
    backgroundColor: colors.white,
  },
  selectedText: {
    color: colors.primary,
    fontSize: getScaledFontSize(16),
    fontFamily: fonts.fontBold,
  },
  text: {
    color: colors.white,
    fontSize: getScaledFontSize(16),
    fontFamily: fonts.fontRegular,
  },
});

export default memo(GenderSelectionCard);
