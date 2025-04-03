import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import CommonHeader from '../../../../components/header/CommonHeader'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons';
import { getScaledFontSize } from '../../../../constants/globalFunctions'
import { colors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'
import { globalStyleDefinitions } from '../../../../constants/globalStyleDefinitions'
import { imagePath } from '../../../../constants/imagePath'
import TimerComponent from '../components/TimerComponent'
import CommonButton from '../../../../components/atoms/button/CommonButton';
import { windowHeight, windowWidth } from '../../../../constants/globalConstants';
import PricePeopleComponent from '../components/PricePeopleComponent';

const ExperienceDetails = () => {
    return (
        <LinearGradient colors={['#4C0BCE', '#180028', '#000000']}
            locations={[0.0, 0.5, 0.8]} // Blue ends early
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >

            <CommonHeader showBackIcon={true} headerTitle='ORBT-BR0001' />
            <ScrollView style={styles.container}>
                <View >


                    <View style={styles.mainCard}>
                        <View style={{}}>
                            <Text style={styles.title}>Experience</Text>

                            <View style={styles.infoRow}>
                                <Icon name="calendar-outline" size={24} color="#fff" />
                                <Text style={styles.infoText}>Friday, March 15, 2024{'\n'}10:30 AM</Text>
                            </View>

                            <View style={styles.infoRow}>
                                <Icon name="location-outline" size={24} color="#fff" />
                                <Text style={[styles.infoText, { textDecorationLine: 'underline' }]}>Mancini's Table</Text>
                            </View>
                            <View style={[styles.infoRow, { marginTop: globalStyleDefinitions.mt_10.marginTop }]}>
                                <Icon name="heart-outline" size={24} color="#fff" />
                                <View>
                                    <Text style={styles.infoText}>Hosted By: </Text>
                                    <Text style={[styles.infoText, { textDecorationLine: 'underline' }]}>Mancini's Table</Text>
                                </View>
                            </View>
                        </View>
                        <Image
                            source={imagePath.experienceImage}
                            style={styles.cupImage}
                        />

                    </View>
                    <View style={[ { marginTop: globalStyleDefinitions.mt_10.marginTop }]}>
                        <Text style={{color:colors.white}}>Overview: </Text>
                        <Text style={{color:colors.white,marginTop: globalStyleDefinitions.mt_10.marginTop}}>Get ready to roll! In this FREE Pasta Perfection Workshop, Chef Lila Mancini will guide you through the art of crafting fresh, handmade pasta. You’ll learn pro tips, try your hand at shaping dough, and enjoy the fruits of your labor with a complimentary tasting</Text>
                    </View>
                    <View style={[ { marginTop: globalStyleDefinitions.mt_10.marginTop }]}>
                        <Text style={{color:colors.white}}>Inclusions: </Text>
                        <Text style={{color:colors.white,marginTop: globalStyleDefinitions.mt_10.marginTop}}>Get ready to roll! In this FREE Pasta Perfection Workshop, Chef Lila Mancini will guide you through the art of crafting fresh, handmade pasta. You’ll learn pro tips, try your hand at shaping dough, and enjoy the fruits of your labor with a complimentary tasting</Text>
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
                    <View style={{ borderTopWidth: 0.5, borderColor: colors.white, marginTop: globalStyleDefinitions.mt_15.marginTop }} />
                    <View style={styles.langRow}>

                        <View>
                            <Text style={styles.subLabel}>Nationality:</Text>
                            <Text style={styles.whiteText}>🇺🇸 United States of America{'\n'}🇵🇭 Philippines</Text>
                        </View>
                        <View >
                            <Text style={styles.subLabel}>Language:</Text>
                            <Text style={styles.whiteText}>English, Filipino</Text>
                        </View>
                    </View>
                    <View style={{ borderTopWidth: 0.5, borderColor: colors.white, marginTop: globalStyleDefinitions.mt_15.marginTop }} />
                    <View >
                        <Text style={styles.sectionLabel}>Zodiac Signs:</Text>
                        <Text style={styles.zodiac}>
                            ♈ Aries   ♉ Taurus   ♊ Gemini   ♋ Cancer
                        </Text>
                    </View>
                    <View style={{ borderTopWidth: 0.5, borderColor: colors.white, marginTop: globalStyleDefinitions.mt_15.marginTop }} />
                    <TimerComponent />
                    <PricePeopleComponent showPrice={true} />
                    <View style={styles.buttonRow}>
                        <CommonButton
                            title='cancel Event'
                            customStyles={{ width: windowWidth / 2.5, marginRight: 10, backgroundColor: colors.white }}
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

export default ExperienceDetails


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
    sectionLabel: {
        color: '#fff',
        marginTop: 2 * globalStyleDefinitions.mt_10.marginTop,
        marginBottom: 12,
        fontWeight: '600',
        fontSize: 16,
    },
    zodiac: {
        color: '#fff',
        fontSize: 16,
        marginTop: 8,
        marginBottom: 20,
    },
    badge: {
        alignSelf: 'flex-start',
        backgroundColor: '#5B2EFF',
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
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoText: {
        color: colors.white,
        marginLeft: 10,
        fontSize: getScaledFontSize(14),
        // lineHeight: 20,
    },
    topRightCode: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    code: {
        color: colors.white,
        fontWeight: '600',
    },
    cupImage: {
        width: 120,
        height: 155,
        borderRadius: 16,
        backgroundColor: '#8B4DFF',
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: globalStyleDefinitions.gap.gap,
        marginTop: 10
    },
    tag: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.white,
        marginRight: 4,
    },
    tagText: {
        color: colors.white,
        fontSize: 13,

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
        color: '#fff',
        fontSize: 15,
        marginTop: globalStyleDefinitions.mt_15.marginTop
    },

    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: windowHeight * 0.1
    },


});