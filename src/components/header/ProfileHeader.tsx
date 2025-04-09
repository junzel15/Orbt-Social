import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fonts';
import {getScaledFontSize} from '../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../constants/globalStyleDefinitions';
import {imagePath} from '../../constants/imagePath';
import {navigationStrings} from '../../navigation/navigationStrings';
import CustomImage from '../atoms/image/CustomImage';

interface iProps {
  title: string;
  isMenuVisible?: boolean;
}
const ProfileHeader = ({title, isMenuVisible = false}: iProps) => {
  const navigation = useNavigation<NavigationProp<any>>();

  const onBackPress = () => {
    navigation.goBack();
  };

  const onGoSetting = () => {
    navigation.navigate(navigationStrings.Settings);
  };
  return (
    <View style={styles.rowWrapper}>
      <View style={{flexDirection: 'row', width: '90%'}}>
        <AntDesign
          name="arrowleft"
          size={28}
          color={colors.black}
          onPress={onBackPress}
        />
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      {isMenuVisible && (
        <TouchableOpacity activeOpacity={0.9} onPress={onGoSetting}>
          <CustomImage url={imagePath.burgerIcon} height={25} width={25} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: globalStyleDefinitions.gap.gap,
    paddingTop: Platform.select({
      ios: 3 * globalStyleDefinitions.screenPadding.padding,
      android: 2.5 * globalStyleDefinitions.screenPadding.padding,
    }),
    paddingBottom: globalStyleDefinitions.screenPadding.padding,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
    borderBottomRightRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
    shadowColor: colors.black,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
    paddingHorizontal: globalStyleDefinitions.screenPadding.padding,
  },
  headerTitle: {
    color: colors.black,
    fontSize: getScaledFontSize(22),
    fontFamily: fonts.fontSemiBold,
    marginLeft: globalStyleDefinitions.mr_10.marginRight,
  },
});

export default memo(ProfileHeader);
