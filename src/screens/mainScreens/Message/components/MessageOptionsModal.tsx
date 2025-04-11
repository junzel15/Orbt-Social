import React, {forwardRef, memo, useImperativeHandle, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RBSheet from '../../../../components/modal/RBSheet';
import {colors} from '../../../../constants/colors';
import commonStyles from '../../../../constants/commonStyles';
import {fonts} from '../../../../constants/fonts';
import {getScaledFontSize} from '../../../../constants/globalFunctions';

interface iProps {
  onPin: () => void;
  onMarkAsRead: () => void;
  onMute: () => void;
  onLeave: () => void;
  onDelete: () => void;
  item: any;
}

const MessageOptionsModal = forwardRef((props: iProps, ref) => {
  const refRBSheet = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      refRBSheet.current?.open();
    },
    close: () => {
      refRBSheet.current?.close();
    },
  }));

  return (
    <RBSheet ref={refRBSheet} height={250}>
      <View style={commonStyles.flexFull}>
        <Text style={styles.titleText}>{props.item?.name}</Text>
        <View style={styles.itemWrapper}>
          <Text onPress={props.onPin} suppressHighlighting style={styles.text}>
            Pin
          </Text>
          <Text
            onPress={props.onMarkAsRead}
            suppressHighlighting
            style={styles.text}>
            Mark as read
          </Text>
          <Text onPress={props.onMute} suppressHighlighting style={styles.text}>
            Mute messages
          </Text>
          <Text
            onPress={props.onLeave}
            suppressHighlighting
            style={styles.highlightText}>
            {props.item?.isGroup ? `Leave group` : `Leave chat`}
          </Text>
          <Text
            onPress={props.onDelete}
            suppressHighlighting
            style={styles.highlightText}>
            Delete
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

export default memo(MessageOptionsModal);
