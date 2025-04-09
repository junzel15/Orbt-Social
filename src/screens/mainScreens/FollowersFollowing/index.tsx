import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import CustomHeader from '../../../components/header/CustomHeader';
import LinearWrapperContainer from '../../../components/wrapper/LinearWrapperContainer';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import {colors} from '../../../constants/colors';
import {fonts} from '../../../constants/fonts';
import {getScaledFontSize} from '../../../constants/globalFunctions';
import {navigationStrings} from '../../../navigation/navigationStrings';
import Followers from './Followers';
import Following from './Following';

const Tab = createMaterialTopTabNavigator();

const FollowersFollowing = () => {
  const route = useRoute<RouteProp<any>>();

  const {name} = route.params || {};

  const screenOptions = {
    tabBarStyle: styles.tabBarStyle,
    tabBarIndicatorStyle: styles.indicatorStyle,
    tabBarLabelStyle: styles.tabBarText,
    swipeEnabled: true,
    tabBarInactiveTintColor: colors.black,
    tabBarActiveTintColor: colors.primary,
  };

  return (
    <WrapperContainer>
      <LinearWrapperContainer>
        <CustomHeader title="Constante Agpaoa" />
        <Tab.Navigator
          screenOptions={screenOptions}
          initialRouteName={name || navigationStrings.Followers}>
          <Tab.Screen
            name={navigationStrings.Followers}
            component={Followers}
          />
          <Tab.Screen
            name={navigationStrings.Following}
            component={Following}
          />
        </Tab.Navigator>
      </LinearWrapperContainer>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colors.white,
    elevation: 1,
  },
  indicatorStyle: {backgroundColor: colors.primary},
  tabBarText: {
    fontFamily: fonts.fontSemiBold,
    fontSize: getScaledFontSize(14),
  },
});

export default FollowersFollowing;
