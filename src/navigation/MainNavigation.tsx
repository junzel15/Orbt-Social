import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BottomNavigation from './BottomNavigation';
import {navigationStrings} from './navigationStrings';
import Dining from '../screens/mainScreens/Home/Dining';
import BookingDiningDetails from '../screens/mainScreens/Home/bookingDetails/BookingDiningDetails';
import BarDetails from '../screens/mainScreens/Home/bookingDetails/BarDetails';
import ExperienceDetails from '../screens/mainScreens/Home/bookingDetails/ExperienceDetails';
import GiveFeedback from '../screens/mainScreens/Home/reviewScreen/GiveFeedback';
import SuccessfulFeedback from '../screens/mainScreens/Home/reviewScreen/SuccessfulFeedback';
import CancelBooking from '../screens/mainScreens/Home/cancelEvent/CancelBooking';
import CancelEvent from '../screens/mainScreens/Home/cancelEvent/CancelEvent';

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
        name={navigationStrings.DiningDetails}
        component={BookingDiningDetails}
        options={options}
      />
        <MainStack.Screen
        name={navigationStrings.BarDetails}
        component={BarDetails}
        options={options}
      />
        <MainStack.Screen
        name={navigationStrings.ExperienceDetails}
        component={ExperienceDetails}
        options={options}
      />
        <MainStack.Screen
        name={navigationStrings.GiveFeedback}
        component={GiveFeedback}
        options={options}
      />
       <MainStack.Screen
        name={navigationStrings.SuccessfulFeedback}
        component={SuccessfulFeedback}
        options={options}
      />
       <MainStack.Screen
        name={navigationStrings.CancelBooking}
        component={CancelBooking}
        options={options}
      />
       <MainStack.Screen
        name={navigationStrings.CancelEvent}
        component={CancelEvent}
        options={options}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigation;
