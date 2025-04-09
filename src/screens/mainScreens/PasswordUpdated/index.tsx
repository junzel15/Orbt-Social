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
import { imagePath } from "../../../constants/imagePath";
import CustomImage from "../../../components/atoms/image/CustomImage";
import { windowWidth } from "../../../constants/globalConstants";


const PasswordUpdated = () => {
    const navigation = useNavigation<NavigationProp<any>>();

    const onBackPress = () => {
        navigation.goBack();
    };

    const onCommonBackButton = () => {
        console.log("hi i am guning");
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
                    </View>
                    <CustomImage
                        url={imagePath.passwordChangeIcon}
                        height={400}
                        width={windowWidth * 0.7}
                        imageStyle={styles.image}
                    />
                    <View style={commonStyles.fullInnerContainer}>
                        <Text style={styles.headerText}>Password Updated!</Text>
                        <Text style={styles.headerSubText}>
                            Your password has been changed successfully.
                        </Text>
                    </View>


                    <View style={styles.buttonWrapper}>
                        <CommonButton
                            title={'Back'}
                            onPress={onCommonBackButton}
                        />
                    </View>
                </View>
            </LinearWrapperContainer>
        </WrapperContainer>
    );
};

export default PasswordUpdated;

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
    buttonWrapper: {
        // flex: 1,
        // justifyContent: "flex-end",
        paddingBottom: globalStyleDefinitions.screenPadding.padding / 2,
    },
    image: {
        flex: 2.5,
        alignSelf: 'center',
    },
    headerText: {
        fontSize: getScaledFontSize(20),
        color: colors.black,
        fontFamily: fonts.soraSemiBold,
        textAlign: 'center',
    },
    headerSubText: {
        fontSize: getScaledFontSize(14),
        color: colors.primaryText,
        fontFamily: fonts.fontRegular,
        marginTop: 0.5 * globalStyleDefinitions.commonItemMargin.margin,
        marginBottom: globalStyleDefinitions.commonItemMargin.margin,
        textAlign: 'center',
    },
});
