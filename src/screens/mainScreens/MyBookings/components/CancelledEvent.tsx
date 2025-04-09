import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearWrapperContainer from "../../../../components/wrapper/LinearWrapperContainer";
import commonStyles from "../../../../constants/commonStyles";
import { colors } from "../../../../constants/colors";
import { windowHeight, windowWidth } from "../../../../constants/globalConstants";
import { getScaledFontSize } from "../../../../constants/globalFunctions";
import { fonts } from "../../../../constants/fonts";
import { globalStyleDefinitions } from "../../../../constants/globalStyleDefinitions";
import AntDesign from 'react-native-vector-icons/AntDesign';

interface CancelledEventProps {
    name: string;
    date: string;
    time: string;
    location: string;
    status: string;
    id: string;
    isStarred?: boolean;
}

const CancelledEvent: React.FC<CancelledEventProps> = ({
    name,
    date,
    time,
    location,
    status,
    id,
    isStarred = false,
}) => {
    const [selectedFilter, setSelectedFilter] = useState('Recents');


    return (
        <LinearWrapperContainer>
            <View style={commonStyles.fullInnerContainer}>
                <View style={styles.filterRow}>
                    {['Recents', 'This Month', 'Older Events'].map((label, idx) => {
                        const isSelected = selectedFilter === label;
                        const badgeCounts = [3, 2];
                        return (
                            <TouchableOpacity
                                key={label}
                                onPress={() => setSelectedFilter(label)}
                                style={[
                                    styles.filterButton,
                                    isSelected && styles.activeFilter,
                                ]}
                            >
                                <View style={styles.filterContent}>
                                    <Text
                                        style={[
                                            styles.filterText,
                                            isSelected && styles.activeFilterText,
                                        ]}
                                    >
                                        {label}
                                    </Text>
                                    {idx < 2 && (
                                        <View
                                            style={[
                                                styles.badgeContainer,
                                                isSelected && styles.badgeContainerActive,
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.badgeText,
                                                    isSelected && styles.badgeTextActive,
                                                ]}
                                            >
                                                {badgeCounts[idx]}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.card}>
                        <View style={styles.row}>
                            <View style={styles.iconWrapper}>
                                <AntDesign name="enviromento" size={20} color="white" />
                            </View>
                            <Text style={styles.title}>{name}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.bottomRow}>
                            <View>
                                <Text style={styles.text}>{date}</Text>
                                <Text style={styles.text}>{time}</Text>
                                <Text style={styles.text}>{location}</Text>
                            </View>
                            <TouchableOpacity style={styles.coffeeTag}>
                                <Text style={styles.coffeeText}>Dinning</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.footer}>
                            <Text style={styles.status}>Cancelled</Text>
                            <Text style={styles.bookingId}>{id}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </LinearWrapperContainer>

    )
}

export default CancelledEvent;

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: globalStyleDefinitions.screenPadding.padding,
    },
    rowWrapper: {
        flexDirection: 'row',
        gap: globalStyleDefinitions.gap.gap,
        marginTop: Platform.select({
            ios: 3 * globalStyleDefinitions.screenPadding.padding,
            android: 2 * globalStyleDefinitions.screenPadding.padding,
        }),
        justifyContent: 'space-between'
    },
    headerTitle: {
        color: colors.white,
        fontSize: getScaledFontSize(22),
        fontFamily: fonts.fontSemiBold,
        marginLeft: 10
    },
    searchView: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        marginTop: 25,
    },
    searchIcon: {
        marginRight: 10,
    },
    optView: {
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'space-around',
    },
    optText: {
        color: colors.white,
        fontSize: getScaledFontSize(14),
        fontFamily: fonts.fontMedium,
    },
    tabItem: {
        width: windowWidth / 3,
        height: windowHeight / 13,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: colors.white,
    },
    activeTabText: {
        color: colors.black,
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 2*globalStyleDefinitions.mb_10.marginBottom
    },
    filterButton: {
        backgroundColor: colors.offWhite,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 14,
        ...Platform.select({
            ios: {
                shadowColor: colors.offWhite,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.3,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    activeFilter: {
        backgroundColor: colors.black,
    },
    filterText: {
        color: colors.black,
    },
    activeFilterText: {
        color: colors.white,
    },
    badgeContainer: {
        backgroundColor: colors.gray,
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    badgeContainerActive: {
        backgroundColor: colors.primary,
    },
    badgeText: {
        color: colors.black,
        fontSize: getScaledFontSize(12),
        fontFamily:fonts.fontRegular
    },
    badgeTextActive: {
        color:colors.white,
    },
    filterContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    coffeeTag: {
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 10,
        height:20,
        alignItems:'center',
        justifyContent:'center',
    },
    coffeeText: {
        fontSize: getScaledFontSize(9),
        fontFamily:fonts.fontSemiBold,
        paddingHorizontal: 18,
    },
    cardBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: globalStyleDefinitions.mt_15.margin,
    },
    label: {
        fontSize: 10,
        color: colors.lighGrey,
    },
    linkText: {
        textDecorationLine: 'underline',
    },
    cancelButton: {
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 10,
        paddingVertical: 6,
        paddingHorizontal: 20,
    },
    card: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 12,
        padding: 16,
        backgroundColor: colors.white,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconWrapper: {
        width: 32,
        height: 32,
        backgroundColor: 'black',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    title: {
        fontSize: getScaledFontSize(14),
        flex: 1,
        fontFamily:fonts.fontMedium
    },
    divider: {
        borderBottomWidth: 1,
        borderColor: colors.black,
        marginVertical: globalStyleDefinitions.mt_10.marginTop,
    },
    text: {
        fontSize: 13,
        color: colors.lighGrey,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    footer: {
        marginTop: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    status: {
        color: colors.red, 
        fontSize:getScaledFontSize(12),
        fontFamily:fonts.fontSemiBold
    },
    bookingId: {
        color: colors.black,
        fontFamily:fonts.fontSemiBold
    },
});