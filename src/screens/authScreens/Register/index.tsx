import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import CheckBox from '../../../components/atoms/button/CheckBox';
import CommonButton from '../../../components/atoms/button/CommonButton';
import SocialButton from '../../../components/atoms/button/SocialButton';
import CustomImage from '../../../components/atoms/image/CustomImage';
import CustomInput from '../../../components/atoms/input/CustomInput';
import PhoneInput from '../../../components/atoms/input/PhoneInput';
import FullScreenLoader from '../../../components/atoms/loader/FullScreenLoader';
import CountrycodeModal from '../../../components/modal/CountrycodeModal';
import LinearWrapperContainer from '../../../components/wrapper/LinearWrapperContainer';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import {colors} from '../../../constants/colors';
import commonStyles from '../../../constants/commonStyles';
import {fonts} from '../../../constants/fonts';
import {getScaledFontSize} from '../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';
import {iconPath} from '../../../constants/iconPath';
import {imagePath} from '../../../constants/imagePath';
import {navigationStrings} from '../../../navigation/navigationStrings';
import { setAccessToken } from '../../../redux/slices/authState';

const Register = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [countryCode, setCountryCode] = useState<any>({
    flag: '🇵🇭',
    code: '+63',
  });
  const [showCountryPicker, setShowCountryPicker] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [disable, setDisable] = useState<boolean>(false);
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    validationHandler();
  }, [name, email, phone, password, isAgree]);

  const validationHandler = () => {
    if (
      name?.trim() &&
      email?.trim() &&
      password?.trim() &&
      phone?.trim() &&
      isAgree
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  const handleRegister = async () => {
    navigation.navigate(navigationStrings.PhoneVerify, {
      phone: countryCode?.code + phone,
    });
  };

  const handleLogin = async () => {
    dispatch(setAccessToken("accessToken"))
  };

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

  const onAgreeToggle = () => {
    setIsAgree(!isAgree);
  };

  return (
    <WrapperContainer>
      <LinearWrapperContainer>
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets
          keyboardShouldPersistTaps="handled"
          style={commonStyles.fullInnerContainer}>
          <CustomImage
            url={imagePath.appLogo}
            tintColor={colors.primary}
            height={45}
            width={120}
            imageStyle={styles.image}
          />
          <Text style={styles.headerText}>Create an Account</Text>
          <Text style={styles.headerSubText}>
            Fill your information below or register with your social account.
          </Text>
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
          <View style={styles.rowWrapper}>
            <CheckBox checked={isAgree} onPress={onAgreeToggle} />
            <Text style={styles.subText}>
              Agree with <Text style={styles.linkText}>Terms & Condition</Text>
            </Text>
          </View>
          <CommonButton
            title="Register"
            onPress={handleRegister}
            disable={disable}
          />
          <View style={styles.sepratorWrapper}>
            <View style={styles.seprator} />
            <Text style={styles.continueWithText}>Or continue with</Text>
          </View>
          <View style={[styles.rowWrapper, {marginTop: 0}]}>
            <SocialButton iconPath={iconPath.google} />
            <SocialButton iconPath={iconPath.facebook} />
          </View>
          <Text style={styles.loginTitleText}>
            Already have account?{'  '}
            <Text
              style={styles.loginText}
              suppressHighlighting
              onPress={handleLogin}>
              Log in
            </Text>
          </Text>
        </ScrollView>
        <CountrycodeModal
          visible={showCountryPicker}
          onClose={onCountryModalClose}
          onSelect={onSelect}
        />
        {isLoading && <FullScreenLoader />}
      </LinearWrapperContainer>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    marginTop: 2 * globalStyleDefinitions.screenPadding.padding,
  },
  headerText: {
    fontSize: getScaledFontSize(24),
    color: colors.black,
    fontFamily: fonts.soraSemiBold,
    textAlign: 'center',
    marginTop: globalStyleDefinitions.mt_15.marginTop,
  },
  headerSubText: {
    fontSize: getScaledFontSize(14),
    color: colors.primaryText,
    fontFamily: fonts.fontRegular,
    textAlign: 'center',
    marginTop: 0.5 * globalStyleDefinitions.mt_15.marginTop,
    marginBottom: globalStyleDefinitions.mt_15.marginTop,
  },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: globalStyleDefinitions.gap.gap,
    marginTop: globalStyleDefinitions.mt_15.marginTop,
  },
  subText: {
    fontFamily: fonts.fontRegular,
    fontSize: getScaledFontSize(12),
    color: colors.secondaryText,
  },
  linkText: {
    fontFamily: fonts.fontMedium,
    fontSize: getScaledFontSize(12),
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  sepratorWrapper: {
    marginVertical: 2 * globalStyleDefinitions.screenPadding.padding,
  },
  seprator: {
    height: 1,
    width: '100%',
    backgroundColor: colors.disable,
  },
  continueWithText: {
    fontSize: getScaledFontSize(14),
    fontFamily: fonts.fontRegular,
    color: colors.secondaryText,
    position: 'absolute',
    bottom: getScaledFontSize(-8),
    alignSelf: 'center',
    paddingHorizontal: globalStyleDefinitions.cardInnerPadding.padding,
    backgroundColor: colors.white,
  },
  loginTitleText: {
    fontFamily: fonts.fontRegular,
    fontSize: getScaledFontSize(14),
    color: colors.secondaryText,
    textAlign: 'center',
    marginTop: globalStyleDefinitions.mt_15.marginTop,
  },
  loginText: {
    fontFamily: fonts.fontBold,
    fontSize: getScaledFontSize(14),
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});

export default Register;
