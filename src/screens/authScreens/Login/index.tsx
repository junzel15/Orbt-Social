import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import CommonButton from '../../../components/atoms/button/CommonButton';
import SocialButton from '../../../components/atoms/button/SocialButton';
import CustomImage from '../../../components/atoms/image/CustomImage';
import CustomInput from '../../../components/atoms/input/CustomInput';
import LinearWrapperContainer from '../../../components/wrapper/LinearWrapperContainer';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import { colors } from '../../../constants/colors';
import commonStyles from '../../../constants/commonStyles';
import { fonts } from '../../../constants/fonts';
import { getScaledFontSize } from '../../../constants/globalFunctions';
import { globalStyleDefinitions } from '../../../constants/globalStyleDefinitions';
import { iconPath } from '../../../constants/iconPath';
import { imagePath } from '../../../constants/imagePath';
import { navigationStrings } from '../../../navigation/navigationStrings';
import { setAccessToken } from '../../../redux/slices/authState';
import { windowWidth } from '../../../constants/globalConstants';

const Login = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false);

    const handleLogin = async () => {
        if (password == '1234') {
            setIsPasswordInvalid(true)
        }
        else {
            dispatch(setAccessToken("accessToken"))
        }
    };

    const handleForget = () => {
        navigation.navigate(navigationStrings.ForgetPassword)
    }

    const handleRegister = () => {
        navigation.navigate(navigationStrings.Register)
    }

    return (
        <WrapperContainer>
            <LinearWrapperContainer>
                <View style={commonStyles.fullInnerContainer}  >
                    <View style={styles.topView} >
                        <CustomImage
                            url={imagePath.appLogo}
                            tintColor={colors.primary}
                            height={45}
                            width={120}
                            imageStyle={styles.image}
                        />
                        <Text style={styles.headerText}>Welcome Back</Text>
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
                            isError={isPasswordInvalid}
                        />
                        {isPasswordInvalid && (
                            <View style={{ flexDirection: 'row', width: windowWidth }}  >
                                <Image source={imagePath.invalidIcon} style={{ width: 24, height: 24 }} />
                                <Text style={styles.errorText}>Invalid password</Text>
                            </View>
                        )}
                        <CommonButton
                            title="Login"
                            onPress={handleLogin}
                            customStyles={{ marginTop: globalStyleDefinitions.cardInnerPadding.padding }}
                        />
                        <Text style={styles.loginTitleText}>
                            Forgot your password? {'  '}
                            <Text
                                style={styles.loginText}
                                suppressHighlighting
                                onPress={handleForget}>
                                Reset password
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.bottomView} >
                        <View style={styles.sepratorWrapper}>
                            <View style={styles.seprator} />
                            <Text style={styles.continueWithText}>Or continue with</Text>
                        </View>
                        <View style={[styles.rowWrapper, { marginTop: 0 }]}>
                            <SocialButton iconPath={iconPath.google} />
                            <SocialButton iconPath={iconPath.facebook} />
                        </View>
                        <Text style={styles.loginTitleText}>
                            Don't have an account?{'  '}
                            <Text
                                style={styles.loginText}
                                suppressHighlighting
                                onPress={handleRegister}>
                                Sign up
                            </Text>
                        </Text>
                    </View>
                </View>
            </LinearWrapperContainer>
        </WrapperContainer>
    );
};

const styles = StyleSheet.create({
    topView: {
        flex: 1,
        marginTop: 4 * globalStyleDefinitions.br_10.borderRadius
    },
    bottomView: {
        flex: 0.3,
    },
    image: {
        alignSelf: 'center',
        marginTop: 2 * globalStyleDefinitions.screenPadding.padding,
    },
    headerText: {
        fontSize: getScaledFontSize(24),
        color: colors.black,
        fontFamily: fonts.soraSemiBold,
        textAlign: 'center',
        marginTop: globalStyleDefinitions.commonItemMargin.margin,
    },
    headerSubText: {
        fontSize: getScaledFontSize(14),
        color: colors.primaryText,
        fontFamily: fonts.fontRegular,
        textAlign: 'center',
        marginTop: 0.5 * globalStyleDefinitions.commonItemMargin.margin,
        marginBottom:globalStyleDefinitions.commonItemMargin.margin,
    },
    rowWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: globalStyleDefinitions.gap.gap,
        marginTop: globalStyleDefinitions.commonItemMargin.margin,
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
        marginTop: globalStyleDefinitions.commonItemMargin.margin,
    },
    loginText: {
        fontFamily: fonts.fontBold,
        fontSize: getScaledFontSize(14),
        color: colors.primary,
        textDecorationLine: 'underline',
    },
    errorText: {
        color: colors.red,
        fontSize: getScaledFontSize(12),
        marginTop: 5,
        marginLeft: 10,
        fontFamily: fonts.fontRegular,
    }
});

export default Login;
