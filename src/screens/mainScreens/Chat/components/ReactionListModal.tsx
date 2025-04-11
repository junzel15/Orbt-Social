import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import CustomImage from '../../../../components/atoms/image/CustomImage';
import RBSheet from '../../../../components/modal/RBSheet';
import { colors } from '../../../../constants/colors';
import commonStyles from '../../../../constants/commonStyles';
import { fonts } from '../../../../constants/fonts';
import { windowHeight } from '../../../../constants/globalConstants';
import { getScaledFontSize } from '../../../../constants/globalFunctions';
import { globalStyleDefinitions } from '../../../../constants/globalStyleDefinitions';

const data = [
  {
    id: 1,
    name: 'Iska Piñero',
    profile_image: {uri: 'https://randomuser.me/api/portraits/women/32.jpg'},
    reaction: '❤️',
  },
  {
    id: 2,
    name: 'Marview Segismundo',
    profile_image: {uri: 'https://randomuser.me/api/portraits/men/20.jpg'},
    reaction: '😂',
  },
  {
    id: 3,
    name: 'Abby',
    profile_image: {uri: 'https://randomuser.me/api/portraits/women/32.jpg'},
    reaction: '😯',
  },
  {
    id: 4,
    name: 'Marview Segismundo',
    profile_image: {uri: 'https://randomuser.me/api/portraits/men/20.jpg'},
    reaction: '😢',
  },
];

const ReactionModal = forwardRef((props, ref) => {
  const refRBSheet = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      refRBSheet.current?.open();
    },
  }));

  const renderItem = useCallback(({item, index}: any) => {
    return (
      <View style={styles.rowWrapper}>
        <CustomImage url={item.profile_image} imageStyle={styles.image} />
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.subText}>{item.reaction}</Text>
      </View>
    );
  }, []);

  return (
    <RBSheet ref={refRBSheet} height={windowHeight * 0.4}>
      <View style={commonStyles.flexFull}>
        <Text style={styles.titleText}>Reactions</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </RBSheet>
  );
});

const styles = StyleSheet.create({
  titleText: {
    fontFamily: fonts.soraSemiBold,
    fontSize: getScaledFontSize(18),
    lineHeight: getScaledFontSize(20),
    color: colors.black,
    textAlign: 'center',
    top: -10,
  },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: globalStyleDefinitions.gap.gap,
    paddingVertical:  globalStyleDefinitions.cardInnerPadding.padding,
  },
  text: {
    fontFamily: fonts.soraSemiBold,
    fontSize: getScaledFontSize(16),
    lineHeight: getScaledFontSize(30),
    color: colors.black,
    flex: 1,
  },
  subText: {
    fontSize: getScaledFontSize(20),
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 1.5 * globalStyleDefinitions.br_10.borderRadius,
  },
});

export default memo(ReactionModal);
