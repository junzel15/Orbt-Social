import React, {forwardRef, memo, useImperativeHandle, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CommonButton from '../../../../components/atoms/button/CommonButton';
import CustomImage from '../../../../components/atoms/image/CustomImage';
import RBSheet from '../../../../components/modal/RBSheet';
import {colors} from '../../../../constants/colors';
import commonStyles from '../../../../constants/commonStyles';
import {fonts} from '../../../../constants/fonts';
import {windowHeight} from '../../../../constants/globalConstants';
import {getScaledFontSize} from '../../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../../constants/globalStyleDefinitions';

interface iProps {
  onRemove: () => void;
  item: any;
}

const RemoveModal = forwardRef((props: iProps, ref) => {
  const refRBSheet = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      refRBSheet.current?.open();
    },
    close: () => {
      refRBSheet.current?.close();
    },
  }));

  return (
    <RBSheet ref={refRBSheet} height={windowHeight * 0.25}>
      <View style={commonStyles.flexFull}>
        <View style={styles.rowWrapper}>
          <CustomImage
            url={{uri: props?.item?.profile_picture}}
            imageStyle={styles.image}
          />
          <View style={commonStyles.flexFull}>
            <Text style={styles.titleText}>Remove follower?</Text>
            <Text style={styles.subText}>
              We won’t tell {props?.item?.name} that they were removed from your
              followers.
            </Text>
          </View>
        </View>
      </View>
      <CommonButton title={'Remove'} onPress={props.onRemove} />
    </RBSheet>
  );
});

const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: globalStyleDefinitions.gap.gap
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 3 * globalStyleDefinitions.br_10.borderRadius,
  },
  titleText: {
    fontFamily: fonts.soraSemiBold,
    fontSize: getScaledFontSize(16),
    color: colors.black,
  },
  subText: {
    fontFamily: fonts.fontRegular,
    fontSize: getScaledFontSize(10),
    color:colors.primaryText,marginTop:5
  },
});

export default memo(RemoveModal);
