import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import CommonButton from '../../../components/atoms/button/CommonButton';
import CustomImage from '../../../components/atoms/image/CustomImage';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import {colors} from '../../../constants/colors';
import commonStyles from '../../../constants/commonStyles';
import {fonts} from '../../../constants/fonts';
import {getScaledFontSize} from '../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';
import {iconPath} from '../../../constants/iconPath';
import {imagePath} from '../../../constants/imagePath';
import DateSelectionList from './components/DateSelectionList';
import ExpandableCard from './components/ExpandableCard';
import {navigationStrings} from '../../../navigation/navigationStrings';
import axios from 'axios';
import {selectAccessToken} from '../../../redux/slices/authState';
import {selectUserUuid} from '../../../redux/slices/userSetupSlice';

const Experiences = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const accessToken = useSelector(selectAccessToken);
  const uuid = useSelector(selectUserUuid);

  const onBackPress = () => {
    navigation.goBack();
  };

  const handlebooking = async () => {
    try {
      const payload = {
        booking_date: selectedDate,
        booking_time: selectedTime,
        location: 'Boston',
        booking_type: 'Experiences',
        uuid,
      };

      const res = await axios.post(
        'https://v71rq9c35d.execute-api.us-east-1.amazonaws.com/default/booking',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.status === 201) {
        navigation.navigate(navigationStrings.MatchingCrew, {});
      } else {
        console.error('❌ Booking failed:', res.status, res.data);
      }
    } catch (err: any) {
      console.error('🚨 Axios error posting booking:', err.message);
      if (err.response) {
        console.log('📛 Error response status:', err.response.status);
        console.log('📛 Error response data:', err.response.data);
      }
    }
  };

  return (
    <WrapperContainer>
      <ImageBackground
        source={imagePath.linearBackground}
        style={commonStyles.fullInnerContainer}>
        <ScrollView
          style={commonStyles.flexFull}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled>
          <View style={styles.rowWrapper}>
            <CustomImage url={imagePath.experience} height={44} width={44} />
            <Text style={styles.headerTitle}>Experiences</Text>
            <TouchableOpacity activeOpacity={0.9} onPress={onBackPress}>
              <CustomImage url={iconPath.close} height={44} width={44} />
            </TouchableOpacity>
          </View>
          <DateSelectionList
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setSelectedTime={setSelectedTime}
          />

          <ExpandableCard
            header="BEFORE YOU BOOK"
            content={[
              {
                heading: 'Free to Reserve',
                subtext: 'You only pay for what you order at the table.',
              },
              {
                heading: 'Be Ready',
                subtext:
                  'Your group is counting on you,  so only book if you’re sure to join!',
              },
            ]}
          />
          <ExpandableCard
            header="WHAT TO EXPECT"
            content={[
              {
                heading: 'Meet Your Crew',
                subtext: '5 strangers with shared vibes and fun personalities.',
              },
              {
                heading: 'Relax & Connect',
                subtext:
                  'Great food, better conversations, and easy icebreakers.',
              },
            ]}
          />
          <ImageBackground
            source={imagePath.linearBackground}
            style={styles.eventWrapper}>
            <CustomImage url={imagePath.event} height={80} width={80} />
            <Text style={styles.subText}>
              Event details—like the restaurant, table, and hints about your
              group—will be revealed{' '}
              <Text style={styles.highlightText}>1 day</Text> before.
            </Text>
          </ImageBackground>
        </ScrollView>
        <CommonButton
          title="Book Now"
          disable={!selectedDate?.trim() || !selectedTime?.trim()}
          onPress={handlebooking}
          customStyles={styles.buttonContainer}
        />
      </ImageBackground>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: globalStyleDefinitions.gap.gap,
    marginTop: Platform.select({
      ios: 3 * globalStyleDefinitions.screenPadding.padding,
      android: 2 * globalStyleDefinitions.screenPadding.padding,
    }),
  },
  headerTitle: {
    color: colors.white,
    fontSize: getScaledFontSize(24),
    fontFamily: fonts.soraRegular,
    flex: 1,
  },
  buttonContainer: {
    marginBottom: globalStyleDefinitions.commonItemMargin.margin,
  },
  eventWrapper: {
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
    marginTop: 2 * globalStyleDefinitions.commonItemMargin.margin,
    padding: globalStyleDefinitions.cardInnerPadding.padding,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    gap: 2 * globalStyleDefinitions.gap.gap,
  },
  subText: {
    color: colors.white,
    fontSize: getScaledFontSize(12),
    lineHeight: getScaledFontSize(18),
    fontFamily: fonts.fontRegular,
    marginRight: 100,
  },
  highlightText: {
    color: colors.lightPurple,
    fontSize: getScaledFontSize(12),
    lineHeight: getScaledFontSize(18),
    fontFamily: fonts.fontBold,
  },
});

export default Experiences;
