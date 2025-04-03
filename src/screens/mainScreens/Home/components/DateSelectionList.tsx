import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../../constants/colors';
import {fonts} from '../../../../constants/fonts';
import {getScaledFontSize} from '../../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../../constants/globalStyleDefinitions';
import {BookindDate} from './data';

interface iProps {
  selectedDate: string;
  setSelectedDate: (text: string) => void;
}

const DateSelectionList = ({selectedDate, setSelectedDate}: iProps) => {
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const onDropdownToggle = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const renderItem = useCallback(
    ({item, index}: any) => {
      const onItemSelect = () => {
        setSelectedDate(item.value);
        setDropdownVisible(false);
      };
      return (
        <TouchableOpacity
          style={[
            styles.dropdownItem,
            selectedDate == item.value && styles.selectedItem,
          ]}
          activeOpacity={1}
          onPress={onItemSelect}>
          <Text style={styles.dropdownText}>{item.label}</Text>
          <Text style={styles.subText}>10:00 AM</Text>
        </TouchableOpacity>
      );
    },
    [selectedDate],
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.dropdown,
          isDropdownVisible && styles.openedDropdown,
          selectedDate?.trim() && styles.selectedItem,
        ]}
        activeOpacity={1}
        onPress={onDropdownToggle}>
        <Text
          style={
            selectedDate?.trim() ? styles.dropdownText : styles.placeholder
          }>
          {selectedDate || 'Select a date'}
        </Text>
        <Ionicons
          name={
            isDropdownVisible ? 'chevron-up-outline' : 'chevron-down-outline'
          }
          size={20}
          color={colors.white}
        />
      </TouchableOpacity>

      {isDropdownVisible && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={BookindDate}
            keyExtractor={item => item.value}
            renderItem={renderItem}
            style={styles.listWrapper}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 2 * globalStyleDefinitions.mt_15.marginTop,
  },
  dropdown: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
    paddingHorizontal: globalStyleDefinitions.cardInnerPadding.padding,
  },
  openedDropdown: {
    borderTopLeftRadius: globalStyleDefinitions.br_10.borderRadius,
    borderTopRightRadius: globalStyleDefinitions.br_10.borderRadius,
    borderRadius: 0,
  },
  dropdownText: {
    color: colors.white,
    fontFamily: fonts.fontSemiBold,
    fontSize: getScaledFontSize(14),
    flex: 1,
  },
  placeholder: {
    color: colors.white,
    fontFamily: fonts.fontRegular,
    fontSize: getScaledFontSize(14),
    flex: 1,
  },
  dropdownContainer: {
    borderBottomLeftRadius: globalStyleDefinitions.br_10.borderRadius,
    borderBottomRightRadius: globalStyleDefinitions.br_10.borderRadius,
    borderLeftColor: colors.white,
    borderLeftWidth: 1,
    borderRightColor: colors.white,
    borderRightWidth: 1,
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: globalStyleDefinitions.cardInnerPadding.padding,
    borderTopWidth: 1,
    borderTopColor: colors.white,
  },
  selectedItem: {
    backgroundColor: colors.primary + '40',
  },
  subText: {
    color: colors.white,
    fontFamily: fonts.fontRegular,
    fontSize: getScaledFontSize(12),
    marginTop: 5,
  },
  listWrapper: {
    maxHeight: 250,
  },
});

export default DateSelectionList;
