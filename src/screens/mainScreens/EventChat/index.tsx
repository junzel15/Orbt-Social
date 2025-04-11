import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {Text} from 'react-native-paper';
import {colors} from '../../../constants/colors';
import {fonts} from '../../../constants/fonts';
import {getScaledFontSize} from '../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';

import CustomHeader from '../../../components/header/CustomHeader';
import LinearWrapperContainer from '../../../components/wrapper/LinearWrapperContainer';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import RenderBubble from './components/RenderBubble';
import RenderComposer from './components/RenderComposer';

const userData = {
  _id: 'user_1',
  name: 'User',
  avatar: 'https://example.com/user-avatar.png',
};

const joinedUsers = ['John', 'Edward', 'Maxine', 'Bella'];

export const ChatData = [
  {
    _id: '1',
    type: 'custom',
    text: 'Hey Constante, did you make it to the Brunch?',
    options: ['No', "I'll be late", 'Yes'],
    selectedOption: 'Yes',
    createdAt: new Date(),
    user: {
      _id: 'user_2',
      name: 'ORBT',
      avatar: 'https://example.com/bot.png',
    },
  },
];

const EventChat = () => {
  const route = useRoute<RouteProp<any>>();
  const {item} = route.params || {};

  const [messagesList, setMessagesList] = useState<Array<any>>(
    [...ChatData].reverse(),
  );
  const [message, setMessage] = useState<string>('');

  const onSend = useCallback(() => {
    if (message?.trim().length > 0) {
      const newMessage = {
        _id: new Date(),
        type: 'text',
        text: message,
        createdAt: new Date(),
        user: userData,
      };
      setMessagesList(previousMessages =>
        GiftedChat.append(previousMessages, [newMessage]),
      );
      setMessage('');
    }
  }, [message]);

  const renderBubble = useCallback((props: any) => {
    return <RenderBubble {...props} />;
  }, []);

  const renderComposer = useCallback(
    (props: any) => (
      <RenderComposer
        {...props}
        message={message}
        setMessage={setMessage}
        onSend={onSend}
      />
    ),
    [message],
  );

  const renderMessage = (props: any) => {
    const {currentMessage} = props;
    if (currentMessage?.type === 'custom') {
      return <CustomQuestionMessage currentMessage={currentMessage} />;
    }
    return renderBubble(props);
  };

  const renderHeader = () => {
    return (
      <View>
        <Text style={styles.countdownText}>
          The countdown is over - Let the fun begin!
        </Text>

        <Text style={styles.arrivedText}>You arrived and ready to roll!</Text>

        <View style={styles.participantContainer}>
          {joinedUsers.map((name, index) => (
            <Text key={index} style={styles.participantText}>
              {name} is here!
            </Text>
          ))}
        </View>
      </View>
    );
  };

  return (
    <WrapperContainer>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <LinearWrapperContainer>
        <CustomHeader
          title={item?.name}
          profileImage={item?.profile_image}
          customStyle={styles.header}
        />
        <View style={styles.expiryContainer}>
          <Text style={styles.expiryText}>Expires: 04:10:06</Text>
        </View>
        {renderHeader()}
        <GiftedChat
          messages={messagesList}
          onSend={onSend}
          user={userData}
          scrollToBottom
          inverted
          renderAvatar={null}
          renderBubble={renderBubble}
          renderComposer={renderComposer}
          renderMessage={renderMessage}
          messagesContainerStyle={styles.messagesContainer}
        />
      </LinearWrapperContainer>
    </WrapperContainer>
  );
};

const CustomQuestionMessage = ({currentMessage}: any) => {
  const {options = [], selectedOption: defaultSelected} = currentMessage;
  const [selectedOption, setSelectedOption] = useState<string | null>(
    defaultSelected,
  );

  const handleResponse = (response: string) => {
    setSelectedOption(response);
  };

  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{currentMessage.text}</Text>
      <View style={styles.buttonRow}>
        {options.map((option: string, index: number) => {
          const isSelected = selectedOption === option;

          return (
            <TouchableOpacity
              key={index}
              style={isSelected ? styles.filledButton : styles.outlinedButton}
              onPress={() => handleResponse(option)}>
              <Text
                style={isSelected ? styles.filledText : styles.outlinedText}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
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
  expiryContainer: {
    backgroundColor: colors.disable + '18',
    paddingVertical: 5,
    alignItems: 'center',
  },
  expiryText: {
    fontSize: getScaledFontSize(12),
    fontFamily: fonts.fontSemiBold,
    color: colors.disable,
  },
  countdownText: {
    fontSize: getScaledFontSize(14),
    fontFamily: fonts.fontSemiBold,
    color: colors.primary,
    alignSelf: 'center',
    paddingVertical: globalStyleDefinitions.screenPadding.padding / 2,
  },
  arrivedText: {
    fontSize: getScaledFontSize(13),
    fontFamily: fonts.fontMedium,
    color: colors.black,
    alignSelf: 'center',
    marginTop: 5,
  },
  participantContainer: {
    alignItems: 'center',
    marginVertical: globalStyleDefinitions.commonItemMargin.margin,
  },
  participantText: {
    fontSize: getScaledFontSize(12),
    fontFamily: fonts.fontRegular,
    color: colors.disable,
    marginVertical: 5,
  },
  questionContainer: {
    backgroundColor: colors.backgroundGray,
    borderRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
    padding: globalStyleDefinitions.screenPadding.padding / 2,
    margin: globalStyleDefinitions.commonItemMargin.margin,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  questionText: {
    fontSize: getScaledFontSize(14),
    color: colors.black,
    fontFamily: fonts.fontRegular,
    marginBottom: globalStyleDefinitions.commonItemMargin.margin,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: globalStyleDefinitions.gap.gap,
    flexWrap: 'wrap',
  },
  outlinedButton: {
    borderWidth: 1,
    borderColor: colors.black,
    paddingVertical: globalStyleDefinitions.screenPadding.padding / 2,
    paddingHorizontal: globalStyleDefinitions.screenPadding.padding,
    borderRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
  },
  outlinedText: {
    fontSize: getScaledFontSize(12),
    color: colors.black,
    fontFamily: fonts.fontRegular,
  },
  filledButton: {
    backgroundColor: colors.primary,
    paddingVertical: globalStyleDefinitions.screenPadding.padding / 2,
    paddingHorizontal: globalStyleDefinitions.screenPadding.padding,
    borderRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
  },
  filledText: {
    fontSize: getScaledFontSize(12),
    color: colors.white,
    fontFamily: fonts.fontRegular,
  },
});

export default EventChat;
