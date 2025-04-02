import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearWrapperContainer from '../../../components/wrapper/LinearWrapperContainer';
import CommonButton from '../../../components/atoms/button/CommonButton';
import CustomImage from '../../../components/atoms/image/CustomImage';
import {colors} from '../../../constants/colors';
import commonStyles from '../../../constants/commonStyles';
import {fonts} from '../../../constants/fonts';
import {windowWidth} from '../../../constants/globalConstants';
import {getScaledFontSize} from '../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';
import {imagePath} from '../../../constants/imagePath';
import {navigationStrings} from '../../../navigation/navigationStrings';

const Confirmation = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const onGetStarted = () => {
    navigation.navigate(navigationStrings.UserSetup);
  };

  return (
    <LinearWrapperContainer>
      <CustomImage
        url={imagePath.confirm}
        height={350}
        width={windowWidth * 0.7}
        imageStyle={styles.image}
      />
      <View style={commonStyles.fullInnerContainer}>
        <Text style={styles.headerText}>You're all set!</Text>
        <Text style={styles.headerSubText}>
          Your account has been successfully verified. Let's get to know you
          better!
        </Text>
      </View>
      <CommonButton
        title="Get Started"
        customStyles={styles.buttonContainer}
        onPress={onGetStarted}
      />
    </LinearWrapperContainer>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 2.5,
    alignSelf: 'center',
  },
  headerText: {
    fontSize: getScaledFontSize(20),
    color: colors.black,
    fontFamily: fonts.soraSemiBold,
    textAlign: 'center',
  },
  headerSubText: {
    fontSize: getScaledFontSize(14),
    color: colors.primaryText,
    fontFamily: fonts.fontRegular,
    marginTop: 0.5 * globalStyleDefinitions.mt_15.marginTop,
    marginBottom: globalStyleDefinitions.mt_15.marginTop,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 2 * globalStyleDefinitions.screenPadding.padding,
    width: windowWidth - 2 * globalStyleDefinitions.screenPadding.padding,
  },
});

export default Confirmation;
