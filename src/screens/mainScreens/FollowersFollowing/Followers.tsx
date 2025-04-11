import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import LinearWrapperContainer from '../../../components/wrapper/LinearWrapperContainer';
import commonStyles from '../../../constants/commonStyles';
import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';
import EmptyList from './components/EmptyList';
import FollowerCard from './components/FollowerCard';
import SearchInput from '../../../components/atoms/input/SearchInput';

const data = [
  {
    id: 1,
    profile_picture: 'https://randomuser.me/api/portraits/men/10.jpg',
    name: 'Iska Piñero',
    isFollowing: true,
  },
  {
    id: 2,
    profile_picture: 'https://randomuser.me/api/portraits/men/10.jpg',
    name: 'Marvie Segismundo',
    isFollowing: true,
  },
  {
    id: 3,
    profile_picture: 'https://randomuser.me/api/portraits/men/10.jpg',
    name: 'Abby Ong',
    isFollowing: true,
  },
  {
    id: 4,
    profile_picture: 'https://randomuser.me/api/portraits/men/10.jpg',
    name: 'Bowie Linga',
    isFollowing: false,
  },
];

const Followers = () => {
  const isFocus = useIsFocused();

  const [allData, setAllData] = useState<Array<any>>(data);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    setSearch('');
    setAllData(data);
  }, [isFocus]);

  const renderItem = useCallback(
    ({item}: any) => {
      const onRemove = () => {
        const updatedData = allData.filter(user => user?.id != item?.id);
        setAllData(updatedData);
      };
      return <FollowerCard item={item} onRemove={onRemove} />;
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

export default Followers;
