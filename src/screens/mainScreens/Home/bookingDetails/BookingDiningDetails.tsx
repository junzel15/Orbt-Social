import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import CommonHeader from '../../../../components/header/CommonHeader'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { getScaledFontSize } from '../../../../constants/globalFunctions'
import { colors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'
import { globalStyleDefinitions } from '../../../../constants/globalStyleDefinitions'
import { imagePath } from '../../../../constants/imagePath'
import TimerComponent from '../components/TimerComponent'
import CommonButton from '../../../../components/atoms/button/CommonButton';
import { windowHeight, windowWidth } from '../../../../constants/globalConstants';
import PricePeopleComponent from '../components/PricePeopleComponent';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { navigationStrings } from '../../../../navigation/navigationStrings';

const BookingDiningDetails = () => {
    const navigation = useNavigation<NavigationProp<any>>();


    return (
        <LinearGradient colors={['#4C0BCE', '#180028', '#000000']}
            locations={[0.0, 0.5, 0.8]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >
            <CommonHeader showBackIcon={true} headerTitle='ORBT-BR0001' />
            <ScrollView style={styles.container}>
                <View >
                    <View style={styles.mainCard}>
                        <View style={{}}>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>COFFEE</Text>
                            </View>
                            <Text style={styles.title}>Dining</Text>

                            <View style={styles.infoRow}>
                                <Icon name="calendar-outline" size={24} color="#fff" />
                                <Text style={styles.infoText}>Friday, March 15, 2024{'\n'}10:30 AM</Text>
                            </View>

                            <View style={styles.infoRow}>
                                <Icon name="location-outline" size={24} color={colors.white} />
                                <Text style={styles.infoText}>To Be Revealed 🤫</Text>
                            </View>
                        </View>
                        <Image
                            source={imagePath.coffeeImage}
                            style={styles.cupImage}
                        />
                    </View>
                    <View style={[styles.infoRow, { marginTop: globalStyleDefinitions.mt_10.marginTop }]}>
                        <Icon name="heart-outline" size={24} color="#fff" />
                        <Text style={styles.infoText}>Common Interests: </Text>
                    </View>
                    <View style={styles.tags}>
                        {[
                            'Technology',
                            'Politics',
                            'Healthcare',
                            'Healthcare',
                            'Academia & Research',
                        ].map((item, i) => (
                            <View key={i} style={styles.tag}>
                                <Text style={styles.tagText}>{item}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.seprator} />
                    <View style={styles.langRow}>
                        <View>
                        <View  style={styles.infoRow}>
                            <Feather name={"globe"} size={13} color={colors.white} />
                             <Text style={[styles.subLabel,{marginLeft:10}]}>Nationality:</Text>
                             </View>
                            <View>
                           
                            <Text style={styles.whiteText}>🇺🇸 United States of America{'\n'}🇵🇭 Philippines</Text>
                         
                            </View>
                        </View>
                        <View >
                            <Text style={styles.subLabel}>Language:</Text>
                            <Text style={styles.whiteText}>English, Filipino</Text>
                        </View>
                    </View>
                    <View style={styles.seprator} />
                    <View >
                        <Text style={styles.sectionLabel}>Zodiac Signs:</Text>
                        <Text style={styles.zodiac}>
                            ♈ Aries   ♉ Taurus   ♊ Gemini   ♋ Cancer
                        </Text>
                    </View>
                    <View style={styles.seprator} />
                    <TimerComponent />
                    <PricePeopleComponent />
                    <View style={styles.buttonRow}>
                        <CommonButton
                            title='cancel Event'
                            onPress={() => navigation.navigate(navigationStrings.CancelEvent)}
                            customStyles={styles.customStyles}
                            customTextStyles={{ color: colors.black }}
                        />
                        <CommonButton
                            title='View E-Ticket'
                            customStyles={{ width: windowWidth / 2.5, }}
                        />
                    </View>

                </View>
            </ScrollView>
        </LinearGradient>
    )
}

export default BookingDiningDetails


const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    mainCard: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        padding: globalStyleDefinitions.screenPadding.padding,
        flex: 1
    },
    customStyles:{ width: windowWidth / 2.5,
         marginRight: 10,
          backgroundColor: colors.white 
    },
    sectionLabel: {
        color: colors.white,
        marginTop: 2 * globalStyleDefinitions.mt_10.marginTop,
        marginBottom: globalStyleDefinitions.mb_10.marginBottom,
        fontFamily:fonts.fontMedium,
        fontSize: getScaledFontSize(14),
    },
    zodiac: {
        fontFamily:fonts.fontRegular,
        color:colors.white,
        fontSize: getScaledFontSize(12),
        marginBottom: 2*globalStyleDefinitions.mb_10.marginBottom,
    },
    seprator: {
        borderBottomWidth: 0.5,
        borderBottomColor: colors.white,
        marginTop: globalStyleDefinitions.mt_15.marginTop
    },
    badge: {
        alignSelf: 'flex-start',
        backgroundColor: colors.primary,
        borderColor:colors.darkPurple,
        borderWidth:2,
        borderRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
        paddingHorizontal: 12,
        paddingVertical: 4,
        marginBottom: 8,
    },
    badgeText: {
        color: colors.white,
        fontSize: getScaledFontSize(8),
        fontFamily: fonts.fontSemiBold
    },
    title: {
        color: colors.white,
        fontSize: getScaledFontSize(24),
        fontFamily: fonts.fontRegular,
        marginBottom: globalStyleDefinitions.mb_10.marginBottom,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: globalStyleDefinitions.mb_10.marginBottom,
    },
    infoText: {
        color: colors.white,
        marginLeft: 10,
        fontSize: getScaledFontSize(14),
    },
    cupImage: {
        width: 120,
        height: 155,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: globalStyleDefinitions.gap.gap,
        marginTop: globalStyleDefinitions.mt_10.marginTop
    },
    tag: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 2*globalStyleDefinitions.br_10.borderRadius,
        borderWidth: 1,
        borderColor: colors.white,
        marginRight: 4,
    },
    tagText: {
        color: colors.white,
        fontSize: getScaledFontSize(10),
    },
    langRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2 * globalStyleDefinitions.mt_10.marginTop,
    },
    subLabel: {
        color: colors.white,
        fontSize: getScaledFontSize(14),
        marginBottom: 4,
    },
    whiteText: {
        color:colors.white,
        fontSize: getScaledFontSize(12),
        // marginTop: globalStyleDefinitions.mt_15.marginTop
    },

    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: windowHeight * 0.1,
        marginTop:globalStyleDefinitions.mt_10.marginTop
    },


});