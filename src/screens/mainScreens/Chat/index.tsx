import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import CustomHeader from '../../../components/header/CustomHeader';
import LinearWrapperContainer from '../../../components/wrapper/LinearWrapperContainer';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import { colors } from '../../../constants/colors';
import { globalStyleDefinitions } from '../../../constants/globalStyleDefinitions';
import DirectChatOptionsModal from './components/DirectChatOptionsModal';
import GroupChatOptionsModal from './components/GroupChatOptionsModal';
import RenderBubble from './components/RenderBubble';
import RenderComposer from './components/RenderComposer';

const userData = {
  _id: 'user_1',
  name: 'User',
  avatar: 'https://example.com/user-avatar.png',
};

const Chat = () => {
  const route = useRoute<RouteProp<any>>();

  const {item} = route.params || {};

  const directRef = useRef<any>(null);
  const groupRef = useRef<any>(null);

  const [messagesList, setMessagesList] = useState<Array<any>>(
    [...ChatData].reverse(),
  );
  const [message, setMessage] = useState<string>('');
  const [replyToMessage, setReplyToMessage] = useState<any>(null);

  const onSend = () => {
    if (message?.trim().length > 0) {
      const newMessage = {
        _id: new Date(),
        type: 'text',
        text: message,
        createdAt: new Date(),
        user: {
          _id: 'user_1',
          name: 'User',
          avatar: 'https://example.com/user-avatar.png',
        },
        replyTo: replyToMessage,
      };
      setMessagesList(previousMessages =>
        GiftedChat.append(previousMessages, [newMessage]),
      );
      setMessage('');
      setReplyToMessage(null);
    }
  };

  const renderBubble = useCallback(
    (props: any) => {
      const addReaction = (message: any, emoji: string) => {
        const updatedMessages = messagesList.map(msg => {
          if (msg._id === message._id) {
            const existingReactions = msg.reaction || [];
            const updatedReactions = existingReactions.includes(emoji)
              ? existingReactions.filter((e: string) => e !== emoji)
              : [...existingReactions, emoji];

            return {
              ...msg,
              reaction: updatedReactions,
              showReactions: false,
            };
          }
          return msg;
        });
        setMessagesList(updatedMessages);
      };

      const toggleReactionMenu = (messageId: string) => {
        const updatedMessages = messagesList.map(msg =>
          msg._id == messageId
            ? {...msg, showReactions: !msg.showReactions}
            : {...msg, showReactions: false},
        );
        setMessagesList(updatedMessages);
      };
      return (
        <RenderBubble
          props={props}
          addReaction={addReaction}
          onSelectId={toggleReactionMenu}
          onReplyToMessage={setReplyToMessage}
        />
      );
    },
    [messagesList],
  );

  const renderComposer = useCallback(
    (props: any) => {
      return (
        <RenderComposer
          {...props}
          message={message}
          setMessage={setMessage}
          onSend={onSend}
          replyMessage={replyToMessage}
        />
      );
    },
    [message, replyToMessage],
  );

  const onMenuPress = () => {
    if (item?.isGroup) {
      groupRef.current?.open();
    } else {
      directRef.current?.open();
    }
  };

  return (
    <WrapperContainer>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <LinearWrapperContainer>
        <CustomHeader
          title={item?.name}
          isMenuVisible
          onMenuPress={onMenuPress}
          profileImage={item?.profile_image}
          customStyle={styles.header}
        />
        <GiftedChat
          messages={messagesList}
          onSend={onSend}
          user={userData}
          scrollToBottom={true}
          inverted={true}
          renderAvatar={null}
          renderBubble={renderBubble}
          listViewProps={{showsVerticalScrollIndicator: false}}
          messagesContainerStyle={styles.messagesContainer}
          renderComposer={renderComposer}
        />
      </LinearWrapperContainer>
      <DirectChatOptionsModal ref={directRef} name={item?.name} />
      <GroupChatOptionsModal ref={groupRef} name={item?.name} />
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  messagesContainer: {
    paddingHorizontal: 0.5 * globalStyleDefinitions.screenPadding.padding,
  },
  header: {
    paddingTop: Platform.select({
      ios: 3 * globalStyleDefinitions.screenPadding.padding,
      android: globalStyleDefinitions.screenPadding.padding,
    }),
  },
});

export default Chat;

export const ChatData = [
  {
    _id: '1',
    type: 'text',
    text: 'Hey Cj?',
    createdAt: '2025-04-09T10:28:00Z',
    user: {
      _id: 'user_2',
      name: 'User2',
      avatar: 'https://example.com/doctor-avatar.png',
    },
    reaction: ['❤️'],
  },
  {
    _id: '2',
    type: 'text',
    text: 'What’s up Marvie?',
    createdAt: '2025-04-09T10:28:00Z',
    user: {
      _id: 'user_1',
      name: 'User',
      avatar: 'https://example.com/user-avatar.png',
    },
    reaction: [],
  },
  {
    _id: '3',
    type: 'text',
    text: 'Are you up for going to a pub tonight?',
    createdAt: '2025-04-09T10:28:00Z',
    user: {
      _id: 'user_2',
      name: 'User2',
      avatar: 'https://example.com/doctor-avatar.png',
    },
    reaction: [],
    replyTo: {
      _id: '2',
      type: 'text',
      text: 'What’s up Marvie?',
      createdAt: '2025-04-09T10:28:00Z',
      user: {
        _id: 'user_1',
        name: 'User',
        avatar: 'https://example.com/user-avatar.png',
      },
    },
  },
  {
    _id: '4',
    type: 'text',
    text: 'I wish I could join you guys for a night out!',
    createdAt: '2025-04-09T10:28:00Z',
    user: {
      _id: 'user_1',
      name: 'User',
      avatar: 'https://example.com/user-avatar.png',
    },
    reaction: [],
  },
  {
    _id: '5',
    type: 'text',
    text: 'Sounds like a fun time.',
    createdAt: '2025-04-09T10:28:00Z',
    user: {
      _id: 'user_1',
      name: 'User',
      avatar: 'https://example.com/user-avatar.png',
    },
    reaction: ['😢', '😡'],
  },
  {
    _id: '6',
    type: 'text',
    text: 'Alright, meet us at the Hoesik Bar, 9pm! See ya!',
    createdAt: '2025-04-10T10:28:00Z',
    user: {
      _id: 'user_2',
      name: 'User2',
      avatar: 'https://example.com/doctor-avatar.png',
    },
    reaction: [],
  },
  {
    _id: '7',
    type: 'text',
    text: 'See yah guys!',
    createdAt: '2025-04-10T10:28:00Z',
    user: {
      _id: 'user_1',
      name: 'User',
      avatar: 'https://example.com/user-avatar.png',
    },
    reaction: [],
  },
];
