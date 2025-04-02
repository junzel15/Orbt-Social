import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../../../constants/colors';
import {fonts} from '../../../../constants/fonts';
import {getScaledFontSize} from '../../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../../constants/globalStyleDefinitions';

interface iProps {
  item: any;
  isSelected: any;
  onSelect: () => void;
}

const InterestCard = ({item, isSelected, onSelect}: iProps) => {
  return (
    <TouchableOpacity
      style={[styles.mainWrapper, isSelected && styles.selectedWrapper]}
      onPress={onSelect}
      activeOpacity={0.9}>
      <Text style={isSelected ? styles.selectedText : styles.text}>{item}</Text>
      {isSelected ? (
        <Entypo name="check" color={colors.primary} size={20} />
      ) : (
        <AntDesign name="plus" color={colors.white} size={20} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
    paddingHorizontal: globalStyleDefinitions.cardInnerPadding.padding,
    paddingVertical:0.5* globalStyleDefinitions.cardInnerPadding.padding,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0.5 * globalStyleDefinitions.gap.gap,
  },
  selectedWrapper: {
    backgroundColor: colors.white,
    borderColor: colors.white,
  },
  selectedText: {
    color: colors.primary,
    fontSize: getScaledFontSize(14),
    fontFamily: fonts.fontBold,
  },
  text: {
    color: colors.white,
    fontSize: getScaledFontSize(14),
    fontFamily: fonts.fontRegular,
  },
});

export default memo(InterestCard);
