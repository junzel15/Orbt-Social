import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearWrapperContainer from '../../../components/wrapper/LinearWrapperContainer';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import {colors} from '../../../constants/colors';
import commonStyles from '../../../constants/commonStyles';
import {fonts} from '../../../constants/fonts';
import {getScaledFontSize} from '../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';
import {SettingsIcon} from '../../../constants/iconPath';
import {navigationStrings} from '../../../navigation/navigationStrings';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../../../redux/slices/authState';
import CustomHeader from '../../../components/header/CustomHeader';

const Settings = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch=useDispatch()

  const [isEnabled, setIsEnabled] = useState(true);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  const onGoEditProfile = () => {
    navigation.navigate(navigationStrings.EditProfile);
  };
  const onBlockedPress = () => {
    navigation.navigate('Blocked');
  };
  const onChangePasswordPress = () => {
    navigation.navigate('ChangePassword');
  };

  const onLogout=()=>{
    dispatch(setAccessToken(""))
  }
  return (
    <WrapperContainer>
      <LinearWrapperContainer>
        <View style={commonStyles.flexFull}>
          <CustomHeader title="Settings" />
          <View style={commonStyles.fullInnerContainer}>
            <TouchableOpacity style={styles.row} onPress={onGoEditProfile}>
              <Image source={SettingsIcon.profileIcon} style={styles.icon} />
              <Text style={styles.label}>Edit Profile</Text>
              <Icon name="chevron-right" size={22} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.row} onPress={onBlockedPress}>
              <Image source={SettingsIcon.blockedIcon} style={styles.icon} />
              <Text style={styles.label}>Blocked</Text>
              <Icon name="chevron-right" size={22} color="#000" />
            </TouchableOpacity>

            <View style={styles.row}>
              <Image
                source={SettingsIcon.notificationIcon}
                style={styles.icon}
              />
              <Text style={styles.label}>Notifications</Text>
              <TouchableOpacity onPress={toggleSwitch}>
                <Image
                  source={
                    isEnabled
                      ? SettingsIcon.truetoggle
                      : SettingsIcon.falsetoggle
                  }
                  style={styles.toggle}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.row}
              onPress={onChangePasswordPress}>
              <Image source={SettingsIcon.passwordIcon} style={styles.icon} />
              <Text style={styles.label}>Change Password</Text>
              <Icon name="chevron-right" size={22} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.row}>
              <Image source={SettingsIcon.paymentsIcon} style={styles.icon} />
              <Text style={styles.label}>Payments</Text>
              <Icon name="chevron-right" size={22} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.row}>
              <Image source={SettingsIcon.languageIcon} style={styles.icon} />
              <Text style={styles.label}>Language</Text>
              <Text style={styles.subtitle}>English (US)</Text>
              <Icon name="chevron-right" size={22} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.row}>
              <Image source={SettingsIcon.security} style={styles.icon} />
              <Text style={styles.label}>Account & Security</Text>
              <Icon name="chevron-right" size={22} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.row}>
              <Image source={SettingsIcon.helpIcon} style={styles.icon} />
              <Text style={styles.label}>Help Centre</Text>
              <Icon name="chevron-right" size={22} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.row}>
              <Image source={SettingsIcon.rateIcon} style={styles.icon} />
              <Text style={styles.label}>Rate Us</Text>
              <Icon name="chevron-right" size={22} color="#000" />
            </TouchableOpacity>
            <View></View>

            <TouchableOpacity>{/* <CustomImage url={} /> */}</TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutRow} onPress={onLogout}>
            <Icon name="log-out" size={20} color="red" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </LinearWrapperContainer>
    </WrapperContainer>
  );
};

export default Settings;

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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 0.5,
    borderColor: colors.borderColor,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.fontSemiBold,
  },
  subtitle: {
    color: 'gray',
    fontSize: 14,
    marginRight: 8,
    fontFamily: fonts.fontSemiBold,
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: globalStyleDefinitions.screenPadding.padding,
  },
  logoutText: {
    marginLeft: globalStyleDefinitions.mt_10.marginTop,
    color: colors.red,
    fontSize: 16,
    fontFamily: fonts.fontSemiBold,
  },
  toggle: {
    width: 50,
    height: 30,
    resizeMode: 'contain',
  },
});
