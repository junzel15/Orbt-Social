import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute,
  } from '@react-navigation/native';
  import React, {useEffect, useState} from 'react';
  import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
  import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
  import Octicons from 'react-native-vector-icons/Octicons';
  import CommonButton from '../../../components/atoms/button/CommonButton';
  import FullScreenLoader from '../../../components/atoms/loader/FullScreenLoader';
  import LinearWrapperContainer from '../../../components/wrapper/LinearWrapperContainer';
  import WrapperContainer from '../../../components/wrapper/WrapperContainer';
  import {colors} from '../../../constants/colors';
  import commonStyles from '../../../constants/commonStyles';
  import {fonts} from '../../../constants/fonts';
  import {getScaledFontSize} from '../../../constants/globalFunctions';
  import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';
  import {navigationStrings} from '../../../navigation/navigationStrings';
  
  const VerifyScreen = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const route = useRoute<RouteProp<any>>();
  
    const {phone} = route.params || {};
  
    const [value, setValue] = useState<string>('');
    const [isDisable, setDisable] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(30);
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
  
    const ref = useBlurOnFulfill({value, cellCount: 4});
  
    useEffect(() => {
      validationHandler();
    }, [value]);
  
    useEffect(() => {
      if (timer > 0) {
        const interval = setInterval(() => {
          setTimer(prev => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
      }
    }, [timer]);
  
    const onBackPress = () => {
      navigation.goBack();
    };
  
    const validationHandler = () => {
      if (value?.trim() && value?.length == 4) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    };
  
    const onVerify = async () => {
      navigation.navigate(navigationStrings.NewPassword);
    };
  
    const handleResendCode = async () => {
      if (timer == 0) {
        setTimer(30);
      } else {
      }
    };
  
    return (
      <WrapperContainer>
        <LinearWrapperContainer>
          <Octicons
            name="arrow-left"
            color={colors.black}
            size={30}
            style={styles.backIcon}
            suppressHighlighting
            onPress={onBackPress}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={commonStyles.fullInnerContainer}>
            <Text style={styles.headerText}>Verification</Text>
            <Text style={styles.headerSubText}>
              We’ve sent you the verification code to{`\n`}
              {phone}
            </Text>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={4}
              rootStyle={styles.codeField}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <View style={styles.codeWrapper} key={index}>
                  <Text
                    style={styles.cellContainer}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
  
            <CommonButton
              title="Verify"
              customStyles={styles.btnWrapper}
              onPress={onVerify}
              disable={isDisable}
            />
            <Text style={styles.subText}>
              Re-send code in{' '}
              <Text
                style={{color: colors.primary}}
                suppressHighlighting
                onPress={handleResendCode}>
                {timer == 0 ? 'Resend' : `00:${timer < 10 ? `0${timer}` : timer}`}
              </Text>
            </Text>
          </ScrollView>
          {isLoading && <FullScreenLoader />}
        </LinearWrapperContainer>
      </WrapperContainer>
    );
  };
  
  const styles = StyleSheet.create({
    backIcon: {
      marginTop: Platform.select({
        ios: 3 * globalStyleDefinitions.screenPadding.padding,
        android: 2 * globalStyleDefinitions.screenPadding.padding,
      }),
      margin: globalStyleDefinitions.screenPadding.padding,
    },
    headerText: {
      fontSize: getScaledFontSize(20),
      color: colors.black,
      fontFamily: fonts.soraSemiBold,
    },
    headerSubText: {
      fontSize: getScaledFontSize(14),
      color: colors.primaryText,
      fontFamily: fonts.fontRegular,
      marginTop: 0.5 * globalStyleDefinitions.commonItemMargin.margin,
      marginBottom: globalStyleDefinitions.commonItemMargin.margin,
    },
    btnWrapper: {marginTop: 2 *globalStyleDefinitions.commonItemMargin.margin},
    codeField: {
      justifyContent: 'space-evenly',
      marginTop: 2 * globalStyleDefinitions.commonItemMargin.margin,
    },
    codeWrapper: {
      width: 55,
      height: 55,
      borderRadius: globalStyleDefinitions.br_10.borderRadius,
      backgroundColor: colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.borderColor,
    },
    cellContainer: {
      textAlign: 'center',
      color: colors.black,
      fontFamily: fonts.soraRegular,
      fontSize: getScaledFontSize(24),
      lineHeight: getScaledFontSize(24),
    },
    subText: {
      fontFamily: fonts.fontRegular,
      fontSize: getScaledFontSize(14),
      color: colors.secondaryText,
      textAlign: 'center',
      marginTop: 1.5 * globalStyleDefinitions.commonItemMargin.margin,
    },
  });
  
  export default VerifyScreen;
  