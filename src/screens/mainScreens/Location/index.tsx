import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import {colors} from '../../../constants/colors';
import {fonts} from '../../../constants/fonts';
import {windowWidth} from '../../../constants/globalConstants';
import {getScaledFontSize} from '../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';
import {imagePath} from '../../../constants/imagePath';
import {allPlaces, recentPlacesList} from './components/data';
import commonStyles from '../../../constants/commonStyles';
import CommonButton from '../../../components/atoms/button/CommonButton';

const Location = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const [location, setLocation] = useState<string>('');
  const [filteredPlaces, setFilteredPlaces] = useState<Array<any>>(allPlaces);
  const [recentPlaces, setRecentPlaces] =
    useState<Array<any>>(recentPlacesList);

  const onBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (location.trim() === '') {
      setFilteredPlaces(allPlaces);
    } else {
      const results = allPlaces.filter(item =>
        item.title.toLowerCase().includes(location.toLowerCase()),
      );
      setFilteredPlaces(results);
    }
  }, [location]);

  const showNoResults = location.trim() !== '' && filteredPlaces.length === 0;

  const onClearAllPress = () => {
    setRecentPlaces([]);
  };

  const SinglePlaceItem = useCallback(
    ({item}: any) => (
      <TouchableOpacity style={styles.placeItem}>
        <Icon
          name="clock"
          size={18}
          color={colors.mediumgray}
          style={{marginRight: 10}}
        />
        <View style={{flex: 1}}>
          <Text style={styles.placeTitle}>{item.title}</Text>
          <Text style={styles.placeAddress}>{item.address}</Text>
        </View>
        <Text style={styles.placeDistance}>{item.distance}</Text>
      </TouchableOpacity>
    ),
    [],
  );

  const listKeyExtractor = useCallback((item: any, index: any) => {
    return index.toString();
  }, []);

  const listKeyExtractor2 = useCallback((item: any, index: any) => {
    return index.toString();
  }, []);

  const onLocationClose = () => {
    setLocation('');
  };

  return (
    <WrapperContainer>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBackPress}>
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
            placeholderTextColor={colors.placeholderColor}
          />
          {location.length > 0 && (
            <TouchableOpacity onPress={onLocationClose} activeOpacity={0.9}>
              <Icon name="x" size={20} color="gray" />
            </TouchableOpacity>
          )}
        </View>
       <View style={commonStyles.flexFull}>
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
            style={{marginTop: 20}}
          />
        )}
        {showNoResults && (
          <View style={styles.noResultContainer}>
            <Text style={styles.noResultText}>
              Results for “<Text style={styles.searchQuery}>{location}</Text>” —
              0 results
            </Text>
            <Image
              source={imagePath.layre}
              style={styles.noResultImage}
              resizeMode="contain"
            />
            <Text style={styles.noMatches}>Oops, No Matches!</Text>
            <Text style={styles.noDescription}>
              Looks like we couldn’t find anything for that keyword.
              Double-check your spelling or try a new search!
            </Text>
          </View>
        )}
       </View>

        <CommonButton title={'Add Address'}  />
      </View>
    </WrapperContainer>
  );
};

export default Location;

const styles = StyleSheet.create({
  mainContainer: {
    padding: globalStyleDefinitions.screenPadding.padding,
    paddingTop: Platform.select({
      ios: 3 * globalStyleDefinitions.screenPadding.padding,
      android: 2.5 * globalStyleDefinitions.screenPadding.padding,
    }),
    backgroundColor: colors.white,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: globalStyleDefinitions.mt_15.margin,
    gap: globalStyleDefinitions.gap.gap,
  },
  headerTitle: {
    fontSize: getScaledFontSize(20),
    fontFamily: fonts.fontSemiBold,
  },
  inputBox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.CharcoalGrey,
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
    padding: globalStyleDefinitions.screenPadding.padding / 2,
    alignItems: 'center',
    gap: globalStyleDefinitions.gap.gap,
  },
  input: {
    flex: 1,
    fontSize: getScaledFontSize(14),
    color: colors.black,
  },
  recentSection: {
    marginTop: globalStyleDefinitions.mt_15.margin,
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
    marginBottom: 4,
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
    color: colors.black,
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
