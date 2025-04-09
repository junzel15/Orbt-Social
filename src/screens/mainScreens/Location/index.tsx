import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { imagePath } from '../../../constants/imagePath'; // Make sure this exists
import { colors } from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';
import { getScaledFontSize } from '../../../constants/globalFunctions';
import { globalStyleDefinitions } from '../../../constants/globalStyleDefinitions';

const windowWidth = Dimensions.get('window').width;

const allPlaces = [
    {
        title: 'Poblacion, Makati City',
        address: '21 Palm Grove Street, Barangay Bel-Air, Makati City',
        distance: '2.7km',
    },
    {
        title: 'Legazpi Village, Makati City',
        address: '8 Sapphire Lane, Legazpi Village, Makati City, 1229',
        distance: '1.1km',
    },
    {
        title: 'Penthouse Emerald',
        address: 'Penthouse Level, 34 Emerald Avenue, Ayala Center, Makati City, 1226',
        distance: '1.1km',
    },
    {
        title: 'Sun Residences',
        address: 'Unit 3A, 50 Ruby Road, Salcedo Village, Makati City, 1226',
        distance: '3.0km',
    },
];

const recentPlacesList = [
    {
        title: 'Poblacion, Makati City',
        address: '21 Palm Grove Street, Barangay Bel-Air, Makati City',
        distance: '2.7km',
    },
    {
        title: 'Legazpi Village, Makati City',
        address: '8 Sapphire Lane, Legazpi Village, Makati City, 1229',
        distance: '1.1km',
    },
    {
        title: 'Penthouse Emerald',
        address: 'Penthouse Level, 34 Emerald Avenue, Ayala Center, Makati City, 1226',
        distance: '1.1km',
    },
    {
        title: 'Sun Residences',
        address: 'Unit 3A, 50 Ruby Road, Salcedo Village, Makati City, 1226',
        distance: '3.0km',
    },
];

