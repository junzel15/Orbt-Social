import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import {useSelector} from 'react-redux';
import {selectUserUuid} from '../../../redux/slices/userSetupSlice';
import {useEffect, useState} from 'react';
import axios from 'axios';

const Home = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const uuid = useSelector(selectUserUuid);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    if (!uuid) {
      console.log('⛔ UUID not available yet, skipping fetch.');
      return;
    }

    console.log('📥 Fetching profile for UUID:', uuid);

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://du3kce1sli.execute-api.us-east-1.amazonaws.com/default/profile/${uuid}`,
        );
        const profile = res.data;

        console.log('✅ Profile response:', profile);

        setName(profile.name || '');
      } catch (err: any) {
        console.error('❌ Failed to fetch user profile:', err.message);
      }
    };

    fetchUser();
  }, [uuid]);

  const onDiningPress = () => {
    navigation.navigate(navigationStrings.Dining);
  };
  const onBarsPress = () => {
    navigation.navigate(navigationStrings.Bars);
  };
  const onExperiences = () => {
    navigation.navigate(navigationStrings.Experiences);
  };
  const onNotification = () => {
    navigation.navigate(navigationStrings.Notification);
  };
  const onLocation = () => {
    navigation.navigate(navigationStrings.Location);
  };
  return (
    <WrapperContainer>
      <LinearWrapperContainer>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <View style={styles.mainContainer}>
            <View style={styles.rowWrapper}>
              <TouchableOpacity
                style={styles.textTouchableOpacity}
                onPress={onLocation}>
                <CustomImage url={iconPath.location} height={34} width={34} />
                {/* <TextInput
                style={styles.textInput}
                placeholder="Add your location"
                placeholderTextColor={colors.placeholderColor}
              /> */}
                <Text style={styles.textInput}>Add your location</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onNotification}>
                <CustomImage
                  url={iconPath.notification}
                  height={24}
                  width={24}
                />
              </TouchableOpacity>
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
                Hello,{' '}
                <Text style={styles.highlightText}>{name || 'Guest'}!</Text>
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
            colors={[colors.darkPrimary, colors.black]}
            icon={imagePath.dining}
            customStyle={{bottom: 0}}
            onPress={onDiningPress}
          />
          <CommonButton
            label={'Bars'}
            colors={[colors.darkPurple, colors.darkPrimary]}
            icon={imagePath.bar}
            customStyle={{bottom: 30}}
            onPress={onBarsPress}
          />
          <CommonButton
            label={'Experiences'}
            colors={[colors.primary, colors.darkPurple]}
            icon={imagePath.experience}
            customStyle={{bottom: 60}}
            onPress={onExperiences}
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
  textTouchableOpacity: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    fontFamily: fonts.fontRegular,
    // color: colors.black,
    color: colors.primaryText,
    fontSize: getScaledFontSize(14),
    // flex: 1,
    marginLeft: globalStyleDefinitions.commonItemMargin.margin / 2,
  },
  innerContainer: {
    marginTop: 2 * globalStyleDefinitions.commonItemMargin.margin,
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
