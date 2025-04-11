import React, {forwardRef, memo, useImperativeHandle, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RBSheet from '../../../../components/modal/RBSheet';
import {colors} from '../../../../constants/colors';
import commonStyles from '../../../../constants/commonStyles';
import {fonts} from '../../../../constants/fonts';
import {getScaledFontSize} from '../../../../constants/globalFunctions';

interface iProps {
  name: string;
}

const DirectChatOptionsModal = forwardRef((props: iProps, ref) => {
  const refRBSheet = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      refRBSheet.current?.open();
    },
  }));

  const onClose = () => {
    refRBSheet.current?.close();
  };

  return (
    <RBSheet ref={refRBSheet} height={250}>
      <View style={commonStyles.flexFull}>
        <Text style={styles.titleText}>{props?.name}</Text>
        <View style={styles.itemWrapper}>
          <Text onPress={onClose} suppressHighlighting style={styles.text}>
            Share Contact
          </Text>
          <Text onPress={onClose} suppressHighlighting style={styles.text}>
            Create Group Chat with Iska Piñero
          </Text>
          <Text onPress={onClose} suppressHighlighting style={styles.text}>
            Report Technical Problem
          </Text>
          <Text
            onPress={onClose}
            suppressHighlighting
            style={styles.highlightText}>
            Block
          </Text>
          <Text
            onPress={onClose}
            suppressHighlighting
            style={styles.highlightText}>
            Delete Conversation
          </Text>
        </View>
      </View>
    </RBSheet>
  );
});

const styles = StyleSheet.create({
  titleText: {
    fontFamily: fonts.soraSemiBold,
    fontSize: getScaledFontSize(18),
    lineHeight: getScaledFontSize(20),
    color: colors.black,
    textAlign: 'center',
    top:-10
  },
  text: {
    fontFamily: fonts.soraRegular,
    fontSize: getScaledFontSize(16),
    lineHeight: getScaledFontSize(30),
    color: colors.black,
  },
  highlightText: {
    fontFamily: fonts.soraRegular,
    fontSize: getScaledFontSize(16),
    lineHeight: getScaledFontSize(30),
    color: colors.red,
  },
  itemWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default memo(DirectChatOptionsModal);
