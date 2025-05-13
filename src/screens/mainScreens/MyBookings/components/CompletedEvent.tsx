import React, {useState, useMemo} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearWrapperContainer from '../../../../components/wrapper/LinearWrapperContainer';
import commonStyles from '../../../../constants/commonStyles';
import {colors} from '../../../../constants/colors';
import {getScaledFontSize} from '../../../../constants/globalFunctions';
import {fonts} from '../../../../constants/fonts';
import {globalStyleDefinitions} from '../../../../constants/globalStyleDefinitions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import dayjs from 'dayjs';

interface Booking {
  booking_id: string;
  booking_date: string;
  booking_time: string;
  location: string;
  booking_type: string;
  status: string;
}

const CompletedEvent = ({data}: {data: Booking[]}) => {
  const [selectedFilter, setSelectedFilter] = useState('Recents');

  const filteredData = useMemo(() => {
    const today = dayjs();
    if (selectedFilter === 'Recents') {
      return data.filter(item =>
        dayjs(item.booking_date).isAfter(today.subtract(7, 'day')),
      );
    }
    if (selectedFilter === 'This Month') {
      return data.filter(item =>
        dayjs(item.booking_date).isSame(today, 'month'),
      );
    }
    if (selectedFilter === 'Older Events') {
      return data.filter(item =>
        dayjs(item.booking_date).isBefore(today.startOf('month')),
      );
    }
    return data;
  }, [data, selectedFilter]);

  const getCount = (label: string) => {
    const today = dayjs();
    if (label === 'Recents') {
      return data.filter(item =>
        dayjs(item.booking_date).isAfter(today.subtract(7, 'day')),
      ).length;
    }
    if (label === 'This Month') {
      return data.filter(item =>
        dayjs(item.booking_date).isSame(today, 'month'),
      ).length;
    }
    if (label === 'Older Events') {
      return data.filter(item =>
        dayjs(item.booking_date).isBefore(today.startOf('month')),
      ).length;
    }
    return 0;
  };

  return (
    <LinearWrapperContainer>
      <View style={commonStyles.fullInnerContainer}>
        <View style={styles.filterRow}>
          {['Recents', 'This Month', 'Older Events'].map(label => {
            const isSelected = selectedFilter === label;
            const count = getCount(label);
            return (
              <TouchableOpacity
                key={label}
                onPress={() => setSelectedFilter(label)}
                style={[
                  styles.filterButton,
                  isSelected && styles.activeFilter,
                ]}>
                <View style={styles.filterContent}>
                  <Text
                    style={[
                      styles.filterText,
                      isSelected && styles.activeFilterText,
                    ]}>
                    {label}
                  </Text>
                  <View
                    style={[
                      styles.badgeContainer,
                      isSelected && styles.badgeContainerActive,
                    ]}>
                    <Text
                      style={[
                        styles.badgeText,
                        isSelected && styles.badgeTextActive,
                      ]}>
                      {count}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredData.map(item => (
            <View key={item.booking_id} style={styles.card}>
              <View style={styles.row}>
                <View style={styles.iconWrapper}>
                  <AntDesign name="enviromento" size={20} color="white" />
                </View>
                <Text style={styles.title}>{item.booking_type}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.bottomRow}>
                <View>
                  <Text style={styles.text}>{item.booking_date}</Text>
                  <Text style={styles.text}>{item.booking_time}</Text>
                  <Text style={styles.text}>{item.location}</Text>
                </View>
                <TouchableOpacity style={styles.coffeeTag}>
                  <Text style={styles.coffeeText}>Dining</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.footer}>
                <Text style={styles.status}>Booking Completed!</Text>
                <Text style={styles.bookingId}>{item.booking_id}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </LinearWrapperContainer>
  );
};

export default CompletedEvent;

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
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: colors.white,
    fontSize: getScaledFontSize(22),
    fontFamily: fonts.fontSemiBold,
    marginLeft: 10,
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
        shadowOffset: {width: 0, height: 3},
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
    fontFamily: fonts.fontRegular,
  },
  badgeTextActive: {
    color: colors.white,
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
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coffeeText: {
    fontSize: 12,
    paddingHorizontal: 18,
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: globalStyleDefinitions.mt_15.margin,
  },
  card: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 12,
    padding: 16,
    backgroundColor: colors.white,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
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
    backgroundColor: colors.black,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: globalStyleDefinitions.mt_8.marginTop,
  },
  title: {
    fontSize: getScaledFontSize(14),
    flex: 1,
    fontFamily: fonts.fontMedium,
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
    justifyContent: 'space-between',
  },
  footer: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    color: colors.primary,
    fontSize: getScaledFontSize(12),
    fontFamily: fonts.fontSemiBold,
  },
  bookingId: {
    color: colors.black,
    fontFamily: fonts.fontSemiBold,
  },
});
