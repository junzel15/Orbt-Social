import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CommonButton from '../../../components/atoms/button/CommonButton';
import CustomImage from '../../../components/atoms/image/CustomImage';
import {colors} from '../../../constants/colors';
import {fonts} from '../../../constants/fonts';
import {windowHeight, windowWidth} from '../../../constants/globalConstants';
import {getScaledFontSize} from '../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';
import {imagePath} from '../../../constants/imagePath';
import {navigationStrings} from '../../../navigation/navigationStrings';
import {slides} from './data';

interface iProps {
  item: any;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const PaginationDot = ({activeIndex}: {activeIndex: number}) => {
  return slides?.map((item, index) => {
    if (index == activeIndex) {
      return <View style={styles.activeDot} key={index} />;
    } else {
      return <View style={styles.disableDot} key={index} />;
    }
  });
};

const onBoardingProgress = ({item, activeIndex, setActiveIndex}: iProps) => {
  const navigation = useNavigation<NavigationProp<any>>();

  const linearColors =
    activeIndex == 2
      ? [colors.black, '#090115', '#160843', '#100843']
      : [colors.black, colors.black];

  const imageWidth = activeIndex == 2 ? windowWidth : windowWidth * 0.8;

  const onSkip = () => {
    navigation.reset({
      index: 0,
      routes: [{name: navigationStrings.Register}],
    });
  };

  const onBack = () => {
    setActiveIndex(activeIndex - 1);
  };

  const onNext = () => {
    setActiveIndex(activeIndex + 1);
  };

  const onGetStarted = () => {
    navigation.reset({
      index: 0,
      routes: [{name: navigationStrings.Register}],
    });
  };

  const onLogin = () => {};

  return (
    <LinearGradient
      colors={linearColors}
      style={styles.wrapper}
      locations={[0.6, 0.8, 0.9, 1]}>
      <CustomImage url={imagePath.appLogo} height={35} width={windowWidth} />
      <CustomImage
        url={item.image}
        width={imageWidth}
        height={320}
        imageStyle={styles.image}
      />
      <View style={styles.bottomWrapper}>
        <Text style={styles.headerText}>{item?.title}</Text>
        <Text style={styles.descriptionText}>{item?.description}</Text>

        <View style={styles.innerWrapper}>
          {activeIndex == slides?.length - 1 ? (
            <View style={styles.buttonWrapper}>
              <CommonButton
                title="Get Started"
                customStyles={styles.buttonContainer}
                onPress={onGetStarted}
                customTextStyles={styles.buttonText}
              />
              <Text style={styles.titleText}>
                Already have an account?{'  '}
                <Text style={styles.loginText} onPress={onLogin}>
                  Log in
                </Text>
              </Text>
            </View>
          ) : (
            <View style={styles.rowWrapper}>
              {activeIndex == 0 ? (
                <Text
                  style={styles.subText}
                  suppressHighlighting
                  onPress={onSkip}>
                  Skip
                </Text>
              ) : (
                <Text
                  style={styles.subText}
                  suppressHighlighting
                  onPress={onBack}>
                  Back
                </Text>
              )}
              <View style={styles.paginationWrapper}>
                <PaginationDot activeIndex={activeIndex} />
              </View>
              <Text
                style={styles.subText}
                suppressHighlighting
                onPress={onNext}>
                Next
              </Text>
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

export default memo(onBoardingProgress);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 50,
    width: windowWidth,
    height: windowHeight,
  },
  image: {
    marginTop: 2 * globalStyleDefinitions.mt_15.marginTop,
    flex: 1,
    alignSelf: 'center',
  },
  bottomWrapper: {
    paddingHorizontal: globalStyleDefinitions.screenPadding.padding,
    justifyContent: 'flex-end',
    paddingBottom: Platform.OS == 'ios' ? 70 : 10,
  },
  headerText: {
    fontSize: getScaledFontSize(28),
    fontFamily: fonts.soraSemiBold,
    color: colors.white,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: getScaledFontSize(14),
    fontFamily: fonts.fontRegular,
    color: colors.white,
    textAlign: 'center',
    marginTop: 0.5 * globalStyleDefinitions.mt_15.marginTop,
  },
  innerWrapper: {
    zIndex: 1,
  },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: globalStyleDefinitions.mt_15.marginTop,
    paddingBottom: 2 * globalStyleDefinitions.mt_15.marginTop,
    marginHorizontal: globalStyleDefinitions.screenPadding.padding,
  },
  subText: {
    fontSize: getScaledFontSize(16),
    fontFamily: fonts.fontSemiBold,
    color: colors.white,
  },
  paginationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: globalStyleDefinitions.gap.gap,
  },
  activeDot: {
    width: 20,
    height: 9,
    borderRadius: 0.5 * globalStyleDefinitions.br_10.borderRadius,
    backgroundColor: colors.white,
  },
  disableDot: {
    height: 9,
    width: 9,
    borderRadius: 0.5 * globalStyleDefinitions.br_10.borderRadius,
    backgroundColor: colors.white + '45',
  },
  buttonContainer: {
    backgroundColor: colors.white,
  },
  buttonText: {
    color: colors.primary,
  },
  titleText: {
    fontSize: getScaledFontSize(14),
    fontFamily: fonts.fontRegular,
    color: colors.white,
    marginBottom: 2 * globalStyleDefinitions.mt_15.marginTop,
    textAlign: 'center',
    marginTop: globalStyleDefinitions.mt_15.marginTop,
  },
  loginText: {
    fontSize: getScaledFontSize(14),
    fontFamily: fonts.fontBold,
    color: colors.primary,
  },
  buttonWrapper: {
    paddingBottom: 2 * globalStyleDefinitions.mt_15.marginTop,
    marginTop: globalStyleDefinitions.mt_15.marginTop,
  },
});
