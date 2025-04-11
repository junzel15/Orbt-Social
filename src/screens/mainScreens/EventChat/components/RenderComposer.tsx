import React, { memo } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomImage from '../../../../components/atoms/image/CustomImage';
import { colors } from '../../../../constants/colors';
import { fonts } from '../../../../constants/fonts';
import { getScaledFontSize } from '../../../../constants/globalFunctions';
import { globalStyleDefinitions } from '../../../../constants/globalStyleDefinitions';
import { iconPath } from '../../../../constants/iconPath';

interface iProps {
  message: string;
  setMessage: (message: string) => void;
  onSend: () => void;
}

const RenderComposer = ({message, setMessage, onSend}: iProps) => {
  return (
    <View style={styles.composerWrapper}>
      <View style={styles.rowWrapper}>
        <TouchableOpacity activeOpacity={0.9} style={styles.imageWrapper}>
          <CustomImage url={iconPath.camera} height={15} width={15} />
        </TouchableOpacity>
        <TextInput
          placeholder="Message..."
          placeholderTextColor={colors.placeholderColor}
          style={styles.input}
          multiline
          value={message}
          onChangeText={setMessage}
        />
        <CustomImage url={iconPath.audio} height={24} width={24} />
        <CustomImage url={iconPath.imagePick} height={24} width={24} />
      </View>
      {message?.trim() && (
        <TouchableOpacity activeOpacity={0.9} onPress={onSend}>
          <CustomImage url={iconPath.send} height={24} width={24} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  composerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: globalStyleDefinitions.cardInnerPadding.padding,
    backgroundColor: colors.white,
    paddingBottom: Platform.select({ios: 30}),
    paddingHorizontal: globalStyleDefinitions.screenPadding.padding,
    gap: globalStyleDefinitions.gap.gap,
  },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.offWhite,
    paddingHorizontal: globalStyleDefinitions.cardInnerPadding.padding,
    borderRadius: 4 * globalStyleDefinitions.br_10.borderRadius,
    gap: globalStyleDefinitions.gap.gap,
    overflow: 'hidden',
  },
  input: {
    minHeight: 50,
    maxHeight: 150,
    backgroundColor: colors.offWhite,
    flex: 1,
    fontSize: getScaledFontSize(16),
    color: colors.black,
    fontFamily: fonts.fontRegular,
    textAlignVertical: 'center',
    verticalAlign: 'middle',
    paddingVertical: globalStyleDefinitions.cardInnerPadding.padding,
  },
  imageWrapper: {
    height: 30,
    width: 30,
    borderRadius: 1.5 * globalStyleDefinitions.br_10.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
});

export default memo(RenderComposer);
