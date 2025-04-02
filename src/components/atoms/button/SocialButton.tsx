import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../../constants/colors';
import CustomImage from '../image/CustomImage';
import { globalStyleDefinitions } from '../../../constants/globalStyleDefinitions';

interface iProps {
  onPress?: () => void;
  customStyles?: any;
  iconPath?: any;
}

const SocialButton = ({onPress, customStyles, iconPath}: iProps) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[styles.buttonContainer, customStyles]}>
      <CustomImage height={24} width={24} url={iconPath} />
    </TouchableOpacity>
  );
};

export default memo(SocialButton);

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    width:'auto',flex:1,
    padding: globalStyleDefinitions.cardInnerPadding.padding,
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
  },
});
