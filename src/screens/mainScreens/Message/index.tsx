import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomImage from '../../../components/atoms/image/CustomImage';
import SearchInput from '../../../components/atoms/input/SearchInput';
import CustomHeader from '../../../components/header/CustomHeader';
import LinearWrapperContainer from '../../../components/wrapper/LinearWrapperContainer';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import {colors} from '../../../constants/colors';
import commonStyles from '../../../constants/commonStyles';
import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';
import {iconPath} from '../../../constants/iconPath';
import {imagePath} from '../../../constants/imagePath';
import {navigationStrings} from '../../../navigation/navigationStrings';
import EmptyList from './components/EmptyList';
import FilterTab from './components/FilterTab';
import MessageCard from './components/MessageCard';

const Message = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const isFocus = useIsFocused();

  const [search, setSearch] = useState<string>('');
  const [allData, setAllData] = useState<Array<any>>([]);
  const [selectedTab, setSelectedTab] = useState<string>('All');

  useEffect(() => {
    setSearch('');
  }, [isFocus]);

  useEffect(() => {
    if (selectedTab) {
      if (selectedTab == 'Direct') {
        setAllData(chatList?.filter(item => !item?.isGroup) || []);
      } else if (selectedTab == 'Group Chat') {
        setAllData(chatList.filter(item => item?.isGroup) || []);
      } else {
        setAllData(chatList || []);
      }
    }
  }, [selectedTab]);

  const onEditPress = () => {
    navigation.navigate(navigationStrings.NewMessage);
  };

  const renderItem = useCallback(({item}: any) => {
    return <MessageCard item={item} />;
  }, []);

  const ListEmptyComponent = useCallback(() => {
    return <EmptyList text="No Messages Found" />;
  }, []);

  const filteredData = allData.filter(item =>
    item?.name?.toLowerCase()?.includes(search?.toLowerCase()),
  );

  return (
    <WrapperContainer>
      <LinearWrapperContainer>
        <CustomHeader title="Messages" />
        <View style={commonStyles.fullInnerContainer}>
          <View style={styles.rowWrapper}>
            <View style={commonStyles.flexFull}>
              <SearchInput onChangeText={setSearch} value={search} />
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={onEditPress}
              style={styles.editWrapper}>
              <CustomImage url={iconPath.edit} height={20} width={20} />
            </TouchableOpacity>
          </View>
          <FilterTab
            data={chatList}
            onSelectTab={setSelectedTab}
            selectedTab={selectedTab}
          />
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={ListEmptyComponent}
          />
        </View>
      </LinearWrapperContainer>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: globalStyleDefinitions.gap.gap,
  },
  editWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.primary,
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Message;

const chatList = [
  {
    id: 1,
    name: 'Iska Piñero',
    profile_image: {uri: 'https://randomuser.me/api/portraits/women/32.jpg'},
    last_message: 'You: Ok, thanks! · 9:25 AM',
    unread_count: 0,
  },
  {
    id: 2,
    name: 'Marview Segismundo',
    profile_image: {uri: 'https://randomuser.me/api/portraits/men/20.jpg'},
    last_message: 'Bro, what are you up to tonight?',
    unread_count: 1,
  },
  {
    id: 3,
    name: 'Event: BR0001',
    profile_image: imagePath.dining,
    last_message: 'ORBT: The countdown is over - Let the...',
    unread_count: 1,
    expire: '4hrs',
    isGroup: true,
    isEvent: true,
  },
  {
    id: 4,
    name: 'Event: BA0001',
    profile_image: imagePath.bar,
    last_message: 'Inka: On my way guys, See you!',
    unread_count: 0,
    expire: '4hrs',
    isGroup: true,
    isEvent: true,
  },
  {
    id: 5,
    name: 'Event: BR0001',
    profile_image: imagePath.experience,
    last_message: 'You: See you!',
    unread_count: 0,
    expire: '4hrs',
    isGroup: true,
    isEvent: true,
  },
  {
    id: 6,
    name: 'Iska, Marvie, Abby',
    profile_image: {uri: 'https://randomuser.me/api/portraits/women/40.jpg'},
    last_message: 'You: What’s up guys?!',
    unread_count: 0,
    isGroup: true,
  },
];
