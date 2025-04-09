import React, {memo, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommonButton from '../../../../components/atoms/button/CommonButton';
import CustomImage from '../../../../components/atoms/image/CustomImage';
import {colors} from '../../../../constants/colors';
import {fonts} from '../../../../constants/fonts';
import {windowWidth} from '../../../../constants/globalConstants';
import {getScaledFontSize} from '../../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../../constants/globalStyleDefinitions';
import RemoveModal from './RemoveModal';

interface iProps {
  item: any;
  onRemove: () => void;
}

const FollowerCard = ({item, onRemove}: iProps) => {
  const removeRef = useRef<any>(null);

  const onClosePress = () => {
    removeRef.current?.open();
  };

  const onRemoveFollower = () => {
    removeRef.current?.close();
    onRemove();
  };
  return (
    <>
      <View style={styles.cardWrapper}>
        <CustomImage
          url={{uri: item?.profile_picture}}
          imageStyle={styles.image}
        />
        <Text style={styles.text}>{item?.name}</Text>
        {item?.isFollowing ? (
          <CommonButton
            title={'Message'}
            customStyles={styles.secondaryButton}
          />
        ) : (
          <CommonButton
            title={'Follow Back'}
            customStyles={styles.primaryButton}
          />
        )}
        <Ionicons
          name="close"
          color={colors.placeholderColor}
          size={25}
          onPress={onClosePress}
          suppressHighlighting
        />
      </View>
      <RemoveModal onRemove={onRemoveFollower} item={item} ref={removeRef} />
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
});

export default memo(FollowerCard);
