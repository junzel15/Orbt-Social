import React, {memo} from 'react';
import {Bubble} from 'react-native-gifted-chat';
import {colors} from '../../../../constants/colors';
import {fonts} from '../../../../constants/fonts';
import {getScaledFontSize} from '../../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../../constants/globalStyleDefinitions';

const RenderBubble = (props: any) => {
  const wrapperStyle = {
    right: {
      backgroundColor: colors.primary,
      padding: globalStyleDefinitions.gap.gap,
      borderRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
      marginBottom: 5,
    },
    left: {
      backgroundColor: colors.backgroundGray,
      padding: globalStyleDefinitions.gap.gap,
      borderRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
    },
  };

  const textStyle = {
    right: {
      color: colors.white,
      fontSize: getScaledFontSize(16),
      fontFamily: fonts.fontRegular,
    },
    left: {
      color: colors.black,
      fontSize: getScaledFontSize(16),
      fontFamily: fonts.fontRegular,
    },
  };

  return (
    <Bubble
      {...props}
      wrapperStyle={wrapperStyle}
      textStyle={textStyle}
      renderTime={() => null}
    />
  );
};

export default memo(RenderBubble);
