import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import LinearWrapperContainer from '../../../components/wrapper/LinearWrapperContainer';
import commonStyles from '../../../constants/commonStyles';
import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';
import EmptyList from './components/EmptyList';
import FollowingCard from './components/FollowingCard';
import SearchInput from './components/SearchInput';

const data = [
  {
    id: 1,
    profile_picture: 'https://randomuser.me/api/portraits/men/10.jpg',
    name: 'Iska Piñero',
  },
  {
    id: 2,
    profile_picture: 'https://randomuser.me/api/portraits/men/10.jpg',
    name: 'Marvie Segismundo',
  },
  {
    id: 3,
    profile_picture: 'https://randomuser.me/api/portraits/men/10.jpg',
    name: 'Abby Ong',
  },
  {
    id: 4,
    profile_picture: 'https://randomuser.me/api/portraits/men/10.jpg',
    name: 'Bowie Linga',
  },
];

const Following = () => {
  const isFocus = useIsFocused();

  const [allData, setAllData] = useState<Array<any>>(data);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    setSearch('');
    setAllData(data);
  }, [isFocus]);

  const renderItem = useCallback(
    ({item}: any) => {
      const onBlock = () => {
        const updatedData = allData.filter(user => user?.id != item?.id);
        setAllData(updatedData);
      };
      return <FollowingCard item={item} onBlock={onBlock} />;
    },
    [allData],
  );

  const ListEmptyComponent = useCallback(() => {
    return <EmptyList text="No Followers Found" />;
  }, []);

  const filteredData = allData.filter(user =>
    user?.name?.toLowerCase()?.includes(search?.toLowerCase()),
  );

  return (
    <LinearWrapperContainer>
      <View style={commonStyles.fullInnerContainer}>
        <SearchInput value={search} onChangeText={setSearch} />
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={styles.contentContainer}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
    </LinearWrapperContainer>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: globalStyleDefinitions.commonItemMargin.margin,
  },
});

export default Following;
