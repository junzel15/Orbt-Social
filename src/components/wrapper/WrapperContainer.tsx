import {useIsFocused} from '@react-navigation/native';
import React, {memo, ReactNode} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import commonStyles from '../../constants/commonStyles';
import CustomErrorToast from '../ToastPopup/CustomErrorToast';
import CustomSuccessToast from '../ToastPopup/CustomSuccessToast';

type WrapperContainerProps = {
  children: ReactNode;
};

const WrapperContainer = (props: WrapperContainerProps) => {
  const isFocus = useIsFocused();

  const {errorMessage, successMessage} = useSelector(
    (state: any) => state.toastState,
  );

  return (
    <View style={commonStyles.wrapperContainer}>
      {isFocus && errorMessage && errorMessage !== '' && <CustomErrorToast />}
      {isFocus && successMessage && successMessage !== '' && (
        <CustomSuccessToast />
      )}
      {props?.children}
    </View>
  );
};

export default memo(WrapperContainer);
