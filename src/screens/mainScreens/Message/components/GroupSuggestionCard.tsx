import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RadioButton from '../../../../components/atoms/button/RadioButton';
import CustomImage from '../../../../components/atoms/image/CustomImage';
import {colors} from '../../../../constants/colors';
import {fonts} from '../../../../constants/fonts';
import {getScaledFontSize} from '../../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../../constants/globalStyleDefinitions';

interface iProps {
  item: any;
  onPress: () => void;
  isSelected: boolean;
}
const GroupSuggestionCard = ({item, onPress,isSelected}: iProps) => {
  return (
    <View style={styles.cardWrapper}>
      <CustomImage url={item?.profile_image} imageStyle={styles.profileImage} />
      <Text style={styles.titleText} numberOfLines={1}>
        {item?.name}
      </Text>
      <RadioButton onSelect={onPress} isSelected={isSelected} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: globalStyleDefinitions.gap.gap,
    paddingVertical: 0.5 * globalStyleDefinitions.cardInnerPadding.padding,
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  titleText: {
    fontFamily: fonts.fontSemiBold,
    fontSize: getScaledFontSize(14),
    lineHeight: getScaledFontSize(20),
    color: colors.black,
    flex: 1,
  },
});

export default memo(GroupSuggestionCard);
