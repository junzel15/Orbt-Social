import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import CustomImage from '../../../components/atoms/image/CustomImage';
import {colors} from '../../../constants/colors';
import {imagePath} from '../../../constants/imagePath';
import {fonts} from '../../../constants/fonts';
import {getScaledFontSize} from '../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';
import {windowHeight, windowWidth} from '../../../constants/globalConstants';
import LinearGradient from 'react-native-linear-gradient';
import UpcomingEvent from './components/UpcomingEvent';
import CancelledEvent from './components/CancelledEvent';
import CompletedEvent from './components/CompletedEvent';
import FilterBottomSheet from './components/FilterBottomSheet';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store/state';
import {setBookings} from '../../../redux/slices/bookingSlice';
import {Booking} from '../../../redux/slices/bookingSlice';
import {Auth} from 'aws-amplify';

const MyBookings = () => {
  const [selectedTab, setSelectedTab] = useState('Upcoming');
  const [bookings, setLocalBookings] = useState<Booking[]>([]);
  const uuid = useSelector((state: RootState) => state.userSetup.uuid);
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();
  const refRBSheet = useRef<{open: () => void}>(null!);
  const [sliderValue, setSliderValue] = useState([0, 20]);
  const [selectedEventType, setSelectedEventType] = useState(['Dining']);
  const [selectedPrice, setSelectedPrice] = useState<string | null>('Free');

  const handleTabPress = (tab: string) => setSelectedTab(tab);
  const toggleEventType = (type: any) => {
    setSelectedEventType(prev =>
      prev.includes(type)
        ? prev.filter(item => item !== type)
        : [...prev, type],
    );
  };
  const handleReset = () => {
    setSelectedEventType([]);
    setSelectedPrice(null);
  };

  const refreshBookings = useCallback(async () => {
    try {
      console.log('📥 Fetching bookings for UUID:', uuid);

      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();

      const res = await axios.get(
        `https://v71rq9c35d.execute-api.us-east-1.amazonaws.com/default/booking/user/${uuid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = res.data || [];
      console.log('✅ Bookings fetched:', data);
      setLocalBookings(data);
      dispatch(setBookings(data));
    } catch (err: any) {
      console.error('❌ Failed to fetch bookings:', err.message);
    }
  }, [uuid, dispatch]);

  useEffect(() => {
    if (uuid) {
      refreshBookings();
    }
  }, [uuid, refreshBookings]);

  const upcomingBookings = bookings.filter(b => b.status === 'pending');
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  return (
    <WrapperContainer>
      <LinearGradient
        colors={['#4C0BCE', '#180028', '#000000']}
        locations={[0.0, 0.5, 0.8]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{flex: 0.4}}>
        <View style={styles.header}>
          <View style={styles.rowWrapper}>
            <View style={{flexDirection: 'row'}}>
              <AntDesign
                name="arrowleft"
                size={28}
                color="white"
                onPress={() => navigation.goBack()}
              />
              <Text style={styles.headerTitle}>My Bookings</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => refRBSheet.current?.open()}>
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
              style={{color: colors.white, flex: 1}}
            />
          </View>
        </View>
        <View style={styles.optView}>
          {['Upcoming', 'Completed', 'Cancelled'].map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => handleTabPress(tab)}
              style={[styles.tabItem, selectedTab === tab && styles.activeTab]}>
              <Text
                style={[
                  styles.optText,
                  selectedTab === tab && styles.activeTabText,
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      {selectedTab === 'Upcoming' && (
        <UpcomingEvent
          data={upcomingBookings}
          refreshBookings={refreshBookings}
        />
      )}
      {selectedTab === 'Completed' && (
        <CompletedEvent data={completedBookings} />
      )}
      {selectedTab === 'Cancelled' && (
        <CancelledEvent data={cancelledBookings} />
      )}

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
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: colors.white,
    fontSize: getScaledFontSize(22),
    fontFamily: fonts.fontSemiBold,
    marginLeft: globalStyleDefinitions.mb_10.marginBottom,
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
    borderTopRightRadius: globalStyleDefinitions.br_10.borderRadius,
    borderTopLeftRadius: globalStyleDefinitions.br_10.borderRadius,
  },
  activeTabText: {
    color: colors.primary,
    fontSize: getScaledFontSize(14),
    fontFamily: fonts.fontMedium,
  },
});

export default MyBookings;
