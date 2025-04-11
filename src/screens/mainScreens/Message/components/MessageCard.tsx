import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {memo, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomImage from '../../../../components/atoms/image/CustomImage';
import {colors} from '../../../../constants/colors';
import commonStyles from '../../../../constants/commonStyles';
import {fonts} from '../../../../constants/fonts';
import {getScaledFontSize} from '../../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../../constants/globalStyleDefinitions';
import {navigationStrings} from '../../../../navigation/navigationStrings';
import MessageOptionsModal from './MessageOptionsModal';

interface iProps {
  item: any;
}
const MessageCard = ({item}: iProps) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const modalRef = useRef<any>(null);

  const onLongPress = () => {
    modalRef.current.open();
  };

  const onPress = () => {
    if (item?.isEvent) {
      navigation.navigate(navigationStrings.EventChat, {
        item,
      });
    } else {
      navigation.navigate(navigationStrings.Chat, {
        item,
      });
    }
  };

  const onDelete = () => {
    modalRef.current.close();
  };
  const onLeave = () => {
    modalRef.current.close();
  };
  const onMarkAsRead = () => {
    modalRef.current.close();
  };
  const onMute = () => {
    modalRef.current.close();
  };
  const onPin = () => {
    modalRef.current.close();
  };
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.cardWrapper}
        onLongPress={onLongPress}
        onPress={onPress}>
        <CustomImage
          url={item?.profile_image}
          imageStyle={styles.profileImage}
        />
        <View style={commonStyles.flexFull}>
          <View style={styles.rowWraper}>
            <Text style={styles.titleText} numberOfLines={1}>
              {item?.name}
            </Text>
            {item?.expire && (
              <Text style={styles.expireText}>Exp: {item?.expire}</Text>
            )}
          </View>
          <Text
            style={item?.unread_count == 0 ? styles.subText : styles.unreadText}
            numberOfLines={1}>
            {item?.last_message}
          </Text>
        </View>
      </TouchableOpacity>
      <MessageOptionsModal
        ref={modalRef}
        item={item}
        onDelete={onDelete}
        onLeave={onLeave}
        onMarkAsRead={onMarkAsRead}
        onMute={onMute}
        onPin={onPin}
      />
    </>
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
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  titleText: {
    fontFamily: fonts.fontSemiBold,
    fontSize: getScaledFontSize(14),
    lineHeight: getScaledFontSize(20),
    color: colors.black,
    flex: 1,
  },
  subText: {
    fontFamily: fonts.fontRegular,
    fontSize: getScaledFontSize(12),
    lineHeight: getScaledFontSize(20),
    color: colors.placeholderColor,
  },
  unreadText: {
    fontFamily: fonts.fontSemiBold,
    fontSize: getScaledFontSize(12),
    lineHeight: getScaledFontSize(20),
    color: colors.primary,
  },
  expireText: {
    fontFamily: fonts.fontSemiBold,
    fontSize: getScaledFontSize(10),
    lineHeight: getScaledFontSize(20),
    color: colors.disable,
  },
  rowWraper: {
    flexDirection: 'row',
    gap: globalStyleDefinitions.gap.gap,
    alignItems: 'center',
  },
});

export default memo(MessageCard);
