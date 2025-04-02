import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommonButton from '../../../components/atoms/button/CommonButton';
import CustomImage from '../../../components/atoms/image/CustomImage';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import {colors} from '../../../constants/colors';
import commonStyles from '../../../constants/commonStyles';
import {fonts} from '../../../constants/fonts';
import {getScaledFontSize} from '../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';
import {iconPath} from '../../../constants/iconPath';
import {imagePath} from '../../../constants/imagePath';
import {DiningData} from './components/data';

const Dining = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const [selected, setSelected] = useState<string>('Coffee');
  const [selectedOption, setSelectedOption] = useState<string>('');

  const onBackPress = () => {
    navigation.goBack();
  };

  const onDateSelect = (item: any) => {
    setSelectedOption(item?.value);
  };

  return (
    <WrapperContainer>
      <ImageBackground
        source={imagePath.linearBackground}
        style={commonStyles.fullInnerContainer}>
        <View style={commonStyles.flexFull}>
          <View style={styles.rowWrapper}>
            <CustomImage url={imagePath.dining} height={44} width={44} />
            <Text style={styles.headerTitle}>Dining</Text>
            <TouchableOpacity activeOpacity={0.9} onPress={onBackPress}>
              <CustomImage url={iconPath.close} height={44} width={44} />
            </TouchableOpacity>
          </View>

          <View style={styles.listWrapper}>
            {DiningData.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelected(item.label)}
                activeOpacity={0.9}
                style={[
                  styles.listContainer,
                  selected == item.label && styles.selectedItem,
                ]}>
                <Text
                  style={[
                    styles.listText,
                    selected == item.label && styles.selectedText,
                  ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Dropdown
            style={styles.dropdownWrapper}
            data={DiningData}
            labelField="label"
            valueField="value"
            placeholder="Select a date"
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownText}
            itemTextStyle={styles.dropdownText}
            containerStyle={styles.dropdownContainer}
            value={selectedOption}
            onChange={onDateSelect}
            activeColor="transparent"
          />

          <View style={styles.infoWrapper}>
            <Text style={styles.titleText}>BEFORE YOU BOOK</Text>
            <AntDesign name={'plus'} size={20} color={'white'} />
          </View>
          <View style={styles.infoWrapper}>
            <Text style={styles.titleText}>WHAT TO EXPECT</Text>
            <AntDesign name={'plus'} size={20} color={'white'} />
          </View>
          <ImageBackground
            source={imagePath.linearBackground}
            style={styles.eventWrapper}>
            <CustomImage url={imagePath.event} height={80} width={80} />
            <Text style={styles.subText}>
              Event details—like the restaurant, table, and hints about your
              group—will be revealed{' '}
              <Text style={styles.highlightText}>1 day</Text> before.
            </Text>
          </ImageBackground>
        </View>
        <CommonButton
          title="Book Now"
          disable
          customStyles={styles.buttonContainer}
        />
      </ImageBackground>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: globalStyleDefinitions.gap.gap,
    marginTop: Platform.select({
      ios: 3 * globalStyleDefinitions.screenPadding.padding,
      android: 2 * globalStyleDefinitions.screenPadding.padding,
    }),
  },
  headerTitle: {
    color: colors.white,
    fontSize: getScaledFontSize(24),
    fontFamily: fonts.soraRegular,
    flex: 1,
  },
  listWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: globalStyleDefinitions.gap.gap,
    marginTop: 2 * globalStyleDefinitions.mt_15.marginTop,
  },
  listContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
  },
  selectedItem: {
    backgroundColor: colors.white,
  },
  listText: {
    color: colors.white,
    fontFamily: fonts.fontSemiBold,
    fontSize: getScaledFontSize(14),
  },
  selectedText: {
    color: colors.black,
  },
  dropdownWrapper: {
    height: 50,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
    paddingHorizontal: globalStyleDefinitions.cardInnerPadding.padding,
    marginTop: 2 * globalStyleDefinitions.mt_15.marginTop,
  },
  dropdownPlaceholder: {
    color: colors.white,
    fontFamily: fonts.fontRegular,
    fontSize: getScaledFontSize(14),
  },
  dropdownText: {
    color: colors.white,
    fontFamily: fonts.fontSemiBold,
    fontSize: getScaledFontSize(14),
  },
  dropdownContainer: {
    backgroundColor: colors.primary,
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
  },
  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2 * globalStyleDefinitions.mt_15.marginTop,
  },
  titleText: {
    color: colors.lightPurple,
    fontFamily: fonts.fontMedium,
    fontSize: getScaledFontSize(12),
    flex: 1,
    letterSpacing: 2,
  },
  buttonContainer: {
    marginBottom: globalStyleDefinitions.mt_15.marginTop,
  },
  eventWrapper: {
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
    marginTop: 2 * globalStyleDefinitions.mt_15.marginTop,
    padding: globalStyleDefinitions.cardInnerPadding.padding,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    gap: 2 * globalStyleDefinitions.gap.gap,
  },
  subText: {
    color: colors.white,
    fontSize: getScaledFontSize(12),
    lineHeight: getScaledFontSize(18),
    fontFamily: fonts.fontRegular,
    marginRight: 100,
  },
  highlightText: {
    color: colors.lightPurple,
    fontSize: getScaledFontSize(12),
    lineHeight: getScaledFontSize(18),
    fontFamily: fonts.fontBold,
  },
});

export default Dining;
