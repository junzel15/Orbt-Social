import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';
import UserSetupContainer from '../../../components/wrapper/UserSetupContainer';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import {colors} from '../../../constants/colors';
import {fonts} from '../../../constants/fonts';
import {getScaledFontSize} from '../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';
import {navigationStrings} from '../../../navigation/navigationStrings';
import {useSelector} from 'react-redux';

import {Auth} from 'aws-amplify';
import axios from 'axios';
import {RootState} from '../../../redux/store/state';

const AboutMe = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [about, setAbout] = useState<string>('');
  const {uuid} = useSelector((state: RootState) => state.userSetup);

  const onNext = async () => {
    try {
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();

      await axios.put(
        `https://du3kce1sli.execute-api.us-east-1.amazonaws.com/default/profile/${uuid}`,
        {bio: about},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      navigation.navigate(navigationStrings.InterestSelection);
    } catch (err) {
      console.error('❌ Failed to save bio:', err);
    }
  };

  return (
    <WrapperContainer>
      <UserSetupContainer progress={60} onNextPress={onNext}>
        <Text style={styles.titleText}>About Me</Text>
        <TextInput
          value={about}
          onChangeText={setAbout}
          style={styles.input}
          placeholder="Tell something about you ..."
          placeholderTextColor={colors.white}
          multiline
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
  input: {
    borderWidth: 1,
    borderColor: colors.white,
    padding: globalStyleDefinitions.cardInnerPadding.padding,
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
    height: '70%',
    textAlignVertical: 'top',
    marginTop: globalStyleDefinitions.commonItemMargin.margin,
    fontFamily: fonts.fontRegular,
    fontSize: getScaledFontSize(16),
    lineHeight: getScaledFontSize(23),
    color: colors.white,
  },
});

export default AboutMe;
