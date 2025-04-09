import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalStyleDefinitions } from '../../../../constants/globalStyleDefinitions';
import { colors } from '../../../../constants/colors';
import { fonts } from '../../../../constants/fonts';

const GenderDropdown = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('male');
  const [items, setItems] = useState([
    {
      label: 'Male',
      value: 'male',
      icon: () => <Icon name="gender-male" size={18} color="#888" />,
    },
    {
      label: 'Female',
      value: 'female',
      icon: () => <Icon name="gender-female" size={18} color="#888" />,
    },
  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownBox}
        textStyle={styles.textStyle}
        placeholder="Select Gender"
        showArrowIcon
        // listItemLabelStyle={styles.itemLabel}
        arrowIconStyle={styles.arrowIcon}
        listMode="SCROLLVIEW"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    marginTop:globalStyleDefinitions.mt_15.marginTop
  },
  dropdown: {
    borderRadius: 12,
    borderColor: colors.borderColor,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    height: 50,
  },
  dropdownBox: {
    borderRadius: 12,
    borderColor: colors.borderColor,
    backgroundColor: colors.white,
  },
  textStyle: {
    fontSize: 16,
    fontFamily:fonts.fontRegular
  },
  arrowIcon: {
    tintColor: '#999',
  },
});

export default GenderDropdown;
