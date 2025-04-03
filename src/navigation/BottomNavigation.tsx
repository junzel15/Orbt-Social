import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomImage from '../components/atoms/image/CustomImage';
import {colors} from '../constants/colors';
import commonStyles from '../constants/commonStyles';
import {windowWidth} from '../constants/globalConstants';
import {globalStyleDefinitions} from '../constants/globalStyleDefinitions';
import {BottomIcon} from '../constants/iconPath';
import Calendar from '../screens/mainScreens/Calendar';
import Home from '../screens/mainScreens/Home';
import Message from '../screens/mainScreens/Message';
import Profile from '../screens/mainScreens/Profile';
import {navigationStrings} from './navigationStrings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
  ) : routeName == navigationStrings.Calendar ? (
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

const BottomTab = createBottomTabNavigator();

const BottomNavigation = () => {
  const navigationOptions = {
    headerShown: false,
  };

  return (
    <View style={commonStyles.wrapperContainer}>
      <BottomTab.Navigator
        screenOptions={({route}) => ({
          ...navigationOptions,
        })}
        initialRouteName={navigationStrings.Home}
        tabBar={BottomTabBar}>
        <BottomTab.Screen name={navigationStrings.Home} component={Home} />
        <BottomTab.Screen
          name={navigationStrings.Calendar}
          component={Calendar}
        />
        <BottomTab.Screen
          name={navigationStrings.Message}
          component={Message}
        />
        <BottomTab.Screen
          name={navigationStrings.Profile}
          component={Profile}
        />
      </BottomTab.Navigator>
    </View>
  );
};

const BottomTabBar = ({state, descriptors, navigation}: any) => {
  return (
    <View style={styles.fullContainer}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.singleTabContainer}
            activeOpacity={1}>
            <TabIcons isFocused={isFocused} routeName={route.name} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  fullContainer: {
    flexDirection: 'row',
    width: windowWidth,
    backgroundColor: colors.white,
    alignItems: 'center',
    borderTopLeftRadius: 3 * globalStyleDefinitions.br_10.borderRadius,
    borderTopRightRadius: 3 * globalStyleDefinitions.br_10.borderRadius,
    overflow: 'hidden',
    height: 80,
  },
  singleTabContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    height: 80,
  },
  icon: {
    position: 'absolute',
    bottom: 0,
  },
  rightIcon: {
    position: 'absolute',
    bottom: 0,
    transform: [{scaleX: -1}],
  },
});
