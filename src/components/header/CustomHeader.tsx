import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fonts';
import {windowWidth} from '../../constants/globalConstants';
import {getScaledFontSize} from '../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../constants/globalStyleDefinitions';

interface iProps {
  title: string;
}

const CustomHeader = ({title}: iProps) => {
  const navigation = useNavigation<NavigationProp<any>>();

  const onPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.fullContainer}>
      <AntDesign
        name="arrowleft"
        onPress={onPress}
        size={25}
        color={colors.black}
        suppressHighlighting
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default memo(CustomHeader);

const styles = StyleSheet.create({
  fullContainer: {
    marginTop: 3 * globalStyleDefinitions.screenPadding.padding,
    width: windowWidth,
    alignItems: 'center',
    flexDirection: 'row',
    padding: globalStyleDefinitions.screenPadding.padding,
    gap: globalStyleDefinitions.gap.gap,
  },
  title: {
    color: colors.black,
    fontSize: getScaledFontSize(20),
    fontFamily: fonts.soraSemiBold,
  },
});
