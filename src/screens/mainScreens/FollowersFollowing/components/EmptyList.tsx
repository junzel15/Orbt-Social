import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../../constants/colors';
import {fonts} from '../../../../constants/fonts';
import {getScaledFontSize} from '../../../../constants/globalFunctions';

interface iProps {
  text: string;
}
const EmptyList = ({text}: iProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: fonts.soraSemiBold,
    color: colors.black,
    fontSize: getScaledFontSize(16),
  },
});

export default memo(EmptyList);
