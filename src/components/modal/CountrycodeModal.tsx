import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../constants/colors';
import {countryCodes} from '../../constants/countryCodes';
import {fonts} from '../../constants/fonts';
import {windowHeight, windowWidth} from '../../constants/globalConstants';
import {getScaledFontSize} from '../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../constants/globalStyleDefinitions';

interface iProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (code: any) => void;
}

const CountrycodeModal = ({onClose, onSelect, visible}: iProps) => {
  const [search, setSearch] = useState<string>('');
  const [filteredList, setFilteredList] = useState<Array<any>>([]);

  useEffect(() => {
    setSearch('');
    getCountryList();
  }, [visible]);

  const getCountryList = () => {
    setFilteredList(countryCodes);
  };

  useEffect(() => {
    if (!search.trim()) {
      setFilteredList(countryCodes);
    } else {
      const lowerSearch = search.toLowerCase();
      const filtered = countryCodes.filter(
        item =>
          item?.name.toLowerCase().includes(lowerSearch) ||
          item?.dial_code.includes(search),
      );
      setFilteredList(filtered);
    }
  }, [search, countryCodes]);

  const renderItem = useCallback(({item, index}: any) => {
    const onSelectCountry = () => {
      onSelect({code:item?.dial_code,flag:item?.flag});
    };

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onSelectCountry}
        style={styles.cardContainer}>
        <Text style={styles.flagText}>{item?.flag}</Text>
        <Text style={styles.codeText}>{item?.dial_code}</Text>
        <Text style={styles.countryText} numberOfLines={1}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  }, []);

  const onStartShouldSetResponder = () => {
    onClose();
    return false;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View
          style={styles.backdrop}
          onStartShouldSetResponder={onStartShouldSetResponder}
        />
        <View style={styles.modalContainer}>
          <TextInput
            placeholder="Search your country"
            placeholderTextColor={colors.placeholderColor}
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />
          <FlatList
            data={filteredList}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
    backgroundColor: colors.black + '50',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: windowWidth,
    backgroundColor: colors.white,
    borderTopLeftRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
    borderTopRightRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
    paddingHorizontal: globalStyleDefinitions.screenPadding.padding,
    height: windowHeight * 0.5,
    padding: 10,
    zIndex: 999,
  },
  input: {
    backgroundColor: colors.white,
    color: colors.black,
    fontFamily: fonts.fontRegular,
    fontSize: getScaledFontSize(14),
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    padding: 5,
  },
  cardContainer: {
    paddingHorizontal: globalStyleDefinitions.cardInnerPadding.padding,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginVertical: 2,
  },
  flagText: {
    fontSize: getScaledFontSize(16),
    color: colors.white,
    flex: 0.2,
  },
  codeText: {
    color: colors.primaryText,
    fontFamily: fonts.fontRegular,
    fontSize: getScaledFontSize(14),
    flex: 0.3,
  },
  countryText: {
    color: colors.primaryText,
    fontFamily: fonts.fontRegular,
    fontSize: getScaledFontSize(14),
    flex: 1,
  },
});

export default memo(CountrycodeModal);
