import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import CustomImage from '../../../../components/atoms/image/CustomImage';
import {colors} from '../../../../constants/colors';
import {fonts} from '../../../../constants/fonts';
import {getScaledFontSize} from '../../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../../constants/globalStyleDefinitions';
import {navigationStrings} from '../../../../navigation/navigationStrings';

interface iProps {
  item: any;
}
const SuggestionCard = ({item}: iProps) => {
  const navigation = useNavigation<NavigationProp<any>>();

  const onPress = () => {
    navigation.navigate(navigationStrings.Chat, {
      item: {
        ...item,
        isGroup: false,
      },
    });
  };
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.cardWrapper}
      onPress={onPress}>
      <CustomImage url={item?.profile_image} imageStyle={styles.profileImage} />
      <Text style={styles.titleText} numberOfLines={1}>
        {item?.name}
      </Text>
    </TouchableOpacity>
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

export default memo(SuggestionCard);
