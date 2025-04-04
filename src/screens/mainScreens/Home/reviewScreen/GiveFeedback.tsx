import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { imagePath } from '../../../../constants/imagePath';
import CommonHeader from '../../../../components/header/CommonHeader';
import { globalStyleDefinitions } from '../../../../constants/globalStyleDefinitions';
import { getScaledFontSize } from '../../../../constants/globalFunctions';
import { fonts } from '../../../../constants/fonts';
import { colors } from '../../../../constants/colors';
import CommonButton from '../../../../components/atoms/button/CommonButton';
import { navigationStrings } from '../../../../navigation/navigationStrings';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const FeedbackScreen = () => {
     const navigation = useNavigation<NavigationProp<any>>();
    const improvements = [
        'Food Quality',
        'Service',
        'Ambiance',
        'Value for money',
        'Location/Accessibility',
    ];

    const people = [
        {
            name: 'Kevin',
            flag: imagePath.event,
            avatar: imagePath.dining,
            selected: 'yes',
        },
        {
            name: 'Karissa',
            flag: imagePath.event,
            avatar: imagePath.event,
            selected: 'no',
        },
        {
            name: 'Christian',
            flag: imagePath.event,
            avatar: imagePath.event,
            selected: 'not-there',
        },
        {
            name: 'Brittany',
            flag: imagePath.event,
            avatar: imagePath.event,
            selected: 'yes',
        },
    ];

    const getButtonStyle = (type, selected) => {
        const base = {
            yes: [styles.button, selected === 'yes' && styles.yesSelected],
            no: [styles.button, selected === 'no' && styles.noSelected],
            notThere: [styles.button, selected === 'not-there' && styles.notThereSelected],
        };
        return base[type];
    };

    return (
        <LinearGradient
            colors={['#4C0BCE', '#180028', '#000000']}
            locations={[0.0, 0.5, 0.8]} // Blue ends early
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <CommonHeader showBackIcon={true} headerTitle='' />
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>Leave a Review</Text>
                    <Text style={styles.subtitle}>How was your overall experience?</Text>

                    <View style={styles.stars}>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Icon
                                key={i}
                                name="star"
                                solid={i < 5}
                                color={i < 5 ? '#FFC107' : 'transparent'}
                                size={30}
                                style={i === 5 ? styles.starOutline : null}
                            />
                        ))}
                    </View>

                </View>
                <View style={styles.whiteCard}>
                    <Text style={styles.improveLabel}>What can we improve?</Text>
                    <View style={styles.pillsWrap}>
                        {improvements.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.pill,
                                    index === 0 && styles.activePill,
                                ]}
                            >
                                <Text style={[
                                    styles.pillText,
                                    index === 0 && styles.activePillText,
                                ]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={{borderColor:'red', borderBottomWidth:10, borderBottomColor:'red'}} />
                    <Text style={styles.improveLabel}>Who would you like to see again at the table?</Text>

                    {people.map((p, index) => (
                        <View key={index} style={{ marginTop: 10 }}>
                            <View style={styles.personRow}>
                                <Image source={p.avatar} style={styles.avatar} />
                                <Text style={styles.personName}>{p.name}</Text>
                            </View>

                            <View style={styles.actionsRow}>
                                <TouchableOpacity style={getButtonStyle('yes', p.selected)}>
                                    <Icon name="thumbs-up" color={p.selected === 'yes' ? 'white' : 'black'} size={16} />
                                    <Text style={[
                                        styles.buttonText,
                                        p.selected === 'yes' && styles.whiteText,
                                    ]}>Yes</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={getButtonStyle('no', p.selected)}>
                                    <Icon name="thumbs-down" color={p.selected === 'no' ? 'white' : 'black'} size={16} />
                                    <Text style={[
                                        styles.buttonText,
                                        p.selected === 'no' && styles.whiteText,
                                    ]}>No</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={getButtonStyle('notThere', p.selected)}>
                                    <Icon name="question" color={p.selected === 'not-there' ? 'white' : 'black'} size={16} />
                                    <Text style={[
                                        styles.buttonText,
                                        p.selected === 'not-there' && styles.whiteText,
                                    ]}>Not There</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                    <CommonButton
                    title='Submit'
                    onPress={()=>navigation.navigate(navigationStrings.CancelBooking) }
                    />
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scroll: {
        flex: 1,
        paddingHorizontal: globalStyleDefinitions.screenPadding.padding
    },

    title: {
        fontSize: getScaledFontSize(24),
        fontFamily: fonts.soraRegular,
        color: colors.white,
        marginBottom: globalStyleDefinitions.mb_10.marginBottom
    },
    subtitle: {
        color: colors.white,
        fontSize: getScaledFontSize(16),
        fontFamily: fonts.fontRegular,
        marginBottom: globalStyleDefinitions.mb_10.marginBottom
    },
    stars: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    starOutline: {
        borderColor: '#FFC107',
        borderWidth: 2,
        borderRadius: 20,
    },
    whiteCard: {
        backgroundColor: colors.white,
        borderRadius: globalStyleDefinitions.br_10.borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
        padding: globalStyleDefinitions.screenPadding.padding,
    },

    improveLabel: {
        color: colors.black,
        fontSize: getScaledFontSize(14),
        fontFamily: fonts.fontSemiBold,
        marginBottom: 2 * globalStyleDefinitions.mb_10.marginBottom
    },

    pillsWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: globalStyleDefinitions.gap.gap,
    },
    pill: {
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
        paddingHorizontal: 16,
        paddingVertical: 6,
    },
    pillText: {
        fontSize: getScaledFontSize(12),
        color: colors.black,
        fontFamily: fonts.fontRegular
    },
    activePill: {
        backgroundColor: colors.darkPurple,
    },
    activePillText: {
        color: colors.white,
        fontSize: getScaledFontSize(12),
        fontFamily: fonts.fontRegular
    },
    separator: {

       marginTop:2*globalStyleDefinitions.mt_10.marginTop
    },
    personRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: globalStyleDefinitions.gap.gap,
    },
    personName: {
        fontFamily:fonts.fontBold,
        fontSize:getScaledFontSize(14),
        color:colors.black
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 2* globalStyleDefinitions.br_10.borderRadius,
    },
    actionsRow: {
        flexDirection: 'row',
        gap:  globalStyleDefinitions.gap.gap,
        marginTop:  globalStyleDefinitions.mt_10.marginTop,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:  globalStyleDefinitions.gap.gap/2,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: globalStyleDefinitions.br_10.borderRadius,
    },
    yesSelected: {
        backgroundColor: colors.lightGreen,
        borderColor: colors.lightGreen,
    },
    noSelected: {
        backgroundColor: colors.red,
        borderColor: colors.red,
    },
    notThereSelected: {
        backgroundColor: colors.lighgrey,
        borderColor: colors.lighgrey,
    },
    buttonText: {
        color: colors.black,
        fontFamily:fonts.fontRegular,
        fontSize:getScaledFontSize(14)  
    },
    whiteText: {
        color: colors.black,
        fontFamily:fonts.fontBold,
        fontSize:getScaledFontSize(14)  
    },
});
