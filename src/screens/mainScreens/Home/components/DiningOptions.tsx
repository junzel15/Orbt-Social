import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DiningData } from './data';
import { globalStyleDefinitions } from '../../../../constants/globalStyleDefinitions';
import { colors } from '../../../../constants/colors';
import { fonts } from '../../../../constants/fonts';
import { getScaledFontSize } from '../../../../constants/globalFunctions';

interface DiningOptionsProps {
  selected: string;
  onSelect: (label: string) => void;
}

const DiningOptions: React.FC<DiningOptionsProps> = ({ selected, onSelect }) => {

  return (
    <View style={styles.listWrapper}>
      {DiningData.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            onSelect(item.label)
          }}
          activeOpacity={0.9}
          style={[
            styles.listContainer,
            selected === item.label && styles.selectedItem,
          ]}>
          <Text
            style={[
              styles.listText,
              selected === item.label && styles.selectedText,
            ]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: globalStyleDefinitions.gap.gap,
    marginTop: 2 * globalStyleDefinitions.mt_15.marginTop,
  },
  listContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
  },
  selectedItem: {
    backgroundColor: colors.white,
  },
  listText: {
    color: colors.white,
    fontFamily: fonts.fontSemiBold,
    fontSize: getScaledFontSize(14),
  },
  selectedText: {
    color: colors.black,
  },
});

export default DiningOptions;
