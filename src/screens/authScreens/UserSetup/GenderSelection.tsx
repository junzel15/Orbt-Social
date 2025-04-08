import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import UserSetupContainer from '../../../components/wrapper/UserSetupContainer';
import {colors} from '../../../constants/colors';
import {fonts} from '../../../constants/fonts';
import {getScaledFontSize} from '../../../constants/globalFunctions';
import GenderSelectionCard from './components/GenderSelectionCard';
import {Gender} from './components/data';
import { globalStyleDefinitions } from '../../../constants/globalStyleDefinitions';
import { navigationStrings } from '../../../navigation/navigationStrings';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';

const GenderSelection = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const [selectedGender, setSelectedGender] = useState<string>('Male');

  const onNext = () => {
    navigation.navigate(navigationStrings.BirthdaySelection)
  };

  const renderItem = useCallback(({item, index}: any) => {
    const onSelect = () => {
      setSelectedGender(item?.title);
    };
    return (
      <GenderSelectionCard
        isSelected={selectedGender == item?.title}
        item={item}
        onSelect={onSelect}
      />
    );
  }, [selectedGender]);

  return (
    <WrapperContainer>
    <UserSetupContainer progress={10} onNextPress={onNext}>
      <Text style={styles.titleText}>How do you identify?</Text>
      <FlatList
        data={Gender}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
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
    textAlign: 'center',marginBottom:globalStyleDefinitions.commonItemMargin.margin
  },
});

export default GenderSelection;
