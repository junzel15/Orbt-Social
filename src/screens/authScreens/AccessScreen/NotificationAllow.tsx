import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { navigationStrings } from '../../../navigation/navigationStrings';
import commonStyles from '../../../constants/commonStyles';
import { imagePath } from '../../../constants/imagePath';
import CommonButton from '../../../components/atoms/button/CommonButton';
import { windowHeight, windowWidth } from '../../../constants/globalConstants';
import { colors } from '../../../constants/colors';
import { getScaledFontSize } from '../../../constants/globalFunctions';
import { fonts } from '../../../constants/fonts';
import { globalStyleDefinitions } from '../../../constants/globalStyleDefinitions';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../../../redux/slices/authState';

const NotificationAllow = () => {
    const navigation = useNavigation<NavigationProp<any>>();

    const dispatch = useDispatch();
    
    const onViewBook = () => {
        dispatch(setAccessToken('accessToken'));
    }

    const onSkip = () => {
           dispatch(setAccessToken('accessToken'));
    };

    return (
        <View style={commonStyles.fullInnerContainer} >
            <View style={styles.container}>
                <Image source={imagePath.notificationImage} style={styles.successImage} />
                <View style={styles.textContainer} >
                    <Text style={styles.title}>Never Miss a Beat</Text>
                    <Text style={styles.subtitle}>Receive updates on exciting events, exclusive {'\n'} offers, and meaningful interactions.</Text>
                </View>
            </View>
            <View style={styles.bottomView} >
            <CommonButton title='Allow Notification' onPress={onViewBook} />
            <Text style={styles.subText} suppressHighlighting onPress={onSkip}>
                Skip for now
            </Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 0.9,
    },
    successImage: {
        width: windowWidth / 1.3,
        height: windowHeight / 3,
    },
    textContainer: {
        marginTop: 40,
    },
    title: {
        color: colors.black,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily:fonts.soraSemiBold
    },
    subtitle: {
        color: colors.black,
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 10,
        fontFamily:fonts.fontRegular
    },
    subText: {
        fontSize: getScaledFontSize(16),
        color: colors.black,
        fontFamily: fonts.fontRegular,
        marginBottom: Platform.select({
            ios: globalStyleDefinitions.screenPadding.padding,
        }),
        marginTop: globalStyleDefinitions.mt_15.marginTop,
        padding: globalStyleDefinitions.cardInnerPadding.padding,
        alignSelf: 'center',
    },
    bottomView:{
        flex:0.3,
         justifyContent:'flex-end'
    }
});

export default NotificationAllow;