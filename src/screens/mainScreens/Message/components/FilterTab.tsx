import React, {memo, useCallback} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../../constants/colors';
import {fonts} from '../../../../constants/fonts';
import {getScaledFontSize} from '../../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../../constants/globalStyleDefinitions';

interface iProps {
  data: Array<any>;
  onSelectTab: (tab: string) => void;
  selectedTab: string;
}

const FilterTab = ({data, onSelectTab, selectedTab}: iProps) => {
  const allCount = data.length;
  const directCount = data.filter(item => !item?.isGroup).length;
  const groupCount = data.filter(item => item?.isGroup).length;

  const Tabs = [
    {name: `All`, count: allCount},
    {name: `Direct`, count: directCount},
    {name: `Group Chat`, count: groupCount},
  ];

  const renderItem = useCallback(
    ({item}: any) => {
      const onItemSelect = () => {
        onSelectTab(item?.name);
      };
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onItemSelect}
          style={[
            styles.tabContainer,
            selectedTab == item?.name && styles.selectedContainer,
          ]}>
          <Text
            style={[
              styles.text,
              selectedTab == item.name && styles.selectedText,
            ]}>
            {item?.name}
          </Text>
          <View
            style={[
              styles.countWrapper,
              selectedTab == item.name && styles.selectedCountWrapper,
            ]}>
            <Text
              style={[
                styles.text,
                selectedTab == item.name && styles.selectedText,
              ]}>
              {item?.count}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [selectedTab],
  );
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={Tabs}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    borderRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
    paddingHorizontal: globalStyleDefinitions.cardInnerPadding.padding,
    paddingVertical: 0.5 * globalStyleDefinitions.cardInnerPadding.padding,
    backgroundColor: colors.white,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
    shadowColor: colors.black,
    marginVertical: globalStyleDefinitions.commonItemMargin.margin,
    marginHorizontal: 0.5 * globalStyleDefinitions.gap.gap,
    flexDirection: 'row',
    alignItems: 'center',
    gap: globalStyleDefinitions.gap.gap,
  },
  selectedContainer: {
    backgroundColor: colors.black,
  },
  text: {
    fontFamily: fonts.fontRegular,
    fontSize: getScaledFontSize(12),
    lineHeight: getScaledFontSize(17),
    color: colors.black,
  },
  selectedText: {
    fontFamily: fonts.fontSemiBold,
    color: colors.white,
  },
  countWrapper: {
    height: 20,
    width: 20,
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.appBackground,
  },
  selectedCountWrapper: {
    backgroundColor: colors.primary,
  },
});

export default memo(FilterTab);
