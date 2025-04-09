import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import CustomImage from '../../../components/atoms/image/CustomImage';
import { colors } from '../../../constants/colors';
import { imagePath } from '../../../constants/imagePath';
import { fonts } from '../../../constants/fonts';
import { getScaledFontSize } from '../../../constants/globalFunctions';
import { globalStyleDefinitions } from '../../../constants/globalStyleDefinitions';
import { windowHeight, windowWidth } from '../../../constants/globalConstants';
import LinearGradient from 'react-native-linear-gradient';
import UpcomingEvent from './components/UpcomingEvent';
import CompletedEvent from './components/CompletedEvent';
import CancelledEvent from './components/CancelledEvent';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import FilterBottomSheet from './components/FilterBottomSheet';


const MyBookings = () => {
  const [selectedTab, setSelectedTab] = useState('Upcoming');
  const navigation = useNavigation<NavigationProp<any>>();
  const refRBSheet = useRef();
  const [sliderValue, setSliderValue] = useState([0, 20]);
  const [selectedEventType, setSelectedEventType] = useState(['Dining']);
  const [selectedPrice, setSelectedPrice] = useState('Free');

  const handleTabPress = (tab: any) => {
    setSelectedTab(tab);
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  const toggleEventType = (type : any) => {
    setSelectedEventType((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const handleReset = () => {
    setSelectedEventType([]);
    setSelectedPrice(null);
  };

  return (
    <WrapperContainer>
      <LinearGradient
        colors={['#4C0BCE', '#180028', '#000000']}
        locations={[0.0, 0.5, 0.8]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 0.4 }}
      >
        <View style={styles.header}>
          <View style={styles.rowWrapper}>
            <View style={{ flexDirection: 'row' }} >
              <AntDesign name="arrowleft" size={28} color="white" onPress={onBackPress} />
              <Text style={styles.headerTitle}>My Bookings</Text>
            </View>
            <TouchableOpacity activeOpacity={0.9} onPress={() => refRBSheet.current.open()} >
              <CustomImage url={imagePath.filter} height={25} width={25} />
            </TouchableOpacity>
          </View>
          <View style={styles.searchView}>
            <AntDesign
              name="search1"
              size={20}
              color="white"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search Events, Dates, Places ..."
              placeholderTextColor={colors.white}
            />
          </View>
        </View>
        <View style={styles.optView}>
          {['Upcoming', 'Completed', 'Cancelled'].map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => handleTabPress(tab)}
              style={[
                styles.tabItem,
                selectedTab === tab && styles.activeTab,
              ]}
            >
              <Text
                style={[
                  styles.optText,
                  selectedTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
      {selectedTab === 'Upcoming' && <UpcomingEvent />}
      {selectedTab === 'Completed' && <CompletedEvent
        name="Brew & Co."
        date="Thursday, March 14, 2024"
        time="10:30 AM"
        location="Makati City, Philippines"
        status="Booking Completed!"
        id="ORBT-BR0001"
      />}
      {selectedTab === 'Cancelled' && <CancelledEvent
        name="The Bolthole Bar"
        date="Thursday, March 14, 2024"
        time="10:30 AM"
        location="Makati City, Philippines"
        status="Booking Completed!"
        id="ORBT-BR0001"
      />}
      <FilterBottomSheet
      refRBSheet={refRBSheet}
      sliderValue={sliderValue}
      setSliderValue={setSliderValue}
      selectedEventType={selectedEventType}
      toggleEventType={toggleEventType}
      selectedPrice={selectedPrice}
      setSelectedPrice={setSelectedPrice}
      handleReset={handleReset}
      />
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: globalStyleDefinitions.screenPadding.padding,
  },
  rowWrapper: {
    flexDirection: 'row',
    gap: globalStyleDefinitions.gap.gap,
    marginTop: Platform.select({
      ios: 3 * globalStyleDefinitions.screenPadding.padding,
      android: 2.5 * globalStyleDefinitions.screenPadding.padding,
    }),
    justifyContent: 'space-between'
  },
  headerTitle: {
    color: colors.white,
    fontSize: getScaledFontSize(22),
    fontFamily: fonts.fontSemiBold,
    marginLeft: globalStyleDefinitions.mb_10.marginBottom
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
    marginRight: globalStyleDefinitions.mr_10.marginRight,
  },
  optView: {
    flexDirection: 'row',
    marginTop: 4 * globalStyleDefinitions.mt_10.marginTop,
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
    borderTopRightRadius:globalStyleDefinitions.br_10.borderRadius,borderTopLeftRadius:globalStyleDefinitions.br_10.borderRadius
  },
  activeTabText: {
    color: colors.primary,
    fontSize: getScaledFontSize(14),
    fontFamily: fonts.fontMedium,
  },
  headerBottomSheet: {
    alignSelf: 'center',
    fontSize: getScaledFontSize(18),
    fontFamily: fonts.fontSemiBold
  },
  optHeader: {
    fontSize: getScaledFontSize(14),
    fontFamily: fonts.fontBold,
    marginTop: 1.5 * globalStyleDefinitions.mt_15.marginTop
  },
  inputLocation: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.lightgray,
    height: windowHeight / 15,
    borderRadius: 15,
    marginTop: globalStyleDefinitions.mt_15.marginTop,
    padding: globalStyleDefinitions.screenPadding.padding / 2
  },
  slider: {
    width: '100%',
    height: 40,
  },
  floatingLabel: {
    position: 'absolute',
    bottom: 290,
    width: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 2,
    elevation: 3,
    zIndex: 10,
  },
  floatingText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  customMarkerContainer: {
    alignItems: 'center',
  },
  markerLabel: {
    fontSize: 12,
    color: colors.primary,
  },
  marker: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    marginTop: 2 * globalStyleDefinitions.mt_10.marginTop
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
    color: '#000',
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: globalStyleDefinitions.mt_15.marginTop,
  },
  priceOption: {
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lighGrey,
    alignItems: 'center',
    paddingHorizontal:20
  },
  priceOptionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.lighGrey
  },
  priceText: {
    fontSize: getScaledFontSize(14),
    fontFamily:fonts.fontSemiBold,
    color:colors.black
  },
  priceTextSelected: {
    color: colors.white,
    fontSize: getScaledFontSize(14),
    fontFamily:fonts.fontSemiBold,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: globalStyleDefinitions.mt_15.marginTop,
  },
  resetButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  resetText: {
    fontSize: getScaledFontSize(16),
    fontFamily:fonts.fontSemiBold
  },
  applyButton: {
    flex: 1,
    backgroundColor:colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginLeft: 10,
  },
  applyText: {
    fontSize: getScaledFontSize(16),
    fontFamily:fonts.fontSemiBold,
    color:colors.white
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    height: 30,
    width: 30,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: globalStyleDefinitions.mt_8.marginTop
  },
  iconBoxSelected: {
    backgroundColor: colors.primary,
  },
  iconBoxUnselected: {
    borderWidth: 1,
    borderColor: colors.lighGrey,
    backgroundColor: 'transparent',
  },
  checkboxLabel: {
    fontSize: getScaledFontSize(14),
    fontFamily:fonts.fontMedium
  }
  
});

export default MyBookings;
