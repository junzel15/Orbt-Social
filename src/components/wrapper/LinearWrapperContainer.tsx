import React, {memo, ReactNode} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../constants/colors';
import commonStyles from '../../constants/commonStyles';
import WrapperContainer from './WrapperContainer';

type WrapperContainerProps = {
  children: ReactNode;
};

const LinearWrapperContainer = (props: WrapperContainerProps) => {
  return (
    <WrapperContainer>
      <LinearGradient
        colors={[colors.white, colors.appBackground]}
        locations={[0.6, 1]}
        style={commonStyles.flexFull}>
        {props?.children}
      </LinearGradient>
    </WrapperContainer>
  );
};

export default memo(LinearWrapperContainer);
