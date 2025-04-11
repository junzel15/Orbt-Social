import React, { memo, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Bubble } from 'react-native-gifted-chat';
import { Menu } from 'react-native-paper';
import { colors } from '../../../../constants/colors';
import { fonts } from '../../../../constants/fonts';
import { getScaledFontSize } from '../../../../constants/globalFunctions';
import { globalStyleDefinitions } from '../../../../constants/globalStyleDefinitions';
import ReactionListModal from './ReactionListModal';

const reactionOptions = ['❤️', '😂', '😯', '😢', '😡', '👍'];

interface iProps {
  addReaction: (message: any, emoji: string) => void;
  onSelectId: (id: string) => void;
  props: any;
  onReplyToMessage: (message: any) => void;
}

const RenderBubble = ({
  addReaction,
  onSelectId,
  props,
  onReplyToMessage,
}: iProps) => {
  const {currentMessage} = props;
  const reactionRef = useRef<any>(null);

  const onLongPress = () => {
    onSelectId(currentMessage?._id);
  };

  const onReactionListPress = () => {
    reactionRef.current.open();
  };

  const onReply = () => {
    onLongPress();
    onReplyToMessage(currentMessage);
  };

  const wrapperStyle = {
    right: {
      backgroundColor: colors.primary,
      padding: globalStyleDefinitions.gap.gap,
      borderRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
    },
    left: {
      backgroundColor: colors.backgroundGray,
      padding: globalStyleDefinitions.gap.gap,
      borderRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
    },
  };

  const textStyle = {
    right: {
      color: colors.white,
      fontSize: getScaledFontSize(16),
      fontFamily: fonts.fontRegular,
    },
    left: {
      color: colors.black,
      fontSize: getScaledFontSize(16),
      fontFamily: fonts.fontRegular,
    },
  };

  const alignSelf = props.position === 'right' ? 'flex-end' : 'flex-start';
  const backgroundColor =
    props.position == 'right'
      ? colors.lightPurple + '80'
      : colors.CharcoalGrey + '20';
  const borderLeftColor =
    props.position == 'right' ? colors.white + '80' : colors.black + '20';
  const color = props.position === 'right' ? colors.white : colors.black;
  const right =
    props.position === 'right'
      ? globalStyleDefinitions.screenPadding.padding
      : undefined;
  const left =
    props.position === 'left'
      ? globalStyleDefinitions.screenPadding.padding
      : undefined;

  const renderCustomView = (props: any) => {
    const {currentMessage} = props;

    if (currentMessage?.replyTo) {
      return (
        <View
          style={[
            styles.replyContainer,
            {
              alignSelf,
              backgroundColor,
              borderLeftColor,
            },
          ]}>
          <Text style={[styles.replyLabel, {color}]}>
            {currentMessage?.replyTo?.user?.name}
          </Text>
          <Text style={[styles.replyText, {color}]}>
            {currentMessage.replyTo.text}
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View>
      <Menu
        visible={currentMessage?.showReactions}
        onDismiss={onLongPress}
        anchor={
          <Bubble
            {...props}
            wrapperStyle={wrapperStyle}
            textStyle={textStyle}
            renderTime={() => null}
            onLongPress={onLongPress}
            renderCustomView={renderCustomView}
          />
        }
        elevation={0}
        style={{
          right,
          left,
        }}>
        <View style={styles.menuWrapper}>
          {reactionOptions.map((emoji, index) => (
            <Text
              key={index}
              onPress={() => addReaction(currentMessage, emoji)}
              style={styles.listEmoji}
              suppressHighlighting>
              {emoji}
            </Text>
          ))}
        </View>

        <View style={[styles.bottomMenuWrapper, {alignSelf}]}>
          <Text style={styles.menuText} onPress={onReply} suppressHighlighting>
            Reply
          </Text>
          <Text
            style={styles.menuText}
            onPress={onLongPress}
            suppressHighlighting>
            Forward
          </Text>
          <Text
            style={styles.menuText}
            onPress={onLongPress}
            suppressHighlighting>
            Copy
          </Text>
        </View>
      </Menu>

      {currentMessage.reaction && currentMessage?.reaction?.length > 0 && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onReactionListPress}
          style={[
            styles.reactionWrapper,
            {right: props.position == 'left' ? 65 : 0},
          ]}>
          {currentMessage.reaction?.map((item: any, index: number) => {
            return (
              <Text style={styles.reactionText} key={index}>
                {item}
              </Text>
            );
          })}
        </TouchableOpacity>
      )}

      <ReactionListModal ref={reactionRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  menuWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 0.5 * globalStyleDefinitions.cardInnerPadding.padding,
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
    top: -50,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
    shadowColor: colors.black,
  },
  bottomMenuWrapper: {
    padding: 0.5 * globalStyleDefinitions.cardInnerPadding.padding,
    backgroundColor: colors.white,
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
    bottom: -20,
    width: 120,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
    shadowColor: colors.black,
  },
  listEmoji: {
    fontSize: getScaledFontSize(22),
    paddingHorizontal: 8,
  },
  reactionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 15,
    backgroundColor: colors.appBackground,
    alignSelf: 'flex-end',
    paddingHorizontal: 5,
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
    borderWidth: 1,
    borderColor: colors.white,
    gap: 2,
  },
  reactionText: {
    fontSize: getScaledFontSize(16),
    lineHeight: getScaledFontSize(30),
  },
  menuText: {
    fontFamily: fonts.fontBold,
    fontSize: getScaledFontSize(12),
    lineHeight: getScaledFontSize(30),
    color: colors.black,
  },
  replyContainer: {
    paddingHorizontal: globalStyleDefinitions.cardInnerPadding.padding,
    paddingVertical: 0.5 * globalStyleDefinitions.cardInnerPadding.padding,
    borderLeftWidth: 5,
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
    width: '100%',
  },
  replyLabel: {
    fontSize: getScaledFontSize(10),
    lineHeight: getScaledFontSize(15),
    fontFamily: fonts.fontBold,
    color: colors.white,
  },
  replyText: {
    fontSize: getScaledFontSize(12),
    lineHeight: getScaledFontSize(17),
    fontFamily: fonts.fontRegular,
    color: colors.white,
  },
});

export default memo(RenderBubble);
