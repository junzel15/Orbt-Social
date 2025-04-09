import React, { useState, useMemo } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
} from "react-native";
import WrapperContainer from "../../../components/wrapper/WrapperContainer";
import commonStyles from "../../../constants/commonStyles";
import AntDesign from "react-native-vector-icons/AntDesign";
import { globalStyleDefinitions } from "../../../constants/globalStyleDefinitions";
import { colors } from "../../../constants/colors";
import { getScaledFontSize } from "../../../constants/globalFunctions";
import { fonts } from "../../../constants/fonts";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import LinearWrapperContainer from "../../../components/wrapper/LinearWrapperContainer";
import CommonButton from "../../../components/atoms/button/CommonButton";
import CustomInput from "../../../components/atoms/input/CustomInput";
import { iconPath } from "../../../constants/iconPath";


const ChangePassword = () => {
    const navigation = useNavigation<NavigationProp<any>>();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onBackPress = () => {
        navigation.goBack();
    };


    const validations = useMemo(() => ({
        isLengthValid: newPassword.length >= 8,
        hasNumber: /\d/.test(newPassword),
        hasUpperLower: /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword),
        passwordsMatch: newPassword === confirmPassword && confirmPassword.length > 0,
    }), [newPassword, confirmPassword]);

    const isAllValid = validations.isLengthValid && validations.hasNumber && validations.hasUpperLower && validations.passwordsMatch;

    const getColor = (isValid: boolean) => isValid ? colors.green : colors.black;

    const onSaveChanges = () => {
        if (isAllValid) {
            navigation.navigate('PasswordUpdated');
            // console.log("hi i am guning");  
        }
    };

    return (
        <WrapperContainer>
            <LinearWrapperContainer>
                <View style={commonStyles.fullInnerContainer}>
                    <View style={styles.rowWrapper}>
                        <AntDesign
                            name="arrowleft"
                            size={28}
                            color={colors.black}
                            onPress={onBackPress}
                        />
                        <Text style={styles.headerTitle}>Change Password</Text>
                    </View>

                    <Text style={styles.passwordTitle}>Old Password</Text>
                    <CustomInput
                        placeholder="Old password"
                        secureTextEntry
                        value={oldPassword}
                        onChangeText={setOldPassword}
                        icon={iconPath.password}
                    />

                    <Text style={styles.passwordTitle}>New Password</Text>
                    <CustomInput
                        placeholder="Your Password"
                        secureTextEntry
                        value={newPassword}
                        onChangeText={setNewPassword}
                        icon={iconPath.password}
                    />

                    <Text style={styles.passwordTitle}>Confirm Password</Text>
                    <CustomInput
                        placeholder="Retype Your Password"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        icon={iconPath.password}
                    />


                    <View style={[styles.validationRow, { marginTop: 2 * globalStyleDefinitions.mt_10.marginTop }]}>
                        <AntDesign name="checkcircle" size={16} color={getColor(validations.isLengthValid)} />
                        <Text style={[styles.validationText, { color: getColor(validations.isLengthValid) }]}>At least 8 characters</Text>
                    </View>

                    <View style={styles.validationRow}>
                        <AntDesign name="checkcircle" size={16} color={getColor(validations.hasNumber)} />
                        <Text style={[styles.validationText, { color: getColor(validations.hasNumber) }]}>At least 1 number</Text>
                    </View>

                    <View style={styles.validationRow}>
                        <AntDesign name="checkcircle" size={16} color={getColor(validations.hasUpperLower)} />
                        <Text style={[styles.validationText, { color: getColor(validations.hasUpperLower) }]}>Both upper and lowercase letters</Text>
                    </View>

                    <View style={styles.validationRow}>
                        <AntDesign name="checkcircle" size={16} color={getColor(validations.passwordsMatch)} />
                        <Text style={[styles.validationText, { color: getColor(validations.passwordsMatch) }]}>Password Matched</Text>
                    </View>

                    <View style={styles.buttonWrapper}>
                        <CommonButton
                            title={'Save changes'}
                            onPress={onSaveChanges}
                            customStyles={{ backgroundColor: isAllValid ? colors.primary : colors.disable }}
                        />
                    </View>
                </View>
            </LinearWrapperContainer>
        </WrapperContainer>
    );
};

export default ChangePassword;

const styles = StyleSheet.create({
    rowWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: globalStyleDefinitions.gap.gap,
        marginTop: Platform.select({
            ios: 2 * globalStyleDefinitions.screenPadding.padding,
            android: 2 * globalStyleDefinitions.screenPadding.padding,
        }),
        backgroundColor: colors.white,
        borderBottomLeftRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
        borderBottomRightRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
        overflow: "hidden",
        height: 60,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
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
    passwordTitle: {
        color: colors.black,
        fontSize: getScaledFontSize(14),
        fontFamily: fonts.soraSemiBold,
        marginTop: 2 * globalStyleDefinitions.mt_10.marginTop,
    },
    validationRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: globalStyleDefinitions.mt_10.marginTop
    },
    validationText: {
        marginLeft: globalStyleDefinitions.gap.gap,
        fontFamily: fonts.soraRegular,
        fontSize: getScaledFontSize(13),
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: "flex-end",
        paddingBottom: globalStyleDefinitions.screenPadding.padding/2,
      },
});
