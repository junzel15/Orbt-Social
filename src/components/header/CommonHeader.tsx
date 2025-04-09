import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../constants/colors';
import {windowWidth} from '../../constants/globalConstants';
import {getScaledFontSize} from '../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../constants/globalStyleDefinitions';

interface iProps {
  headerTitle?: string;
  showBackIcon?: boolean;
  onIconPress?: () => void;
}

const CommonHeader = ({headerTitle, showBackIcon, onIconPress}: iProps) => {
  const navigation = useNavigation();

  function onPress() {
    if (onIconPress) {
      onIconPress();
    } else {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        console.log('here');
        //todo
      }
    }
  }

  return (
    <View style={styles.fullContainer}>
      {showBackIcon ? (
        <AntDesign name="arrowleft" style={styles.icon} onPress={onPress} />
      ) : (
        <AntDesign name="close" style={styles.icon} onPress={onPress} />
      )}
      <Text style={styles.title}>{headerTitle}</Text>
    </View>
  );
};

export default memo(CommonHeader);

const styles = StyleSheet.create({
  fullContainer: {
    marginTop: Platform.select({
      ios: 3 * globalStyleDefinitions.screenPadding.padding,
      android:2.5*globalStyleDefinitions.screenPadding.padding
    }),
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
    padding: globalStyleDefinitions.screenPadding.padding,
  },
  icon: {
    position: 'absolute',
    left: 15,
    fontSize: getScaledFontSize(24),
    color: colors.white,
  },
  title: {
    // fontFamily: fonts.fontHeading,
    color: colors.white,
    fontSize: getScaledFontSize(20),
    alignSelf: 'flex-end',
    marginLeft: 35,
  },
});
