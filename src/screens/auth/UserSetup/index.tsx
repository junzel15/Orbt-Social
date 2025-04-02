import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CommonButton from '../../../components/atoms/button/CommonButton';
import CustomImage from '../../../components/atoms/image/CustomImage';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import {colors} from '../../../constants/colors';
import commonStyles from '../../../constants/commonStyles';
import {fonts} from '../../../constants/fonts';
import {getScaledFontSize} from '../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';
import {imagePath} from '../../../constants/imagePath';
import {navigationStrings} from '../../../navigation/navigationStrings';

const UserSetup = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const onContinue = () => {
    navigation.navigate(navigationStrings.GenderSelection);
  };

  return (
    <WrapperContainer>
      <View style={commonStyles.fullInnerContainer}>
        <CustomImage
          url={imagePath.graphics}
          height={200}
          width={270}
          imageStyle={styles.image}
        />
        <Text style={styles.titleText}>Tell us a bit about yourself</Text>
        <Text style={styles.subText}>
          Help us get to know you better and personalize your ORBT experience.
          This should only take a few minutes, and you can skip any part if
          you'd like.
        </Text>
        <CommonButton
          title="Continue"
          customStyles={styles.buttonContainer}
          onPress={onContinue}
        />
      </View>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignSelf: 'center',
  },
  titleText: {
    fontSize: getScaledFontSize(52),
    lineHeight: getScaledFontSize(57),
    color: colors.white,
    fontFamily: fonts.soraSemiBold,
  },
  subText: {
    fontSize: getScaledFontSize(14),
    color: colors.white,
    fontFamily: fonts.fontRegular,
    marginTop: globalStyleDefinitions.mt_15.marginTop,
  },
  buttonContainer: {
    marginBottom: globalStyleDefinitions.screenPadding.padding,
    marginTop: 2 * globalStyleDefinitions.mt_15.marginTop,
  },
});

export default UserSetup;
