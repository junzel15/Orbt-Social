import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../../../constants/colors';
import {fonts} from '../../../../constants/fonts';
import {getScaledFontSize} from '../../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../../constants/globalStyleDefinitions';
import {days, months, years} from './data';

interface iProps {
  date: Date;
  setDate: (date: Date) => void;
}

const CalendarCard = ({date, setDate}: iProps) => {
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');

  useEffect(() => {
    if (date) {
      setMonth(`${months[date.getMonth()].label}`);
      setYear(`${new Date(date).getFullYear()}`);
    }
  }, [date]);

  const onMonthChange = (item: any) => {
    const newDate = new Date(date.getFullYear(), item.value, 1);
    setMonth(item?.label);
    setDate(newDate);
  };

  const onYearChange = (item: any) => {
    const newDate = new Date(item.value, date.getMonth(), 1);
    setYear(item?.label);
    setDate(newDate);
  };

  const getDaysInMonth = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstDayOfWeek = (firstDay.getDay() + 6) % 7;
    let days = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const ListHeaderComponent = () => {
    return (
      <View style={styles.dateHeaderContainer}>
        {days?.map((item, index) => (
          <Text style={styles.dayText} key={index}>
            {item}
          </Text>
        ))}
      </View>
    );
  };

  const renderCalendarDays = () => {
    const days = getDaysInMonth();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const onPress = (day: number) => {
      const selectedDate = new Date(date.getFullYear(), date.getMonth(), day);
      setDate(selectedDate);
    };

    return (
      <View style={styles.calendarGrid}>
        {days.map((day, index) => {
          if (!day) {
            return <View key={index} style={styles.dateContainer} />;
          }

          return (
            <View key={index} style={styles.dateContainer}>
              {day && (
                <TouchableOpacity
                  style={[
                    styles.dayButton,
                    date.getDate() == day && styles.todayButton,
                  ]}
                  activeOpacity={0.9}
                  onPress={() => onPress(day)}>
                  <Text style={[styles.dayText, {width: '100%'}]}>{day}</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.rowWrapper}>
        <Dropdown
          data={months}
          labelField={'label'}
          valueField={'label'}
          onChange={onMonthChange}
          style={styles.dropdownWrapper}
          containerStyle={styles.dropdownContainer}
          itemTextStyle={styles.dropdownText}
          selectedTextStyle={styles.selectedText}
          value={month}
          activeColor={colors.primary}
          showsVerticalScrollIndicator={false}
          iconColor={colors.white}
        />
        <Dropdown
          data={years}
          labelField={'label'}
          valueField={'label'}
          onChange={onYearChange}
          style={[styles.dropdownWrapper, {width: '40%'}]}
          containerStyle={styles.dropdownContainer}
          itemTextStyle={styles.dropdownText}
          selectedTextStyle={styles.selectedText}
          value={year}
          activeColor={colors.primary}
          showsVerticalScrollIndicator={false}
          iconColor={colors.white}
        />
      </View>
      {ListHeaderComponent()}
      <View>{renderCalendarDays()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    borderColor: colors.white,
    borderWidth: 1,
    marginTop: globalStyleDefinitions.mt_15.marginTop,
    padding: globalStyleDefinitions.cardInnerPadding.padding,
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
  },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',justifyContent:'space-between'
  },
  dateHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: globalStyleDefinitions.mt_15.marginTop,
  },
  dayText: {
    fontSize: getScaledFontSize(12),
    fontFamily: fonts.fontBold,
    color: colors.white,
    width: '14.28%',
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dateContainer: {
    width: '14.28%',
    alignSelf: 'center',
  },
  dayButton: {
    alignItems: 'center',
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 5,
    borderRadius: 0.5 * globalStyleDefinitions.br_10.borderRadius,
  },
  todayButton: {
    backgroundColor: colors.primary,
  },
  dropdownWrapper: {
    width:'55%',
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.white,
    paddingHorizontal: globalStyleDefinitions.cardInnerPadding.padding,
    height: 40,
    borderRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
  },
  dropdownContainer: {
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
    overflow: 'hidden',
  },
  dropdownText: {
    color: colors.white,
    fontSize: getScaledFontSize(14),
    fontFamily: fonts.fontRegular,
  },
  selectedText: {
    color: colors.white,
    fontSize: getScaledFontSize(14),
    fontFamily: fonts.fontSemiBold,
  },
});

export default memo(CalendarCard);
