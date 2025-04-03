import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { memo, ReactNode } from 'react';
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import { useDispatch } from 'react-redux';
import { colors } from '../../constants/colors';
import commonStyles from '../../constants/commonStyles';
import { fonts } from '../../constants/fonts';
import { windowWidth } from '../../constants/globalConstants';
import { getScaledFontSize } from '../../constants/globalFunctions';
import { globalStyleDefinitions } from '../../constants/globalStyleDefinitions';
import { imagePath } from '../../constants/imagePath';
import { setAccessToken } from '../../redux/slices/authState';
import CommonButton from '../atoms/button/CommonButton';
import CustomImage from '../atoms/image/CustomImage';

type WrapperContainerProps = {
  children: ReactNode;
  progress: number;
  onNextPress?: () => void;
};

const UserSetupContainer = (props: WrapperContainerProps) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();

  const onBackPress = () => {
    navigation.goBack();
  };

  const onSkip = () => {
    dispatch(setAccessToken('accessToken'));
  };

  return (
    <View style={commonStyles.flexFull}>
      <View style={styles.rowWrapper}>
        <Octicons
          name="arrow-left"
          color={colors.white}
          size={30}
          style={styles.backIcon}
          suppressHighlighting
          onPress={onBackPress}
        />
        <View style={styles.progress}>
          <View style={[styles.progressFill, {width: `${props.progress}%`}]} />
        </View>
      </View>
      <View style={commonStyles.flexFull}>
        <CustomImage
          url={imagePath.userSetupBackground2}
          imageStyle={styles.innerImage}
          resizeMode="stretch"
        />
        <CustomImage
          url={imagePath.userSetupBackground}
          imageStyle={styles.subInnerImage}
          resizeMode="stretch"
        />
        <ImageBackground
          source={imagePath.userSetupBackground3}
          style={styles.mainImage}
          resizeMode="stretch">
          <View style={styles.innerContainer}>{props.children}</View>
        </ImageBackground>
      </View>
      <View style={styles.buttonWrapper}>
        <CommonButton title="Next" onPress={props.onNextPress} />
        <Text style={styles.subText} suppressHighlighting onPress={onSkip}>
          Skip for now
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.select({ios: 80, android: 60}),
    height: 40,
  },
  backIcon: {
    position: 'absolute',
    left: globalStyleDefinitions.screenPadding.padding,
  },
  progress: {
    width: windowWidth * 0.6,
    height: 5,
    backgroundColor: colors.white,
    borderRadius: 0.5 * globalStyleDefinitions.br_10.borderRadius,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.purple,
    borderRadius: 0.5 * globalStyleDefinitions.br_10.borderRadius,
  },
  mainImage: {
    height: '95%',
    width: windowWidth - 2 * globalStyleDefinitions.screenPadding.padding,
    flex: 1,
    alignSelf: 'center',
    marginTop: globalStyleDefinitions.mt_15.marginTop,
    zIndex: 3,
  },
  innerImage: {
    height: '95%',
    width: windowWidth - 4 * globalStyleDefinitions.screenPadding.padding,
    alignSelf: 'center',
    top: globalStyleDefinitions.screenPadding.padding,
    zIndex: 2,
    position: 'absolute',
  },
  subInnerImage: {
    height: '95%',
    width: windowWidth - 6 * globalStyleDefinitions.screenPadding.padding,
    alignSelf: 'center',
    top: 2 * globalStyleDefinitions.screenPadding.padding,
    zIndex: 1,
    position: 'absolute',
  },
  innerContainer: {
    height: '95%',
    padding: 2 * globalStyleDefinitions.cardInnerPadding.padding,
  },
  subText: {
    fontSize: getScaledFontSize(16),
    color: colors.white,
    fontFamily: fonts.fontRegular,
    marginTop: globalStyleDefinitions.mt_15.marginTop,
    padding: globalStyleDefinitions.cardInnerPadding.padding,
    alignSelf: 'center',
  },
  buttonWrapper: {
    padding: globalStyleDefinitions.screenPadding.padding,
    marginTop: globalStyleDefinitions.mt_15.marginTop,
  },
});

export default memo(UserSetupContainer);
