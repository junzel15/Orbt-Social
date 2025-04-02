import React, { memo } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../constants/colors';
import { globalStyleDefinitions } from '../../../constants/globalStyleDefinitions';
import { getScaledFontSize } from '../../../constants/globalFunctions';
import { fonts } from '../../../constants/fonts';

const FullScreenLoader = () => {
  return (
    <View style={styles.overlay}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Please wait...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black+"50",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,zIndex:9999
  },
  loaderContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 50,
    paddingVertical: 40,
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
  },
  loadingText: {
    marginTop: getScaledFontSize(20),
    color: colors.primary,
    fontSize: getScaledFontSize(16),
    fontFamily: fonts.fontSemiBold,
  },
});

export default memo(FullScreenLoader);
