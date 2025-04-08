import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import UserSetupContainer from '../../../components/wrapper/UserSetupContainer';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import { colors } from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';
import { getScaledFontSize } from '../../../constants/globalFunctions';
import { globalStyleDefinitions } from '../../../constants/globalStyleDefinitions';
import { setAccessToken } from '../../../redux/slices/authState';
import { InterestData } from './components/data';
import InterestCard from './components/InterestCard';
import { useNavigation } from '@react-navigation/native';
import { navigationStrings } from '../../../navigation/navigationStrings';

const InterestSelection = () => {
  const navigation :any= useNavigation()

  const [interestsList, setInterestsList] = useState<Array<string>>([]);
  const [filteredData, setFilteredData] = useState<Array<string>>(InterestData);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    if (search.trim()) {
      setFilteredData(
        InterestData.filter(item =>
          item.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    } else {
      setFilteredData(InterestData);
    }
  }, [search]);

  const onNext = () => {
    navigation.navigate(navigationStrings.LocationAllow)
  };

  const renderItem = useCallback(
    ({ item, index }: any) => {
      const onInterestSelect = () => {
        setInterestsList(prev =>
          prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item],
        );
      };
      return (
        <InterestCard
          isSelected={interestsList.includes(item)}
          item={item}
          onSelect={onInterestSelect}
        />
      );
    },
    [interestsList],
  );

  return (
    <WrapperContainer>
      <UserSetupContainer progress={85} onNextPress={onNext}>
        <Text style={styles.titleText}>
          Let us know what you're passionate about!
        </Text>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Add your interests"
          placeholderTextColor={colors.white}
          style={styles.input}
        />
        <View style={styles.seprator} />
        <Text style={styles.subText}>Popular suggestions</Text>

        <FlatList
          data={filteredData}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          horizontal
          scrollEnabled={false}
          contentContainerStyle={styles.listWrapper}
        />
      </UserSetupContainer>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: getScaledFontSize(20),
    color: colors.white,
    fontFamily: fonts.soraSemiBold,
    textAlign: 'center',
    marginBottom:globalStyleDefinitions.commonItemMargin.margin,
  },
  input: {
    fontSize: getScaledFontSize(16),
    lineHeight: getScaledFontSize(20),
    color: colors.white,
    fontFamily: fonts.fontRegular,
    height: 40,
  },
  seprator: {
    height: 1,
    backgroundColor: colors.white,
  },
  subText: {
    fontSize: getScaledFontSize(12),
    color: colors.white,
    fontFamily: fonts.fontRegular,
    marginTop: globalStyleDefinitions.commonItemMargin.margin,
  },
  listWrapper: {
    flexWrap: 'wrap',
    flex: 1,
    gap: globalStyleDefinitions.gap.gap,
    marginTop: globalStyleDefinitions.commonItemMargin.margin,
  },
});

export default InterestSelection;
