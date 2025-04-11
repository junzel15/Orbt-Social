import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {
  ImageSourcePropType,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fonts';
import {getScaledFontSize} from '../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../constants/globalStyleDefinitions';
import {imagePath} from '../../constants/imagePath';
import CustomImage from '../atoms/image/CustomImage';

interface iProps {
  title: string;
  isMenuVisible?: boolean;
  isShadow?: boolean;
  onMenuPress?: () => void;
  profileImage?: ImageSourcePropType;
  customStyle?:ViewStyle
}
const CustomHeader = ({
  title,
  isMenuVisible = false,
  isShadow = true,
  onMenuPress,
  profileImage,
  customStyle
}: iProps) => {
  const navigation = useNavigation<NavigationProp<any>>();

  const onBackPress = () => {
    navigation.goBack();
  };

  const shadowColor = isShadow ? colors.black : colors.white;
  return (
    <View style={[styles.rowWrapper, {shadowColor},customStyle]}>
      <AntDesign
        name="arrowleft"
        size={28}
        color={colors.black}
        onPress={onBackPress}
      />
      {profileImage && (
        <CustomImage url={profileImage} imageStyle={styles.image} />
      )}
      <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
      {isMenuVisible && (
        <TouchableOpacity activeOpacity={0.9} onPress={onMenuPress}>
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
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
    paddingHorizontal: globalStyleDefinitions.screenPadding.padding,
    zIndex: 1,
  },
  headerTitle: {
    color: colors.black,
    fontSize: getScaledFontSize(22),
    lineHeight: getScaledFontSize(27),
    fontFamily: fonts.soraSemiBold,flex:1
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 1.5 * globalStyleDefinitions.br_10.borderRadius,
  },
});

export default memo(CustomHeader);
