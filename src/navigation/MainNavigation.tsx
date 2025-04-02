import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BottomNavigation from './BottomNavigation';
import {navigationStrings} from './navigationStrings';
import Dining from '../screens/mainScreens/Home/Dining';

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
    </MainStack.Navigator>
  );
};

export default MainNavigation;
