import {View, Text, StyleSheet, Image, ScrollView, Alert} from 'react-native';
import axios from 'axios';
import {useEffect, useState} from 'react';
import React from 'react';
import CommonHeader from '../../../../components/header/CommonHeader';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {getScaledFontSize} from '../../../../constants/globalFunctions';
import {colors} from '../../../../constants/colors';
import {fonts} from '../../../../constants/fonts';
import {globalStyleDefinitions} from '../../../../constants/globalStyleDefinitions';
import {imagePath} from '../../../../constants/imagePath';
import CommonButton from '../../../../components/atoms/button/CommonButton';
import {windowHeight, windowWidth} from '../../../../constants/globalConstants';
import PricePeopleComponent from '../components/PricePeopleComponent';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {navigationStrings} from '../../../../navigation/navigationStrings';
import {useSelector} from 'react-redux';
import {selectUserUuid} from '../../../../redux/slices/userSetupSlice';

const DiningDetails = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();
  const uuid = useSelector(selectUserUuid);
  const [groupData, setGroupData] = useState<any>(null);
  const [showLeaveReview, setShowLeaveReview] = useState(false);
  const bookingTypeParam = route.params?.bookingType || '';

  useEffect(() => {
    if (!uuid) return;

    const fetchGroupDetails = async () => {
      try {
        const res = await axios.get(
          'https://6ioybfgs6g.execute-api.us-east-1.amazonaws.com/default/group',
          {
            params: {uuid, booking_type: bookingTypeParam},
          },
        );

        const allGroups = Array.isArray(res.data) ? res.data : [res.data];
        const matched = allGroups.find(
          group =>
            group.booking_type?.toLowerCase() ===
            bookingTypeParam.toLowerCase(),
        );
        setGroupData(matched || allGroups[0]);
      } catch (err: any) {
        console.error('❌ Failed to fetch group data:', err);
      }
    };

    fetchGroupDetails();
  }, [uuid, bookingTypeParam]);

  const getBookingImage = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'coffee':
        return imagePath.coffeeImage;
      case 'brunch':
        return imagePath.brunchImage;
      case 'dinner':
        return imagePath.dinerImage;
      default:
        return imagePath.dining;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLeaveReview(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const nationalityFlagMap: Record<string, string> = {
    American: '🇺🇸',
    Filipino: '🇵🇭',
    British: '🇬🇧',
    Dutch: '🇳🇱',
    Japanese: '🇯🇵',
  };

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

  const bookingType = groupData?.booking_type || bookingTypeParam;

  return (
    <LinearGradient
      colors={['#4C0BCE', '#180028', '#000000']}
      locations={[0.0, 0.5, 0.8]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.gradient}>
      <CommonHeader
        showBackIcon={true}
        headerTitle="Dining Details"
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
            <Text style={styles.title}>{groupData?.booking_type}</Text>
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
              <Text style={styles.infoText}>{groupData?.venue}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="document-text-outline" size={24} color="#fff" />
              <Text style={styles.infoText}>About the group:</Text>
            </View>
            <Text style={[styles.infoText, {marginLeft: 34}]}>
              {groupData?.summary}
            </Text>
          </View>
          <Image
            source={getBookingImage(bookingType)}
            style={styles.cupImage}
          />
        </View>

        <View style={styles.infoRow}>
          <Icon name="heart-outline" size={24} color="#fff" />
          <Text style={styles.infoText}>Common Interests: </Text>
        </View>
        <View style={styles.tags}>
          {(groupData?.comm_interests || []).map((item: string, i: number) => (
            <View key={i} style={styles.tag}>
              <Text style={styles.tagText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.separator} />
        <View style={styles.langRow}>
          <View>
            <View style={styles.infoRow}>
              <Feather name="globe" size={13} color="#fff" />
              <Text style={[styles.subLabel, {marginLeft: 10}]}>
                Nationality:
              </Text>
            </View>
            {(groupData?.nationalities || []).map(
              (nation: string, i: number) => (
                <View key={i} style={styles.nationRow}>
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
        <PricePeopleComponent />

        <View style={styles.buttonRow}>
          {!showLeaveReview ? (
            <>
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
                title="Confirm"
                customStyles={{width: windowWidth / 2.5}}
              />
            </>
          ) : (
            <CommonButton
              title="Leave a Review"
              onPress={() => {
                const group_id = groupData?.group_id;
                if (group_id) {
                  navigation.navigate(navigationStrings.GiveFeedback, {
                    group_id,
                  });
                } else {
                  Alert.alert('❌ Error', 'Group ID is missing');
                }
              }}
              customStyles={{width: windowWidth - 40}}
            />
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default DiningDetails;

const styles = StyleSheet.create({
  gradient: {flex: 1},
  container: {
    padding: globalStyleDefinitions.screenPadding.padding,
    flex: 1,
  },
  mainCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.white,
    fontSize: getScaledFontSize(24),
    fontFamily: fonts.fontSemiBold,
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
    gap: 8,
    marginTop: 10,
  },
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.white,
    marginRight: 6,
  },
  tagText: {
    color: colors.white,
    fontSize: getScaledFontSize(10),
  },
  separator: {
    borderTopWidth: 0.5,
    borderColor: colors.white,
    marginTop: 15,
  },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  nationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  whiteText: {
    color: colors.white,
    fontSize: getScaledFontSize(12),
    marginTop: 4,
  },
  subLabel: {
    color: colors.white,
    fontSize: getScaledFontSize(14),
    marginBottom: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: windowHeight * 0.1,
  },
});
