import React, { useState } from "react";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import WrapperContainer from "../../../components/wrapper/WrapperContainer";
import commonStyles from "../../../constants/commonStyles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { globalStyleDefinitions } from "../../../constants/globalStyleDefinitions";
import { colors } from "../../../constants/colors";
import { getScaledFontSize } from "../../../constants/globalFunctions";
import { fonts } from "../../../constants/fonts";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import LinearWrapperContainer from "../../../components/wrapper/LinearWrapperContainer";
import Icon from 'react-native-vector-icons/Feather';
import {  SettingsIcon } from "../../../constants/iconPath";
import { navigationStrings } from "../../../navigation/navigationStrings";

const Settings = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const [isEnabled, setIsEnabled] = useState(true);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };

    const onBackPress = () => {
        navigation.goBack();
    };
    
    const onGoEditProfile = () =>{
         navigation.navigate(navigationStrings.EditProfile);
    }
    return (
        <WrapperContainer>
            <LinearWrapperContainer>
                <View style={commonStyles.fullInnerContainer}>
                    <View style={styles.rowWrapper}>
                        <View style={{ flexDirection: 'row', width: '90%' }} >
                            <AntDesign name="arrowleft" size={28} color={colors.black} onPress={onBackPress} />
                            <Text style={styles.headerTitle}>Settings</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }} >
                        <TouchableOpacity style={styles.row} onPress={onGoEditProfile}>
                            <Image source={SettingsIcon.profileIcon} style={styles.icon} />
                            <Text style={styles.label}>Edit Profile</Text>
                            <Icon name="chevron-right" size={22} color="#000" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Blocked')}>
                            <Image source={SettingsIcon.blockedIcon} style={styles.icon} />
                            <Text style={styles.label}>Blocked</Text>
                            <Icon name="chevron-right" size={22} color="#000" />
                        </TouchableOpacity>

                        <View style={styles.row}>
                            <Image source={SettingsIcon.notificationIcon} style={styles.icon} />
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

                        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('ChangePassword')}>
                            <Image source={SettingsIcon.passwordIcon} style={styles.icon} />
                            <Text style={styles.label}>Change Password</Text>
                            <Icon name="chevron-right" size={22} color="#000" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Payments')}>
                            <Image source={SettingsIcon.paymentsIcon} style={styles.icon} />
                            <Text style={styles.label}>Payments</Text>
                            <Icon name="chevron-right" size={22} color="#000" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Language')}>
                            <Image source={SettingsIcon.languageIcon} style={styles.icon} />
                            <Text style={styles.label}>Language</Text>
                            <Text style={styles.subtitle}>English (US)</Text>
                            <Icon name="chevron-right" size={22} color="#000" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('AccountSecurity')}>
                            <Image source={SettingsIcon.security} style={styles.icon} />
                            <Text style={styles.label}>Account & Security</Text>
                            <Icon name="chevron-right" size={22} color="#000" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('HelpCentre')}>
                            <Image source={SettingsIcon.helpIcon} style={styles.icon} />
                            <Text style={styles.label}>Help Centre</Text>
                            <Icon name="chevron-right" size={22} color="#000" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('RateUs')}>
                            <Image source={SettingsIcon.rateIcon} style={styles.icon} />
                            <Text style={styles.label}>Rate Us</Text>
                            <Icon name="chevron-right" size={22} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.logoutRow} onPress={() => console.log('Log out')}>
                        <Icon name="log-out" size={20} color="red" />
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </LinearWrapperContainer>

        </WrapperContainer>
    )
}

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
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        elevation: 4,
    },
    headerTitle: {
        color: colors.black,
        fontSize: getScaledFontSize(22),
        fontFamily: fonts.fontSemiBold,
        marginLeft: globalStyleDefinitions.mr_10.marginRight
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        borderBottomWidth: 0.5,
        borderColor: colors.borderColor
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 16,
    },
    label: {
        flex: 1,
        fontSize: 16,
        fontFamily:fonts.fontSemiBold
    },
    subtitle: {
        color: 'gray',
        fontSize: 14,
        marginRight: 8,
        fontFamily:fonts.fontSemiBold
    },
    logoutRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: globalStyleDefinitions.screenPadding.padding
    },
    logoutText: {
        marginLeft: globalStyleDefinitions.mt_10.marginTop,
        color: colors.red,
        fontSize: 16,
        fontFamily:fonts.fontSemiBold
    },
    toggle: {
        width: 50,
        height: 30,
        resizeMode: 'contain',
    },
})




