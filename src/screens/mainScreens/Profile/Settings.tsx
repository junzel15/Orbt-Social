import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import WrapperContainer from "../../../components/wrapper/WrapperContainer";
import commonStyles from "../../../constants/commonStyles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { globalStyleDefinitions } from "../../../constants/globalStyleDefinitions";
import { colors } from "../../../constants/colors";
import { getScaledFontSize } from "../../../constants/globalFunctions";
import { fonts } from "../../../constants/fonts";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import LinearWrapperContainer from "../../../components/wrapper/LinearWrapperContainer";

const Settings = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const onBackPress = () => {
        navigation.goBack();
    };
    return (
        <WrapperContainer>
            <LinearWrapperContainer>
                <View style={commonStyles.fullInnerContainer} >
                    <View style={styles.rowWrapper}>
                        <AntDesign name="arrowleft" size={28} color={colors.black} onPress={onBackPress} />
                        <Text style={styles.headerTitle}>Settings</Text>
                    </View>
                    <View>
                        <TouchableOpacity>
                            {/* <CustomImage url={} /> */}
                        </TouchableOpacity>
                    </View>
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

});
