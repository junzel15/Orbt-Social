import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Platform, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import CommonButton from '../../../components/atoms/button/CommonButton';
import LinearWrapperContainer from '../../../components/wrapper/LinearWrapperContainer';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import { colors } from '../../../constants/colors';
import commonStyles from '../../../constants/commonStyles';
import { fonts } from '../../../constants/fonts';
import { getScaledFontSize } from '../../../constants/globalFunctions';
import { globalStyleDefinitions } from '../../../constants/globalStyleDefinitions';
import { navigationStrings } from '../../../navigation/navigationStrings';
import SmsButton from './components/SmsButton';

const ForgetPassword = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const route = useRoute<RouteProp<any>>();
    const { phone } = route.params || {};
    const [selected, setSelected] = useState<"sms" | "email" | null>("sms");
    const onBackPress = () => {
        navigation.goBack();
    };

    const onVerify = () => {
        navigation.navigate(navigationStrings.VerifyScreen);
    };

    const handleSelectSMS = (type: 'sms' | 'email') => {
        setSelected(type);
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
                <View style={commonStyles.fullInnerContainer}>

                    <View style={styles.contentContainer}>
                        <Text style={styles.headerText}>Forgot Password</Text>
                        <Text style={styles.headerSubText}>
                            Select which contact detail should we use {'\n'} to reset your password.
                        </Text>
                        <SmsButton
                            type="sms"
                            selected={selected === "sms"}
                            onPress={() => handleSelectSMS('sms')}
                            label="via SMS:"
                            value="+63 964 201****"
                        />
                        <SmsButton
                            type="email"
                            selected={selected === "email"}
                            onPress={() => handleSelectSMS('email')}
                            label="via SMS:"
                            value="+63 964 201****"
                        />
                    </View>
                    <View style={styles.btnContainer} >
                        <CommonButton
                            title="Continue"
                            customStyles={styles.btnWrapper}
                            onPress={onVerify}
                        />
                    </View>
                </View>
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
        marginLeft: globalStyleDefinitions.screenPadding.padding,
    },
    contentContainer: {
        flex: 0.8,
        marginTop: 1.5 * globalStyleDefinitions.br_10.borderRadius,
    },
    btnContainer: {
        flex: 0.2,
        justifyContent: 'center'
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
    btnWrapper: {
        marginTop: 2 * globalStyleDefinitions.commonItemMargin.margin,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.lightgray,
        marginBottom: 10,
    },
    selectedOption: {
        borderColor: colors.purple,
        backgroundColor: colors.lightpink,
    },
});

export default ForgetPassword;
