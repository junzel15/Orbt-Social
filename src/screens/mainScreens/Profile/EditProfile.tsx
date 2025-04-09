import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomInput from '../../../components/atoms/input/CustomInput';
import PhoneInput from '../../../components/atoms/input/PhoneInput';
import ProfileHeader from '../../../components/header/ProfileHeader';
import CountrycodeModal from '../../../components/modal/CountrycodeModal';
import LinearWrapperContainer from '../../../components/wrapper/LinearWrapperContainer';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import {colors} from '../../../constants/colors';
import commonStyles from '../../../constants/commonStyles';
import {fonts} from '../../../constants/fonts';
import {getScaledFontSize} from '../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';
import {iconPath} from '../../../constants/iconPath';
import {navigationStrings} from '../../../navigation/navigationStrings';
import DOBBottomSheet, {DOBBottomSheetRef} from './components/DateBrithSelect';
import GenderPicker from './components/GenderPicker';
import ProfilePicturePicker from './components/ProfilePicturePicker';

const EditProfile = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [showCountryPicker, setShowCountryPicker] = useState<boolean>(false);
  const [dob, setDob] = useState<Date>(new Date());
  const dobRef = useRef<DOBBottomSheetRef>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState<any>({
    flag: '🇵🇭',
    code: '+63',
  });
  const onCountryCodePress = () => {
    setShowCountryPicker(true);
  };

  const onCountryModalClose = () => {
    setShowCountryPicker(false);
  };

  const onSelect = (code: any) => {
    setCountryCode(code);
    setShowCountryPicker(false);
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  const onGoSetting = () => {
    navigation.navigate(navigationStrings.Settings);
  };

  return (
    <WrapperContainer>
      <LinearWrapperContainer>
        <View style={commonStyles.flexFull}>
          <ProfileHeader title="My Profile" />
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <ProfilePicturePicker
              profilePic={profilePic}
              setProfilePic={setProfilePic}
            />
            <CustomInput
              onChangeText={setName}
              value={name}
              placeholder="Full Name"
              icon={iconPath.person}
            />
            <CustomInput
              onChangeText={setEmail}
              value={email}
              placeholder="Email Address"
              icon={iconPath.email}
            />
            <CustomInput
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              secureTextEntry
              icon={iconPath.password}
            />
            <PhoneInput
              onChangeText={setPhone}
              value={phone}
              countryCode={countryCode}
              onCountryCodePress={onCountryCodePress}
            />
            <GenderPicker />
            <DOBBottomSheet ref={dobRef} date={dob} setDate={setDob} />
            <Text style={styles.sectionTitle}>My Bio</Text>
            <View style={styles.boxTxt}>
              <Text style={styles.bioText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad sit amet.
              </Text>
            </View>
            <CountrycodeModal
              visible={showCountryPicker}
              onClose={onCountryModalClose}
              onSelect={onSelect}
            />
          </ScrollView>
        </View>
      </LinearWrapperContainer>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: globalStyleDefinitions.gap.gap,
    marginTop: Platform.select({
      ios: 2 * globalStyleDefinitions.screenPadding.padding,
      android: 2 * globalStyleDefinitions.screenPadding.padding,
    }),
    backgroundColor: colors.white,
    borderBottomLeftRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
    borderBottomRightRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
    overflow: 'hidden',
    height: 60,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 4,
  },
  headerTitle: {
    color: colors.black,
    fontSize: getScaledFontSize(22),
    fontFamily: fonts.fontSemiBold,
    marginLeft: globalStyleDefinitions.mr_10.marginRight,
  },
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
  boxTxt: {
    borderWidth: 1,
    borderColor: colors.lighGrey,
    width: '100%',
    borderRadius: 10,
    padding: 10,
    marginTop: globalStyleDefinitions.mt_10.marginTop,
  },
});

export default EditProfile;
