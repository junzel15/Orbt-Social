import React, {memo} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fonts';
import {windowWidth} from '../../constants/globalConstants';
import {getScaledFontSize} from '../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../constants/globalStyleDefinitions';
import {setErrorMessage} from '../../redux/slices/toastState';

const CustomErrorToast = () => {
  const {errorMessage} = useSelector((state: any) => state.toastState);

  const dispatch = useDispatch();

  const onToastShow = () => {
    setTimeout(() => {
      dispatch(setErrorMessage(''));
    }, 2000);
  };

  return (
    <Modal
      visible={true}
      onShow={onToastShow}
      transparent={true}
      animationType="fade">
      <View style={styles.fullContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.titleText}>Oops!</Text>
          <Text style={styles.descriptionText}>{errorMessage}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default memo(CustomErrorToast);

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.black+"50",
    alignItems: 'center',
  },
  innerContainer: {
    padding: 2 * globalStyleDefinitions.cardInnerPadding.padding,
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
    backgroundColor: colors.white,
    alignItems: 'center',
    width: windowWidth * 0.8,
  },
  titleText: {
    fontSize: getScaledFontSize(20),
    fontFamily: fonts.fontSemiBold,
    color: colors.primary,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: getScaledFontSize(16),
    fontFamily: fonts.fontMedium,
    color: colors.secondaryText,
    marginTop: 10,
    textAlign: 'center',
    lineHeight: getScaledFontSize(23),
  },
});
