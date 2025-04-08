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

const AboutMe = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const [about, setAbout] = useState<string>('');

  const onNext = () => {
    navigation.navigate(navigationStrings.InterestSelection);
  };

  return (
    <WrapperContainer>
      <UserSetupContainer
        progress={60}
        onNextPress={onNext}>
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
