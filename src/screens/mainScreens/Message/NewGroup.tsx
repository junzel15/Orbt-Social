import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import CommonButton from '../../../components/atoms/button/CommonButton';
import SearchInput from '../../../components/atoms/input/SearchInput';
import CustomHeader from '../../../components/header/CustomHeader';
import LinearWrapperContainer from '../../../components/wrapper/LinearWrapperContainer';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import {colors} from '../../../constants/colors';
import commonStyles from '../../../constants/commonStyles';
import {fonts} from '../../../constants/fonts';
import {getScaledFontSize} from '../../../constants/globalFunctions';
import {globalStyleDefinitions} from '../../../constants/globalStyleDefinitions';
import {navigationStrings} from '../../../navigation/navigationStrings';
import GroupSuggestionCard from './components/GroupSuggestionCard';
import SelectedMemberCard from './components/SelectedMemberCard';

const NewGroup = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const [name, setName] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [selectedMembers, setSelectedMembers] = useState<Array<any>>([]);

  const filteredData = data.filter(item =>
    item?.name?.toLowerCase()?.includes(search?.toLowerCase()),
  );

  const onCreateGroup = () => {
    navigation.navigate(navigationStrings.Chat, {
      item: {
        name: name,
        profile_image: selectedMembers[0]?.profile_image,
        isGroup: true,
      },
    });
  };

  const renderItem = useCallback(
    ({item}: any) => {
      const isSelected = selectedMembers.some(member => member.id == item.id);

      const onPress = () => {
        if (isSelected) {
          setSelectedMembers(prev =>
            prev.filter(member => member.id != item.id),
          );
        } else {
          setSelectedMembers(prev => [...prev, item]);
        }
      };
      return (
        <GroupSuggestionCard
          item={item}
          onPress={onPress}
          isSelected={isSelected}
        />
      );
    },
    [selectedMembers],
  );

  const selectedRenderItem = useCallback(({item}: any) => {
    const onRemove = () => {
      setSelectedMembers(prev => prev.filter(i => i.id != item.id));
    };
    return <SelectedMemberCard item={item} onRemove={onRemove} />;
  }, []);

  return (
    <WrapperContainer>
      <LinearWrapperContainer>
        <CustomHeader title="New Group" />
        <View style={commonStyles.fullInnerContainer}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Group Chat Name (optional)"
            placeholderTextColor={colors.placeholderColor}
            style={styles.input}
          />
          <SearchInput onChangeText={setSearch} value={search} />
          <View>
            <FlatList
              data={selectedMembers}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={selectedRenderItem}
            />
          </View>
          {filteredData?.length > 0 && (
            <Text style={styles.titleText}>Suggested</Text>
          )}
          <FlatList
            data={filteredData}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
          />
          <CommonButton
            title="Create Group Chat"
            disable={selectedMembers?.length == 0}
            onPress={onCreateGroup}
          />
        </View>
      </LinearWrapperContainer>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    textAlignVertical: 'center',
    verticalAlign: 'middle',
    paddingVertical: 0,
    fontFamily: fonts.fontSemiBold,
    fontSize: getScaledFontSize(14),
    lineHeight: getScaledFontSize(16),
    color: colors.black,
  },
  titleText: {
    fontFamily: fonts.fontSemiBold,
    color: colors.placeholderColor,
    fontSize: getScaledFontSize(10),
    lineHeight: getScaledFontSize(14),
    marginTop: globalStyleDefinitions.commonItemMargin.margin,
  },
});

export default NewGroup;

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
