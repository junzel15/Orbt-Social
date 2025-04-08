import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CommonButton from '../../../components/atoms/button/CommonButton';
import CustomImage from '../../../components/atoms/image/CustomImage';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import { colors } from '../../../constants/colors';
import commonStyles from '../../../constants/commonStyles';
import { fonts } from '../../../constants/fonts';
import { getScaledFontSize } from '../../../constants/globalFunctions';
import { globalStyleDefinitions } from '../../../constants/globalStyleDefinitions';
import { iconPath } from '../../../constants/iconPath';
import { imagePath } from '../../../constants/imagePath';
import DateSelectionList from './components/DateSelectionList';
import ExpandableCard from './components/ExpandableCard';
import { navigationStrings } from '../../../navigation/navigationStrings';
import DiningOptions from './components/DiningOptions';

const Bars = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const [selected, setSelected] = useState<string>('Coffee');
  const [selectedDate, setSelectedDate] = useState<string>('');

  const onBackPress = () => {
    navigation.goBack();
  };

  const searchCrew = () => {
    navigation.navigate(navigationStrings.MatchingCrew);
  }

  const onSelect = (itemlable: any) => {
    setSelected(itemlable);
    setSelectedDate('');
  }

  return (
    <WrapperContainer>
      <ImageBackground
        source={imagePath.linearBackground}
        style={commonStyles.fullInnerContainer}>
        <ScrollView style={commonStyles.flexFull} showsVerticalScrollIndicator={false} nestedScrollEnabled>
          <View style={styles.rowWrapper}>
            <CustomImage url={imagePath.dining} height={44} width={44} />
            <Text style={styles.headerTitle}>Bars</Text>
            <TouchableOpacity activeOpacity={0.9} onPress={onBackPress}>
              <CustomImage url={iconPath.close} height={44} width={44} />
            </TouchableOpacity>
          </View>
          <DiningOptions selected={selected} onSelect={onSelect} />
          <DateSelectionList
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
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
              group—will be revealed{'  '}
              <Text style={styles.highlightText}>1 day</Text> before.
            </Text>
          </ImageBackground>
        </ScrollView>
        <CommonButton
          title="Book Now"
          customStyles={styles.buttonContainer}
          disable={!selectedDate?.trim()}
          onPress={searchCrew}
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
  listWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: globalStyleDefinitions.gap.gap,
    marginTop: 2 * globalStyleDefinitions.mt_15.marginTop,
  },
  listContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
  },
  selectedItem: {
    backgroundColor: colors.white,
  },
  listText: {
    color: colors.white,
    fontFamily: fonts.fontSemiBold,
    fontSize: getScaledFontSize(14),
  },
  selectedText: {
    color: colors.black,
  },
  dropdownWrapper: {
    height: 50,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
    paddingHorizontal: globalStyleDefinitions.cardInnerPadding.padding,
  },
  dropdownPlaceholder: {
    color: colors.white,
    fontFamily: fonts.fontRegular,
    fontSize: getScaledFontSize(14),
  },
  dropdownText: {
    color: colors.white,
    fontFamily: fonts.fontSemiBold,
    fontSize: getScaledFontSize(14),
  },
  dropdownContainer: {
    backgroundColor: colors.primary,
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
  },

  buttonContainer: {
    marginBottom: globalStyleDefinitions.mt_15.marginTop,
  },
  eventWrapper: {
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
    marginTop: 2 * globalStyleDefinitions.mt_15.marginTop,
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

export default Bars;
