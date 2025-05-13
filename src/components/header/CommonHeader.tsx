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
  onPress?: () => void;
}

const CommonHeader = ({headerTitle, showBackIcon, onPress}: iProps) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      console.log('❌ Cannot go back and no fallback navigation provided');
    }
  };

  return (
    <View style={styles.fullContainer}>
      <AntDesign
        name={showBackIcon ? 'arrowleft' : 'close'}
        style={styles.icon}
        onPress={handlePress}
      />
      <Text style={styles.title}>{headerTitle}</Text>
    </View>
  );
};

export default memo(CommonHeader);

const styles = StyleSheet.create({
  fullContainer: {
    marginTop: Platform.select({
      ios: 3 * globalStyleDefinitions.screenPadding.padding,
      android: 2.5 * globalStyleDefinitions.screenPadding.padding,
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
    color: colors.white,
    fontSize: getScaledFontSize(20),
    alignSelf: 'flex-end',
    marginLeft: 35,
  },
});
