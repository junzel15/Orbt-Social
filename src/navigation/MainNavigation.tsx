import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BottomNavigation from './BottomNavigation';
import {navigationStrings} from './navigationStrings';
import Dining from '../screens/mainScreens/Home/Dining';
import MatchingCrew from '../screens/mainScreens/Home/MatchingCrew';
import Bars from '../screens/mainScreens/Home/Bars';
import Experiences from '../screens/mainScreens/Home/Experiences';
import Notification from '../screens/mainScreens/notification';
import Location from '../screens/mainScreens/Location';

const MainStack = createNativeStackNavigator();

const MainNavigation = () => {
  const options: any = {
    gestureEnabled: false,
    animation: 'slide_from_right',
  };

  const screenOptions = {
    headerShown: false,
  };

  return (
    <MainStack.Navigator
      screenOptions={screenOptions}
      initialRouteName={navigationStrings.BottomNavigation}>
      <MainStack.Screen
        name={navigationStrings.BottomNavigation}
        component={BottomNavigation}
        options={options}
      />
      <MainStack.Screen
        name={navigationStrings.Dining}
        component={Dining}
        options={options}
      />
       <MainStack.Screen
        name={navigationStrings.Bars}
        component={Bars}
        options={options}
      />
       <MainStack.Screen
        name={navigationStrings.Experiences}
        component={Experiences}
        options={options}
      />
       <MainStack.Screen
        name={navigationStrings.MatchingCrew}
        component={MatchingCrew}
        options={options}
      />
      <MainStack.Screen
        name={navigationStrings.Notification}
        component={Notification}
        options={options}
      />
      <MainStack.Screen
        name={navigationStrings.Location}
        component={Location}
        options={options}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigation;
