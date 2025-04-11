import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearWrapperContainer from '../../../components/wrapper/LinearWrapperContainer';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import {colors} from '../../../constants/colors';
import commonStyles from '../../../constants/commonStyles';
import {fonts} from '../../../constants/fonts';
import {getScaledFontSize} from '../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';
import mockBlockedUsers from './components/mockBlockedUsers';
import CustomHeader from '../../../components/header/CustomHeader';

const Blocked = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const [search, setSearch] = useState('');
  const [blockedUsers, setBlockedUsers] = useState(mockBlockedUsers);

  const filteredUsers = blockedUsers.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleUnblock = (id: string) => {
    setBlockedUsers(prev => prev.filter(user => user.id !== id));
  };

  const renderItem = ({item}: any) => (
    <View style={styles.userRow}>
      <Image source={{uri: item.avatar}} style={styles.avatar} />
      <Text style={styles.userName}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleUnblock(item.id)}>
        <Text style={styles.unblockText}>Unblock</Text>
        <View style={styles.unblockUnderline} />
      </TouchableOpacity>
    </View>
  );

  return (
    <WrapperContainer>
      <LinearWrapperContainer>
        <View style={commonStyles.flexFull}>
          <CustomHeader title="Blocked" />

          <View style={commonStyles.fullInnerContainer}>
            <View style={styles.searchWrapper}>
              <AntDesign
                name="search1"
                size={20}
                color={colors.placeholderColor}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                value={search}
                onChangeText={setSearch}
                placeholderTextColor={colors.placeholderColor}
              />
            </View>

            <FlatList
              data={filteredUsers}
              keyExtractor={item => item.id}
              renderItem={renderItem}
            />
          </View>
        </View>
      </LinearWrapperContainer>
    </WrapperContainer>
  );
};

export default Blocked;

const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: globalStyleDefinitions.gap.gap,
    marginTop: Platform.select({
      ios: 2 * globalStyleDefinitions.screenPadding.padding,
      android: 2 * globalStyleDefinitions.screenPadding.padding,
    }),
    backgroundColor: colors.white,
    borderBottomLeftRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
    borderBottomRightRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
    overflow: 'hidden',
    height: 60,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  headerTitle: {
    color: colors.black,
    fontSize: getScaledFontSize(22),
    fontFamily: fonts.fontSemiBold,
    marginLeft: globalStyleDefinitions.mr_10.marginRight,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
    borderWidth: 1,
    borderColor: colors.placeholderColor,
    marginTop: globalStyleDefinitions.mt_10.marginTop,
    marginBottom: globalStyleDefinitions.mb_10.marginBottom,
    paddingHorizontal: globalStyleDefinitions.screenPadding.padding / 2,
  },
  searchIcon: {
    marginRight: globalStyleDefinitions.gap.gap,
  },
  searchInput: {
    flex: 1,
    fontSize: getScaledFontSize(16),
    paddingVertical: globalStyleDefinitions.screenPadding.padding / 2,
    color: colors.black,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: globalStyleDefinitions.screenPadding.padding / 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 2 * globalStyleDefinitions.br_10.borderRadius,
    marginRight: globalStyleDefinitions.mb_10.marginBottom,
  },
  userName: {
    flex: 1,
    fontSize: getScaledFontSize(16),
    color: colors.black,
  },
  unblockText: {
    color: colors.primary,
    fontFamily: fonts.fontSemiBold,
    fontSize: getScaledFontSize(14),
  },
  unblockUnderline: {
    height: 1,
    backgroundColor: colors.primary,
    marginTop: 2,
    width: '100%',
  },
});
