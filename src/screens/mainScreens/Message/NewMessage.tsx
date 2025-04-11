import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomImage from '../../../components/atoms/image/CustomImage';
import CustomHeader from '../../../components/header/CustomHeader';
import LinearWrapperContainer from '../../../components/wrapper/LinearWrapperContainer';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import {colors} from '../../../constants/colors';
import commonStyles from '../../../constants/commonStyles';
import {fonts} from '../../../constants/fonts';
import {getScaledFontSize} from '../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';
import {iconPath} from '../../../constants/iconPath';
import {navigationStrings} from '../../../navigation/navigationStrings';
import SuggestionCard from './components/SuggestionCard';

const NewMessage = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const [search, setSearch] = useState<string>('');

  const onGroupChat = () => {
    navigation.navigate(navigationStrings.NewGroup);
  };

  const filteredData = data.filter(item =>
    item?.name?.toLowerCase()?.includes(search?.toLowerCase()),
  );

  const renderItem = useCallback(({item}: any) => {
    return <SuggestionCard item={item} />;
  }, []);

  return (
    <WrapperContainer>
      <LinearWrapperContainer>
        <CustomHeader title="New Message" isShadow={false} />
        <View style={styles.headerWrapper}>
          <Text style={styles.headerSubText}>To:</Text>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Type a name or group"
            placeholderTextColor={colors.placeholderColor}
            style={styles.input}
          />
        </View>
        <View style={commonStyles.fullInnerContainer}>
          <TouchableOpacity
            style={styles.rowWrapper}
            activeOpacity={0.9}
            onPress={onGroupChat}>
            <CustomImage url={iconPath.groupChat} height={24} width={24} />
            <Text style={styles.buttonText}>Group Chat</Text>
          </TouchableOpacity>
          <Text style={styles.titleText}>Suggested</Text>
          <FlatList
            data={filteredData}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
          />
        </View>
      </LinearWrapperContainer>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    paddingHorizontal: globalStyleDefinitions.cardInnerPadding.padding,
    alignItems: 'center',
    backgroundColor: colors.white,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
    top: -5,
    gap: globalStyleDefinitions.gap.gap,
  },
  headerSubText: {
    fontFamily: fonts.fontRegular,
    color: colors.placeholderColor,
    fontSize: getScaledFontSize(14),
    lineHeight: getScaledFontSize(16),
  },
  input: {
    flex: 1,
    height: 50,
    textAlignVertical: 'center',
    verticalAlign: 'middle',
    paddingVertical: 0,
    fontFamily: fonts.fontSemiBold,
    fontSize: getScaledFontSize(14),
    lineHeight: getScaledFontSize(16),
    color: colors.black,
  },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: globalStyleDefinitions.gap.gap,
  },
  buttonText: {
    fontFamily: fonts.fontMedium,
    color: colors.black,
    fontSize: getScaledFontSize(16),
    lineHeight: getScaledFontSize(20),
  },
  titleText: {
    fontFamily: fonts.fontSemiBold,
    color: colors.placeholderColor,
    fontSize: getScaledFontSize(10),
    lineHeight: getScaledFontSize(14),
    marginTop: globalStyleDefinitions.commonItemMargin.margin,
  },
});

export default NewMessage;

const data = [
  {
    id: 1,
    name: 'Iska Piñero',
    profile_image: {uri: 'https://randomuser.me/api/portraits/women/32.jpg'},
  },
  {
    id: 2,
    name: 'Marview Segismundo',
    profile_image: {uri: 'https://randomuser.me/api/portraits/men/20.jpg'},
  },
  {
    id: 3,
    name: 'Abby Ong',
    profile_image: {uri: 'https://randomuser.me/api/portraits/men/30.jpg'},
  },
  {
    id: 4,
    name: 'Bowie Linga',
    profile_image: {uri: 'https://randomuser.me/api/portraits/women/40.jpg'},
  },
];
