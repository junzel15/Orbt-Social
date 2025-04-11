import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomImage from '../components/atoms/image/CustomImage';
import {colors} from '../constants/colors';
import {globalStyleDefinitions} from '../constants/globalStyleDefinitions';
import {BottomIcon} from '../constants/iconPath';
import Home from '../screens/mainScreens/Home';
import Message from '../screens/mainScreens/Message';
import MyBookings from '../screens/mainScreens/MyBookings';
import Profile from '../screens/mainScreens/Profile';
import {navigationStrings} from './navigationStrings';

const Tab = createBottomTabNavigator();

const TabIcons = ({isFocused, routeName}: any) => {
  return routeName == navigationStrings.Home ? (
    <>
      <CustomImage
        height={44}
        width={44}
        url={isFocused ? BottomIcon.homeFill : BottomIcon.home}
      />
      {isFocused && (
        <CustomImage
          height={20}
          width={70}
          url={BottomIcon.sideView}
          imageStyle={styles.icon}
        />
      )}
    </>
  ) : routeName == navigationStrings.MyBookings ? (
    <>
      <CustomImage
        height={44}
        width={44}
        url={isFocused ? BottomIcon.calendarFill : BottomIcon.calendar}
      />
      {isFocused && (
        <CustomImage
          height={20}
          width={70}
          url={BottomIcon.centerView}
          imageStyle={styles.icon}
        />
      )}
    </>
  ) : routeName == navigationStrings.Message ? (
    <>
      <CustomImage
        height={44}
        width={44}
        url={isFocused ? BottomIcon.messageFill : BottomIcon.message}
      />
      {isFocused && (
        <CustomImage
          height={20}
          width={70}
          url={BottomIcon.centerView}
          imageStyle={styles.icon}
        />
      )}
    </>
  ) : routeName == navigationStrings.Profile ? (
    <>
      <CustomImage
        height={44}
        width={44}
        url={isFocused ? BottomIcon.profileFill : BottomIcon.profile}
      />
      {isFocused && (
        <CustomImage
          height={20}
          width={70}
          url={BottomIcon.sideView}
          imageStyle={styles.rightIcon}
        />
      )}
    </>
  ) : null;
};

const BottomNavigation = () => {
  const screenOptions = () => ({
    headerShown: false,
    shifting: false,
    tabBarShowLabel: false,
    tabBarStyle: styles.fullContainer,
    tabBarHideOnKeyboard: true,
  });
  return (
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name={navigationStrings.Home}
          component={Home}
          options={() => ({
            tabBarIcon: ({focused}) => (
              <TabIcons
                isFocused={focused}
                routeName={navigationStrings.Home}
              />
            ),
          })}
        />

        <Tab.Screen
          name={navigationStrings.MyBookings}
          component={MyBookings}
          options={() => ({
            tabBarIcon: ({focused}) => (
              <TabIcons
                isFocused={focused}
                routeName={navigationStrings.MyBookings}
              />
            ),
          })}
        />

        <Tab.Screen
          name={navigationStrings.Message}
          component={Message}
          options={() => ({
            tabBarIcon: ({focused}) => (
              <TabIcons
                isFocused={focused}
                routeName={navigationStrings.Message}
              />
            ),
          })}
        />

        <Tab.Screen
          name={navigationStrings.Profile}
          component={Profile}
          options={() => ({
            tabBarIcon: ({focused}) => (
              <TabIcons
                isFocused={focused}
                routeName={navigationStrings.Profile}
              />
            ),
          })}
        />
      </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  fullContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 3 * globalStyleDefinitions.br_10.borderRadius,
    borderTopRightRadius: 3 * globalStyleDefinitions.br_10.borderRadius,
    overflow: 'hidden',
    height: 80,
    paddingTop: 15,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  icon: {
    position: 'absolute',
    top: 40,
  },
  rightIcon: {
    position: 'absolute',
    top: 40,
    transform: [{scaleX: -1}],
  },
});

export default BottomNavigation;
