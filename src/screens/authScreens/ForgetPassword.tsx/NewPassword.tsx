import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
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
import CustomInput from '../../../components/atoms/input/CustomInput';
import { iconPath } from '../../../constants/iconPath';
import AntDesign from 'react-native-vector-icons/AntDesign';

const NewPassword = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const route = useRoute<RouteProp<any>>();
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const onBackPress = () => {
        navigation.goBack();
    };

    const onVerify = () => {
        navigation.navigate(navigationStrings.SuccessfulPassword);
    };
    const passwordValidation = {
        length: password.length >= 8,
        number: /\d/.test(password),
        upperLowerCase: /[a-z]/.test(password) && /[A-Z]/.test(password),
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
                        <Text style={styles.headerText}>Create new password</Text>
                        <Text style={styles.headerSubText}>
                            Your new password must be different {'\n'}from the previous password.
                        </Text>
                        <CustomInput
                            onChangeText={setPassword}
                            value={password}
                            placeholder="New Password"
                            secureTextEntry
                            icon={iconPath.password}
                        />
                        <CustomInput
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            secureTextEntry
                            icon={iconPath.password}
                        />
                        <View style={styles.validationContainer}>
                            {Object.entries(passwordValidation).map(([key, isValid], index) => (
                                <View key={index} style={styles.validationItem}>
                                    <AntDesign
                                        name={isValid ? 'checkcircle' : 'closecircle'}
                                        size={18}
                                        color={isValid ? colors.green : colors.lightgray}
                                    />
                                    <Text style={[styles.validationText, { color: isValid ? colors.green : colors.lightgray }]}>
                                        {key === 'length' && 'At least 8 characters'}
                                        {key === 'number' && 'At least 1 number'}
                                        {key === 'upperLowerCase' && 'Both upper and lowercase letters'}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={styles.btnContainer}>
                        <CommonButton
                            title="Reset Password"
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
        justifyContent: 'center',
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
        marginTop: 0.5 * globalStyleDefinitions.mt_15.marginTop,
        marginBottom: globalStyleDefinitions.mt_15.marginTop,
    },
    btnWrapper: {
        marginTop: 2 * globalStyleDefinitions.mt_15.marginTop,
    },
    validationContainer: {
        marginTop: 15,
    },
    validationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    validationText: {
        fontSize: 14,
        color: colors.lightgray,
        fontFamily: fonts.fontRegular,
        marginLeft: 10,
    },
});

export default NewPassword;
