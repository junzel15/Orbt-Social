import React, { useState } from 'react';
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

const MyBookings = () => {
  const [selectedTab, setSelectedTab] = useState('Upcoming');
    const navigation = useNavigation<NavigationProp<any>>();

  const handleTabPress = (tab: any) => {
    setSelectedTab(tab);
  };

  const onBackPress = () => {
    navigation.goBack();
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
              <AntDesign name="arrowleft" size={28} color="white"  onPress={onBackPress} />
              <Text style={styles.headerTitle}>My Bookings</Text>
            </View>
            <TouchableOpacity activeOpacity={0.9}>
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
      android: 2 * globalStyleDefinitions.screenPadding.padding,
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  activeTab: {
    backgroundColor: colors.white,
  },
  activeTabText: {
    color: colors.primary,
    fontSize: getScaledFontSize(14),
    fontFamily: fonts.fontMedium,
  },
});

export default MyBookings;
