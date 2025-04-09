import React, {memo, ReactNode} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../constants/colors';
import commonStyles from '../../constants/commonStyles';
import { StatusBar } from 'react-native';

type WrapperContainerProps = {
  children: ReactNode;
};

const LinearWrapperContainer = (props: WrapperContainerProps) => {
  return (
    <LinearGradient
      colors={[colors.white, colors.appBackground]}
      locations={[0.6, 1]}
      style={commonStyles.flexFull}>
      <StatusBar barStyle={'dark-content'} />
      {props?.children}
    </LinearGradient>
  );
};

export default memo(LinearWrapperContainer);