const Location = () => {
    const navigation = useNavigation();
    const [location, setLocation] = useState('');
    const [filteredPlaces, setFilteredPlaces] = useState(allPlaces);
    const [recentPlaces, setRecentPlaces] = useState(recentPlacesList)


    useEffect(() => {
        if (location.trim() === '') {
            setFilteredPlaces(allPlaces);
        } else {
            const results = allPlaces.filter(item =>
                item.title.toLowerCase().includes(location.toLowerCase())
            );
            setFilteredPlaces(results);
        }
    }, [location]);

    const showNoResults = location.trim() !== '' && filteredPlaces.length === 0;

    const onClearAllPress = () => {
        setRecentPlaces([])
    }

    const SinglePlaceItem = useCallback(({ item }: any) => (
        <TouchableOpacity style={styles.placeItem}>
            <Icon name="clock" size={18} color="#888" style={{ marginRight: globalStyleDefinitions.cardInnerPadding.padding }} />
            <View style={{ flex: 1 }}>
                <Text style={styles.placeTitle}>{item.title}</Text>
                <Text style={styles.placeAddress}>{item.address}</Text>
            </View>
            <Text style={styles.placeDistance}>{item.distance}</Text>
        </TouchableOpacity>
    ), []);

    const listKeyExtractor = useCallback((item: any, index: any) => { return index.toString() }, [])

    const listKeyExtractor2 = useCallback((item: any, index: any) => { return index.toString() }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={24} color={colors.black} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Enter your Location</Text>
                </View>
                <View style={styles.inputBox}>
                    <FontAwesome5 name="map-marker-alt" size={20} color="black" />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your location"
                        value={location}
                        onChangeText={setLocation}
                        placeholderTextColor="#999"
                    />
                    {location.length > 0 && (
                        <TouchableOpacity onPress={() => setLocation('')}>
                            <Icon name="x" size={20} color="gray" />
                        </TouchableOpacity>
                    )}
                </View>
                {location.trim() === '' && (
                    <View style={styles.recentSection}>
                        <View style={styles.recentHeader}>
                            <Text style={styles.recentTitle}>Recent places</Text>
                            <TouchableOpacity onPress={onClearAllPress}>
                                <Text style={styles.clearAll}>Clear All</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={recentPlaces}
                            keyExtractor={listKeyExtractor}
                            renderItem={SinglePlaceItem}
                            scrollEnabled={false}
                        />
                    </View>
                )}
                {!showNoResults && location.trim() !== '' && (
                    <FlatList
                        data={filteredPlaces}
                        keyExtractor={listKeyExtractor2} 
                        renderItem={SinglePlaceItem}
                        style={{ marginTop: 20 }}
                    />
                )}
                {showNoResults && (
                    <View style={styles.noResultContainer}>
                        <Text style={styles.noResultText}>
                            Results for “<Text style={styles.searchQuery}>{location}</Text>” — 0 results
                        </Text>
                        <Image
                            source={imagePath.noLocationImage}
                            style={styles.noResultImage}
                            resizeMode="contain"
                        />
                        <Text style={styles.noMatches}>Oops, No Matches!</Text>
                        <Text style={styles.noDescription}>
                            Looks like we couldn’t find anything for that keyword. Double-check your spelling or try a new search!
                        </Text>
                    </View>
                )}

                <View style={{ flex: 1 }} />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Add Address</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Location;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    innerContainer: {
        flex: 1,
        padding: globalStyleDefinitions.screenPadding.padding,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: globalStyleDefinitions.mt_15.margin,
        gap: globalStyleDefinitions.gap.gap
    },
    headerTitle: {
        fontSize: getScaledFontSize(20),
        fontFamily: fonts.fontSemiBold
    },
    inputBox: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.charcoalGrey,
        borderRadius: globalStyleDefinitions.br_10.borderRadius,
        padding: globalStyleDefinitions.screenPadding.padding / 2,
        alignItems: 'center',
        gap: globalStyleDefinitions.gap.gap
    },
    input: {
        flex: 1,
        fontSize: getScaledFontSize(14),
        color: colors.black
    },
    recentSection: {
        marginTop: globalStyleDefinitions.mt_15.margin
    },
    recentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: globalStyleDefinitions.mt_15.margin / 2,
    },
    recentTitle: {
        fontFamily: fonts.soraRegular,
        color: colors.black,
        fontSize: getScaledFontSize(16),
    },
    clearAll: {
        color: colors.primary,
        fontFamily: fonts.soraSemiBold,
    },
    placeItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: globalStyleDefinitions.cardInnerPadding.padding,
    },
    placeTitle: {
        fontFamily: fonts.fontSemiBold,
        fontSize: getScaledFontSize(14),
        marginBottom: 4
    },
    placeAddress: {
        color: colors.primaryText,
        fontSize: getScaledFontSize(12),
        fontFamily: fonts.fontRegular,
    },
    placeDistance: {
        marginLeft: globalStyleDefinitions.mt_15.margin / 2,
        fontFamily: fonts.fontSemiBold,
        fontSize: getScaledFontSize(12),
        color: colors.black
    },
    noResultContainer: {
        alignItems: 'center',
        marginTop: 2 * globalStyleDefinitions.mt_15.marginTop,
        paddingHorizontal: globalStyleDefinitions.screenPadding.padding / 2,
    },
    noResultText: {
        fontSize: getScaledFontSize(14),
        fontFamily: fonts.fontRegular,
        marginBottom: globalStyleDefinitions.mt_15.margin / 2,
        textAlign: 'center',
    },
    searchQuery: {
        color: colors.primary,
        fontFamily: fonts.fontSemiBold,
        fontSize: getScaledFontSize(14),
    },
    noResultImage: {
        width: windowWidth * 0.7,
        height: 300,
        marginVertical: globalStyleDefinitions.mt_15.margin,
    },
    noMatches: {
        fontSize: getScaledFontSize(20),
        fontFamily: fonts.fontBold,
        marginBottom: globalStyleDefinitions.mt_15.margin,
    },
    noDescription: {
        textAlign: 'center',
        color: colors.primaryText,
        fontSize: getScaledFontSize(14),
        width: windowWidth * 0.7,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: globalStyleDefinitions.cardInnerPadding.padding,
        borderRadius: globalStyleDefinitions.br_10.borderRadius,
        alignItems: 'center',
    },
    buttonText: {
        color: colors.white,
        fontFamily: fonts.fontSemiBold,
        fontSize: getScaledFontSize(16),
    },
});
