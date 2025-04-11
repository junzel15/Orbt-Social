import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomImage from '../../../../components/atoms/image/CustomImage';
import {colors} from '../../../../constants/colors';
import {globalStyleDefinitions} from '../../../../constants/globalStyleDefinitions';

interface iProps {
  item: any;
  onRemove: () => void;
}
const SelectedMemberCard = ({item, onRemove}: iProps) => {
  return (
    <View style={styles.cardWrapper}>
      <CustomImage url={item?.profile_image} imageStyle={styles.profileImage} />
      <TouchableOpacity
        style={styles.iconWrapper}
        activeOpacity={0.9}
        onPress={onRemove}>
        <Ionicons name="close-sharp" size={12} color={colors.black} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginTop: globalStyleDefinitions.commonItemMargin.margin,
    marginRight: 1.5 * globalStyleDefinitions.gap.gap,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  iconWrapper: {
    height: 18,
    width: 18,
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
    backgroundColor: colors.white,
    position: 'absolute',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
    shadowColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    right: -5,top:-5
  },
});

export default memo(SelectedMemberCard);
