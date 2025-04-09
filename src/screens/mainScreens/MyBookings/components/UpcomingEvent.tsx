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


const UpcomingEvent = () => {
    const [selectedFilter, setSelectedFilter] = useState('This Week');


    return (
        <LinearWrapperContainer>
            <View style={commonStyles.fullInnerContainer}>
                <View style={styles.filterRow}>
                    {['This Week', 'Next Week', 'Later'].map((label, idx) => {
                        const isSelected = selectedFilter === label;

                        return (
                            <TouchableOpacity
                                key={idx}
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
                                    <View style={[styles.badgeContainer, isSelected && styles.badgeContainerActive]}>
                                        <Text
                                            style={[
                                                styles.badgeText,
                                                isSelected && styles.badgeTextActive,
                                            ]}
                                        >
                                            {[3, 2, 1][idx]}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <CustomImage url={imagePath.dining} height={22} width={22} />
                            <Text style={styles.diningText}>Dining</Text>
                            <View style={styles.coffeeTag}>
                                <Text style={styles.coffeeText}>COFFEE</Text>
                            </View>
                        </View>
                        <View style={styles.cardBody}>
                            <View>
                                <Text style={styles.label}>DATE & TIME</Text>
                                <Text>Today</Text>
                                <Text>10:30 AM</Text>
                            </View>
                            <View>
                                <Text style={styles.label}>LOCATION</Text>
                                <Text style={styles.linkText}>
                                    Cafe Commune,{''}Makati City
                                </Text>
                            </View>
                        </View>
                        <View style={styles.cardFooter}>
                            <TouchableOpacity style={styles.cancelButton}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.viewButton}>
                                <Text style={{ color: 'white' }}>View Details</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </LinearWrapperContainer>
    )
}

export default UpcomingEvent;

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
        paddingLeft: globalStyleDefinitions.screenPadding.padding,
        marginTop: 2* globalStyleDefinitions.mt_10.marginTop,
    },
    searchIcon: {
        marginRight: globalStyleDefinitions.mt_10.marginTop,
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
        marginBottom: 20,
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
        fontSize: 12,
        fontWeight: '600',
    },
    badgeTextActive: {
        color: colors.white,
    },
    filterContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    card: {
        backgroundColor: '#E9DDFC',
        borderRadius: 15,
        padding: globalStyleDefinitions.screenPadding.padding,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    diningText: {
        flex: 1,
        marginLeft: globalStyleDefinitions.mt_10.marginTop,
        fontSize: getScaledFontSize(16),
        fontFamily:fonts.fontRegular
    },
    coffeeTag: {
        borderWidth: 1,
        borderColor: colors.black,
        paddingHorizontal: 15,
        paddingVertical: 2,
        borderRadius: 10,
    },
    coffeeText: {
        fontSize: getScaledFontSize(9),
        fontFamily:fonts.fontSemiBold
    },
    cardBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: globalStyleDefinitions.mt_15.marginTop,
    },
    label: {
        fontSize: 10,
        color: colors.lighGrey,
        marginBottom: 2,
    },
    linkText: {
        textDecorationLine: 'underline',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:2* globalStyleDefinitions.mt_10.marginTop
    },
    cancelButton: {
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 10,
        width:windowWidth/2.5,
        height:windowHeight/19,
        justifyContent:'center',
        alignItems:'center',
        marginRight:globalStyleDefinitions.mr_10.marginRight
    },
    viewButton: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        width:windowWidth/2.5,
        height:windowHeight/19,
        justifyContent:'center',
        alignItems:'center',
    },
    txtViewBtn:{
        color:colors.white,
        fontSize:getScaledFontSize(14),
        fontFamily:fonts.fontSemiBold
    }
});