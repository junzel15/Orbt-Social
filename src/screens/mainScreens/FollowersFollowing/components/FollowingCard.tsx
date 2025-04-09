import React, {memo, useRef, useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Menu} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import CommonButton from '../../../../components/atoms/button/CommonButton';
import CustomImage from '../../../../components/atoms/image/CustomImage';
import {colors} from '../../../../constants/colors';
import {fonts} from '../../../../constants/fonts';
import {windowWidth} from '../../../../constants/globalConstants';
import {getScaledFontSize} from '../../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../../constants/globalStyleDefinitions';
import BlockModal from './BlockModal';

interface iProps {
  item: any;
  onBlock: () => void;
}

const FollowingCard = ({item, onBlock}: iProps) => {
  const blockRef = useRef<any>(null);

  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const onMenuPress = () => {
    setMenuVisible(!menuVisible);
  };

  const onClose = () => {
    setMenuVisible(false);
  };

  const onBlockPress = () => {
    setMenuVisible(false);
    blockRef.current?.open();
  };

  const onBlockFollower = () => {
    blockRef.current?.close();
    onBlock();
  };
  return (
    <>
      <View style={styles.cardWrapper}>
        <CustomImage
          url={{uri: item?.profile_picture}}
          imageStyle={styles.image}
        />
        <Text style={styles.text}>{item?.name}</Text>
        <CommonButton title={'Message'} customStyles={styles.secondaryButton} />
        <Menu
          visible={menuVisible}
          onDismiss={onClose}
          anchor={
            <Entypo
              name="dots-three-vertical"
              color={colors.black}
              size={20}
              suppressHighlighting
              onPress={onMenuPress}
            />
          }
          style={styles.menuWrapper}
          contentStyle={styles.contextMenuContent}>
          <View style={styles.menuWrapper}>
            <Text
              style={[styles.menuText, {color: colors.orange}]}
              suppressHighlighting
              onPress={onClose}>
              Unfollow
            </Text>
            <Text
              style={styles.menuText}
              suppressHighlighting
              onPress={onBlockPress}>
              Block
            </Text>
          </View>
        </Menu>
      </View>
      <BlockModal onBlock={onBlockFollower} item={item} ref={blockRef} />
    </>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginTop: globalStyleDefinitions.commonItemMargin.margin,
    flexDirection: 'row',
    alignItems: 'center',
    gap: globalStyleDefinitions.gap.gap,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
  },
  text: {
    fontFamily: fonts.soraSemiBold,
    fontSize: getScaledFontSize(12),
    color: colors.black,
    flex: 1,
    marginHorizontal: 5,
  },
  secondaryButton: {
    marginTop: 0,
    backgroundColor: colors.secondaryText,
    width: windowWidth * 0.3,
    paddingVertical: 10,
    borderRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
  },
  primaryButton: {
    marginTop: 0,
    width: windowWidth * 0.3,
    paddingVertical: 10,
    borderRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
  },
  menuWrapper: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
    borderColor: colors.white,
    width: windowWidth * 0.25,
  },
  contextMenuContent: {
    backgroundColor: colors.black,
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
    alignSelf: 'flex-end',
    top: Platform.select({
      ios: 25,
      android: 65,
    }),
    width: windowWidth * 0.25,
  },
  menuText: {
    paddingHorizontal: globalStyleDefinitions.cardInnerPadding.padding,
    paddingVertical: 0.5 * globalStyleDefinitions.cardInnerPadding.padding,
    fontFamily: fonts.fontSemiBold,
    fontSize: getScaledFontSize(12),
    color: colors.white,
  },
});

export default memo(FollowingCard);
