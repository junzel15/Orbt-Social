import React, {memo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../../constants/colors';
import {fonts} from '../../../../constants/fonts';
import {getScaledFontSize} from '../../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../../constants/globalStyleDefinitions';

interface iProps {
  header: string;
  content: {heading: string; subtext: string}[];
}

const ExpandableCard = ({content, header}: iProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const onPress = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.rowWrapper}>
        <Text style={styles.headerText}>{header}</Text>
        <AntDesign
          name={isExpanded ? 'minus' : 'plus'}
          size={20}
          color={colors.white}
          onPress={onPress}
          suppressHighlighting
        />
      </View>
      {/* // <View style={styles.expandedContent}>
      //   {content.map((item, index) => (
      //     <View key={index} style={styles.contentBlock}>
      //       <Text style={styles.headingText}>• {item.heading}: </Text>
      //       <Text style={styles.subText}>{item.subtext}</Text>
      //     </View>
      //   ))}
      // </View> */}

      {isExpanded &&
        content.map((item, index) => {
          return (
            <View style={styles.contentWrapper} key={index}>
              <MaterialCommunityIcons
                size={20}
                color={colors.white}
                name="square-small"
              />
              <Text style={styles.contentTitle}>
                {item?.heading}:
                <Text style={styles.contentSubText}>
                  {'   '}
                  {item.subtext}
                </Text>
              </Text>
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    marginTop: 2 * globalStyleDefinitions.mt_15.marginTop,
  },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: colors.lightPurple,
    fontFamily: fonts.fontMedium,
    fontSize: getScaledFontSize(12),
    flex: 1,
    letterSpacing: 2,
  },
  contentWrapper: {
    marginTop: globalStyleDefinitions.mt_15.marginTop,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 0.5 * globalStyleDefinitions.gap.gap,
  },
  contentTitle: {
    color: colors.white,
    fontFamily: fonts.fontRegular,
    fontSize: getScaledFontSize(12),
    lineHeight: getScaledFontSize(18),
    textDecorationLine: 'underline',
    flex: 1,
  },
  contentSubText: {
    color: colors.white + '80',
    textDecorationLine: 'none',
  },
});

export default memo(ExpandableCard);
