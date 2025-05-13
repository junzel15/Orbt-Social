import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonHeader from '../../../../components/header/CommonHeader';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {getScaledFontSize} from '../../../../constants/globalFunctions';
import {colors} from '../../../../constants/colors';
import {fonts} from '../../../../constants/fonts';
import {globalStyleDefinitions} from '../../../../constants/globalStyleDefinitions';
import {imagePath} from '../../../../constants/imagePath';
import TimerComponent from '../components/TimerComponent';
import CommonButton from '../../../../components/atoms/button/CommonButton';
import {windowHeight, windowWidth} from '../../../../constants/globalConstants';
import PricePeopleComponent from '../components/PricePeopleComponent';
import {useSelector} from 'react-redux';
import {selectUserUuid} from '../../../../redux/slices/userSetupSlice';
import axios from 'axios';
import {navigationStrings} from '../../../../navigation/navigationStrings';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const ExperienceDetails = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const uuid = useSelector(selectUserUuid);
  const [groupData, setGroupData] = useState<any>(null);

  useEffect(() => {
    if (!uuid) return;

    const fetchGroupDetails = async () => {
      try {
        const res = await axios.get(
          'https://oo2a9lev9d.execute-api.us-east-1.amazonaws.com/default/group',
          {
            params: {uuid},
          },
        );
        setGroupData(res.data);
      } catch (err: any) {
        console.error('❌ Failed to fetch group data:', err);
      }
    };

    fetchGroupDetails();
  }, [uuid]);

  const getFullCountryName = (nationality: string): string => {
    switch (nationality) {
      case 'American':
        return 'United States of America';
      case 'Filipino':
        return 'Philippines';
      case 'British':
        return 'United Kingdom';
      default:
        return nationality;
    }
  };

  const nationalityFlagMap: Record<string, string> = {
    American: '🇺🇸',
    Filipino: '🇵🇭',
    British: '🇬🇧',
    Dutch: '🇳🇱',
    Japanese: '🇯🇵',
  };

  return (
    <LinearGradient
      colors={['#4C0BCE', '#180028', '#000000']}
      locations={[0.0, 0.5, 0.8]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.gradient}>
      <CommonHeader
        showBackIcon={true}
        headerTitle="Dinner Details"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [
              {
                name: navigationStrings.BottomNavigation,
                state: {
                  routes: [{name: navigationStrings.Home}],
                },
              },
            ],
          })
        }
      />
      <ScrollView style={styles.container}>
        <View style={styles.mainCard}>
          <View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {groupData?.booking_type?.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.title}>Experience</Text>

            <View style={styles.infoRow}>
              <Icon name="calendar-outline" size={24} color="#fff" />
              <Text style={styles.infoText}>
                {groupData?.booking_date}
                {'\n'}
                {groupData?.booking_time}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Icon name="location-outline" size={24} color="#fff" />
              <Text
                style={[styles.infoText, {textDecorationLine: 'underline'}]}>
                {groupData?.venue}
              </Text>
            </View>

            <View style={[styles.infoRow, {marginTop: 10}]}>
              <Icon name="heart-outline" size={24} color="#fff" />
              <View>
                <Text style={styles.infoText}>Hosted By:</Text>
                <Text
                  style={[styles.infoText, {textDecorationLine: 'underline'}]}>
                  {groupData?.host || 'Unknown'}
                </Text>
              </View>
            </View>
          </View>

          <Image source={imagePath.experienceImage} style={styles.cupImage} />
        </View>

        <View style={{marginTop: 10}}>
          <Text style={{color: colors.white}}>Overview:</Text>
          <Text style={styles.whiteText}>
            {groupData?.overview ||
              'Get ready to roll! In this FREE Pasta Perfection Workshop, Chef Lila Mancini will guide you through the art of crafting fresh, handmade pasta. You’ll learn pro tips, try your hand at shaping dough, and enjoy the fruits of your labor with a complimentary tasting.'}
          </Text>
        </View>

        <View style={{marginTop: 10}}>
          <Text style={{color: colors.white}}>Inclusions:</Text>
          <Text style={styles.whiteText}>
            {groupData?.inclusions ||
              'All tools and ingredients provided. Includes tasting session at the end.'}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="heart-outline" size={24} color="#fff" />
          <Text style={styles.infoText}>Common Interests: </Text>
        </View>

        <View style={styles.tags}>
          {Array.from(
            new Set((groupData?.comm_interests as string[]) || []),
          ).map((item, i) => (
            <View key={i} style={styles.tag}>
              <Text style={styles.tagText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.separator} />

        <View style={styles.langRow}>
          <View>
            <View style={styles.infoRow}>
              <Feather name="globe" size={13} color={colors.white} />
              <Text style={[styles.subLabel, {marginLeft: 10}]}>
                Nationality:
              </Text>
            </View>
            {(groupData?.nationalities || []).map(
              (nation: string, i: number) => (
                <View
                  key={i}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 4,
                  }}>
                  <Text style={{marginRight: 6}}>
                    {nationalityFlagMap[nation] || '🏳️'}
                  </Text>
                  <Text style={styles.whiteText}>
                    {getFullCountryName(nation)}
                  </Text>
                </View>
              ),
            )}
          </View>
          <View>
            <Text style={styles.subLabel}>Language:</Text>
            <Text style={styles.whiteText}>English, Filipino</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View>
          <Text style={styles.sectionLabel}>Zodiac Signs:</Text>
          <Text style={styles.zodiac}>
            ♈ Aries ♉ Taurus ♊ Gemini ♋ Cancer
          </Text>
        </View>

        <View style={styles.separator} />
        <TimerComponent />
        <PricePeopleComponent showPrice={true} />

        <View style={styles.buttonRow}>
          <CommonButton
            title="Cancel Event"
            // eslint-disable-next-line react-native/no-inline-styles
            customStyles={{
              width: windowWidth / 2.5,
              marginRight: 10,
              backgroundColor: colors.white,
            }}
            customTextStyles={{color: colors.black}}
          />
          <CommonButton
            title="View E-Ticket"
            customStyles={{width: windowWidth / 2.5}}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ExperienceDetails;

const styles = StyleSheet.create({
  gradient: {flex: 1},
  mainCard: {flexDirection: 'row', justifyContent: 'space-between'},
  container: {
    padding: globalStyleDefinitions.screenPadding.padding,
    flex: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderColor: colors.darkPurple,
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 8,
  },
  badgeText: {
    color: colors.white,
    fontSize: getScaledFontSize(8),
    fontFamily: fonts.fontSemiBold,
  },
  title: {
    color: colors.white,
    fontSize: getScaledFontSize(24),
    fontFamily: fonts.fontRegular,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    color: colors.white,
    marginLeft: 10,
    fontSize: getScaledFontSize(14),
  },
  cupImage: {
    width: 120,
    height: 155,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.white,
    marginRight: 4,
  },
  tagText: {
    color: colors.white,
    fontSize: getScaledFontSize(10),
  },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  subLabel: {
    color: colors.white,
    fontSize: getScaledFontSize(14),
    marginBottom: 4,
  },
  whiteText: {
    color: colors.white,
    fontSize: getScaledFontSize(12),
    marginTop: 4,
  },
  sectionLabel: {
    color: colors.white,
    marginTop: 20,
    marginBottom: 10,
    fontFamily: fonts.fontMedium,
    fontSize: getScaledFontSize(14),
  },
  zodiac: {
    fontFamily: fonts.fontRegular,
    color: colors.white,
    fontSize: getScaledFontSize(12),
    marginBottom: 20,
  },
  separator: {
    borderTopWidth: 0.5,
    borderColor: colors.white,
    marginTop: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: windowHeight * 0.1,
    marginTop: 10,
  },
});
