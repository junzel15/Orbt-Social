import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import UserSetupContainer from '../../../components/wrapper/UserSetupContainer';
import {colors} from '../../../constants/colors';
import {fonts} from '../../../constants/fonts';
import {getScaledFontSize} from '../../../constants/globalFunctions';
import GenderSelectionCard from './components/GenderSelectionCard';
import {Gender} from './components/data';
import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';
import {navigationStrings} from '../../../navigation/navigationStrings';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store/state';
import axios from 'axios';
import {Auth} from 'aws-amplify';

const GenderSelection = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [selectedGender, setSelectedGender] = useState<string>('Male');
  const {uuid} = useSelector((state: RootState) => state.userSetup);

  const onNext = async () => {
    try {
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();

      await axios.put(
        `https://du3kce1sli.execute-api.us-east-1.amazonaws.com/default/profile/${uuid}`,
        {
          gender: selectedGender,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      navigation.navigate(navigationStrings.BirthdaySelection);
    } catch (err) {
      console.error('❌ Gender put failed:', err);
    }
  };

  const renderItem = useCallback(
    ({item}: any) => {
      const onSelect = () => setSelectedGender(item?.title);
      return (
        <GenderSelectionCard
          isSelected={selectedGender == item?.title}
          item={item}
          onSelect={onSelect}
        />
      );
    },
    [selectedGender],
  );

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
    textAlign: 'center',
    marginBottom: globalStyleDefinitions.commonItemMargin.margin,
  },
});

export default GenderSelection;
