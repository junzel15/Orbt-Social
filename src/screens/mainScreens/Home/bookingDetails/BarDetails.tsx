import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonHeader from '../../../../components/header/CommonHeader';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
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

const BarDetails = () => {
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

  return (
    <LinearGradient
      colors={['#4C0BCE', '#180028', '#000000']}
      locations={[0.0, 0.5, 0.8]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.gradient}>
      <CommonHeader showBackIcon={true} headerTitle="Bar Details" />
      <ScrollView style={styles.container}>
        <View style={styles.mainCard}>
          <View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {groupData?.booking_type?.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.title}>Bars</Text>

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
          </View>

          <Image source={imagePath.barImage} style={styles.cupImage} />
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
            <Text style={styles.subLabel}>Nationality</Text>
            <Text style={styles.whiteText}>
              {(groupData?.nationalities || []).join('\n')}
            </Text>
          </View>
          <View>
            <Text style={styles.subLabel}>Language</Text>
            <Text style={styles.whiteText}>English, Filipino</Text>
          </View>
        </View>

        <View style={styles.separator} />
        <TimerComponent />
        <PricePeopleComponent />
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

export default BarDetails;

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
  },
});
