import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomHeader from '../../../components/header/CustomHeader';
import LinearWrapperContainer from '../../../components/wrapper/LinearWrapperContainer';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import {colors} from '../../../constants/colors';
import commonStyles from '../../../constants/commonStyles';
import {fonts} from '../../../constants/fonts';
import {getScaledFontSize} from '../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';
import {navigationStrings} from '../../../navigation/navigationStrings';
import {useSelector} from 'react-redux';
import {selectUserUuid} from '../../../redux/slices/userSetupSlice';
import axios from 'axios';

const Profile = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const uuid = useSelector(selectUserUuid);
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    if (!uuid) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `https://du3kce1sli.execute-api.us-east-1.amazonaws.com/default/profile/${uuid}`,
        );
        setProfile(res.data);
      } catch (err: any) {
        console.error('❌ Failed to fetch profile:', err.message);
      }
    };

    fetchProfile();
  }, [uuid]);

  const onMenuPress = () => {
    navigation.navigate(navigationStrings.Settings);
  };

  return (
    <WrapperContainer>
      <LinearWrapperContainer>
        <View style={commonStyles.flexFull}>
          <CustomHeader
            title="My Profile"
            isMenuVisible
            onMenuPress={onMenuPress}
          />
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.profileCircle}>
              <Text style={styles.profileInitial}>
                {profile.name ? profile.name.charAt(0) : 'U'}
              </Text>
            </View>

            <Text style={styles.name}>{profile.name || 'Unknown User'}</Text>
            <Text style={styles.location}>
              {profile.location || 'Unknown Location'}
            </Text>

            <Text style={styles.sectionTitle}>My Bio</Text>
            <Text style={styles.bioText}>
              {profile.bio || 'No bio provided.'}
            </Text>

            <Text style={styles.sectionTitle}>My Interests</Text>
            <View style={styles.interestsContainer}>
              {(profile.interests || []).map((item: string, index: number) => (
                <View
                  key={index}
                  style={[
                    styles.tag,
                    {backgroundColor: tagColors[index % tagColors.length]},
                  ]}>
                  <Text style={styles.tagText}>{item}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </LinearWrapperContainer>
    </WrapperContainer>
  );
};

const tagColors = [
  '#C4CFFF',
  '#FF9A9A',
  '#FFC38F',
  '#D4A3FF',
  '#A4F4B9',
  '#A9E1FF',
];

const styles = StyleSheet.create({
  scrollContent: {
    padding: globalStyleDefinitions.screenPadding.padding,
  },
  profileCircle: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: colors.lighGrey,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: globalStyleDefinitions.mt_15.marginTop,
    alignSelf: 'center',
  },
  profileInitial: {
    fontSize: getScaledFontSize(80),
    color: colors.white,
    fontFamily: fonts.fontBold,
  },
  name: {
    fontSize: getScaledFontSize(18),
    fontFamily: fonts.fontSemiBold,
    color: colors.black,
    textAlign: 'center',
  },
  location: {
    fontSize: getScaledFontSize(14),
    fontFamily: fonts.fontMedium,
    color: colors.lighGrey,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  statsText: {
    fontSize: getScaledFontSize(18),
    fontFamily: fonts.fontSemiBold,
    color: colors.black,
    textAlign: 'center',
  },
  statsLabel: {
    fontSize: getScaledFontSize(14),
    fontFamily: fonts.fontMedium,
    color: colors.lighGrey,
  },
  sectionTitle: {
    fontSize: getScaledFontSize(18),
    fontFamily: fonts.soraSemiBold,
    color: colors.black,
    alignSelf: 'flex-start',
    marginTop: 2 * globalStyleDefinitions.mb_10.marginBottom,
  },
  bioText: {
    fontSize: getScaledFontSize(14),
    fontFamily: fonts.fontSemiBold,
    color: colors.black,
    marginTop: globalStyleDefinitions.mt_8.marginTop,
    lineHeight: 20,
    textAlign: 'justify',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: globalStyleDefinitions.mr_10.marginRight,
  },
  tag: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  tagText: {
    color: colors.white,
    fontFamily: fonts.fontMedium,
    fontSize: 14,
  },
});

export default Profile;
