import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearWrapperContainer from "../../../../components/wrapper/LinearWrapperContainer";
import commonStyles from "../../../../constants/commonStyles";
import { colors } from "../../../../constants/colors";
import { windowHeight, windowWidth } from "../../../../constants/globalConstants";
import { getScaledFontSize } from "../../../../constants/globalFunctions";
import { fonts } from "../../../../constants/fonts";
import { globalStyleDefinitions } from "../../../../constants/globalStyleDefinitions";
import CustomImage from "../../../../components/atoms/image/CustomImage";
import { imagePath } from "../../../../constants/imagePath";
import CommonButton from "../../../../components/atoms/button/CommonButton";


const NothingScreen = () => {
    return (
        <LinearWrapperContainer>
            <CustomImage
                url={imagePath.nothingImage}
                height={300}
                width={windowWidth * 0.7}
                imageStyle={styles.image}
            />
            <View style={commonStyles.fullInnerContainer}>
                <Text style={styles.headerText}>Oops, Nothing Here!</Text>
                <Text style={styles.headerSubText}>
                    Looks like we couldn’t find what you’re {'\n'}looking for. Try tweaking your search  {'\n'} or check out other options!
                </Text>
            </View>
        </LinearWrapperContainer>
    )
}

export default NothingScreen;

const styles = StyleSheet.create({
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
    buttonContainer: {
        marginBottom: 2 * globalStyleDefinitions.screenPadding.padding,
        width: windowWidth - 2 * globalStyleDefinitions.screenPadding.padding,
    },
});