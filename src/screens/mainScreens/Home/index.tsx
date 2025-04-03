import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CustomImage from '../../../components/atoms/image/CustomImage';
import LinearWrapperContainer from '../../../components/wrapper/LinearWrapperContainer';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import {colors} from '../../../constants/colors';
import {fonts} from '../../../constants/fonts';
import {windowWidth} from '../../../constants/globalConstants';
import {getScaledFontSize} from '../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';
import {iconPath} from '../../../constants/iconPath';
import {imagePath} from '../../../constants/imagePath';
import {navigationStrings} from '../../../navigation/navigationStrings';
import CommonButton from './components/CommonButton';

const Home = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const onDiningPress = () => {
    navigation.navigate(navigationStrings.Dining);
  };

  return (
    <WrapperContainer>
      <LinearWrapperContainer>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <View style={styles.mainContainer}>
            <View style={styles.rowWrapper}>
              <CustomImage url={iconPath.location} height={34} width={34} />
              <TextInput
                style={styles.textInput}
                placeholder="Add your location"
                placeholderTextColor={colors.placeholderColor}
              />
              <CustomImage url={iconPath.notification} height={24} width={24} />
            </View>

            <View style={styles.innerContainer}>
              <CustomImage
                url={iconPath.sparkle}
                height={28}
                width={28}
                imageStyle={styles.rightSparkle}
              />
              <CustomImage
                url={iconPath.sparkle}
                height={20}
                width={20}
                imageStyle={styles.leftSparkle}
              />
              <Text style={styles.titleText}>
                Hello, <Text style={styles.highlightText}>John!</Text>
              </Text>

              <Text style={styles.mainText}>
                {`Find your crowd,\n`}
                <Text style={{color: colors.darkPurple}}>Share the moment</Text>
              </Text>

              <Text style={styles.subText}>
                {`Book now, meet 5 strangers,\nand let the fun find you.`}
              </Text>
            </View>
          </View>
          <CustomImage
            url={imagePath.homeBanner}
            width={windowWidth}
            height={150}
            resizeMode="stretch"
          />
        </ScrollView>

        <View style={styles.bottomWrapper}>
          <CommonButton
            label={'Dining'}
            colors={['#1A004E', colors.black]}
            icon={imagePath.dining}
            customStyle={{bottom: 0}}
            onPress={onDiningPress}
          />
          <CommonButton
            label={'Bars'}
            colors={['#330099', '#130038']}
            icon={imagePath.bar}
            customStyle={{bottom: 30}}
          />
          <CommonButton
            label={'Experiences'}
            colors={[colors.black, colors.primary]}
            icon={imagePath.experience}
            customStyle={{bottom: 60}}
          />
        </View>
      </LinearWrapperContainer>
    </WrapperContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    padding: globalStyleDefinitions.screenPadding.padding,
    marginTop: Platform.select({
      ios: 3 * globalStyleDefinitions.screenPadding.padding,
      android: 2 * globalStyleDefinitions.screenPadding.padding,
    }),
  },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: globalStyleDefinitions.gap.gap,
  },
  textInput: {
    fontFamily: fonts.fontRegular,
    color: colors.black,
    fontSize: getScaledFontSize(14),
    flex: 1,
  },
  innerContainer: {
    marginTop: 2 * globalStyleDefinitions.mt_15.marginTop,
  },
  titleText: {
    fontSize: getScaledFontSize(16),
    fontFamily: fonts.fontRegular,
    color: colors.black,
    textAlign: 'center',
  },
  highlightText: {
    fontSize: getScaledFontSize(16),
    fontFamily: fonts.fontBold,
    color: colors.primary,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  mainText: {
    fontSize: getScaledFontSize(26),
    lineHeight: getScaledFontSize(30),
    fontFamily: fonts.soraRegular,
    color: colors.black,
    textAlign: 'center',
    marginTop: 5,
  },
  subText: {
    fontSize: getScaledFontSize(16),
    lineHeight: getScaledFontSize(21),
    fontFamily: fonts.fontRegular,
    color: colors.primaryText,
    textAlign: 'center',
    marginTop: 5,
  },
  rightSparkle: {
    position: 'absolute',
    right: globalStyleDefinitions.screenPadding.padding,
  },
  leftSparkle: {
    position: 'absolute',
    left: globalStyleDefinitions.screenPadding.padding,
    top: globalStyleDefinitions.screenPadding.padding,
  },
  bottomWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.primary,
  },
});
