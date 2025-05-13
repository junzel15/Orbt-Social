import {NavigationProp, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import CustomInput from '../../../components/atoms/input/CustomInput';
import UserSetupContainer from '../../../components/wrapper/UserSetupContainer';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import {colors} from '../../../constants/colors';
import {fonts} from '../../../constants/fonts';
import {getScaledFontSize} from '../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';
import {iconPath} from '../../../constants/iconPath';
import {navigationStrings} from '../../../navigation/navigationStrings';
import CalendarCard from './components/CalendarCard';
import {useSelector} from 'react-redux';
import {Auth} from 'aws-amplify';
import axios from 'axios';
import {RootState} from '../../../redux/store/state';

const BirthdaySelection = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [date, setDate] = useState<Date>(new Date());
  const {uuid} = useSelector((state: RootState) => state.userSetup);

  const onNext = async () => {
    const birthdate = date.toISOString().split('T')[0];

    try {
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();

      await axios.put(
        `https://du3kce1sli.execute-api.us-east-1.amazonaws.com/default/profile/${uuid}`,
        {birthdate},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      navigation.navigate(navigationStrings.AboutMe);
    } catch (err) {
      console.error('❌ Failed to save birthdate:', err);
    }
  };

  return (
    <WrapperContainer>
      <UserSetupContainer progress={35} onNextPress={onNext}>
        <Text style={styles.titleText}>When is your birthday?</Text>
        <CustomInput
          value={moment(date).format('DD/MM/YYYY')}
          icon={iconPath.calendar}
          iconColor={colors.white}
          editable={false}
          customStyle={styles.inputContainer}
          customTextStyles={styles.input}
        />
        <CalendarCard date={date} setDate={setDate} />
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
  inputContainer: {
    borderColor: colors.white,
    backgroundColor: 'transparent',
  },
  input: {
    color: colors.white,
    fontSize: getScaledFontSize(16),
  },
});

export default BirthdaySelection;
