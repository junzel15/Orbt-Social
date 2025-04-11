import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../constants/colors';

type iProps = {
  isSelected?: boolean;
  onSelect: () => void;
};

const RadioButton = ({isSelected=false, onSelect}: iProps) => {
  return (
    <TouchableOpacity onPress={onSelect} activeOpacity={0.9}>
      <View style={[styles.circle, isSelected && styles.selectedCircle]}>
        {isSelected && <View style={styles.innerCircle} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circle: {
    height: 18,
    width: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.secondaryText,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCircle: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
});

export default memo(RadioButton);
