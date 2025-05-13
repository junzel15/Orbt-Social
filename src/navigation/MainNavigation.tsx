import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Blocked from '../screens/mainScreens/Blocked';
import ChangePassword from '../screens/mainScreens/ChangePassword';
import FollowersFollowing from '../screens/mainScreens/FollowersFollowing';
import Bars from '../screens/mainScreens/Home/Bars';
import Dining from '../screens/mainScreens/Home/Dining';
import Experiences from '../screens/mainScreens/Home/Experiences';
import MatchingCrew from '../screens/mainScreens/Home/MatchingCrew';
import MatchingCrewBars from '../screens/mainScreens/Home/MatchingCrew';
import MatchingCrewExp from '../screens/mainScreens/Home/MatchingCrew';
import BarDetails from '../screens/mainScreens/Home/bookingDetails/BarDetails';
import BookingDiningDetails from '../screens/mainScreens/Home/bookingDetails/BookingDiningDetails';
import ExperienceDetails from '../screens/mainScreens/Home/bookingDetails/ExperienceDetails';
import CancelBooking from '../screens/mainScreens/Home/cancelEvent/CancelBooking';
import CancelEvent from '../screens/mainScreens/Home/cancelEvent/CancelEvent';
import GiveFeedback from '../screens/mainScreens/Home/reviewScreen/GiveFeedback';
import SuccessfulFeedback from '../screens/mainScreens/Home/reviewScreen/SuccessfulFeedback';
import Location from '../screens/mainScreens/Location';
import PasswordUpdated from '../screens/mainScreens/PasswordUpdated';
import EditProfile from '../screens/mainScreens/Profile/EditProfile';
import Settings from '../screens/mainScreens/Profile/Settings';
import Notification from '../screens/mainScreens/notification';
import BottomNavigation from './BottomNavigation';
import {navigationStrings} from './navigationStrings';
import NewMessage from '../screens/mainScreens/Message/NewMessage';
import NewGroup from '../screens/mainScreens/Message/NewGroup';
import Chat from '../screens/mainScreens/Chat';
import EventChat from '../screens/mainScreens/EventChat';
import InterestSelection from '../screens/authScreens/UserSetup/InterestsSelection';
import AboutMe from '../screens/authScreens/UserSetup/AboutMe';
import BirthdaySelection from '../screens/authScreens/UserSetup/BirthdaySelection';
import GenderSelection from '../screens/authScreens/UserSetup/GenderSelection';
import UserSetup from '../screens/authScreens/UserSetup';

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
        name={navigationStrings.MatchingCrewBars}
        component={MatchingCrewBars}
        options={options}
      />
      <MainStack.Screen
        name={navigationStrings.MatchingCrewExp}
        component={MatchingCrewExp}
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
      <MainStack.Screen
        name={navigationStrings.Settings}
        component={Settings}
        options={options}
      />
      <MainStack.Screen
        name={navigationStrings.EditProfile}
        component={EditProfile}
        options={options}
      />
      <MainStack.Screen
        name={navigationStrings.Blocked}
        component={Blocked}
        options={options}
      />
      <MainStack.Screen
        name={navigationStrings.ChangePassword}
        component={ChangePassword}
        options={options}
      />
      <MainStack.Screen
        name={navigationStrings.PasswordUpdated}
        component={PasswordUpdated}
        options={options}
      />
      <MainStack.Screen
        name={navigationStrings.FollowersFollowing}
        component={FollowersFollowing}
        options={options}
      />
      <MainStack.Screen
        name={navigationStrings.NewMessage}
        component={NewMessage}
        options={options}
      />
      <MainStack.Screen
        name={navigationStrings.NewGroup}
        component={NewGroup}
        options={options}
      />
      <MainStack.Screen
        name={navigationStrings.Chat}
        component={Chat}
        options={options}
      />
      <MainStack.Screen
        name={navigationStrings.EventChat}
        component={EventChat}
        options={options}
      />
      <MainStack.Screen
        name={navigationStrings.UserSetup}
        component={UserSetup}
        options={options}
      />
      <MainStack.Screen
        name={navigationStrings.GenderSelection}
        component={GenderSelection}
        options={options}
      />
      <MainStack.Screen
        name={navigationStrings.BirthdaySelection}
        component={BirthdaySelection}
        options={options}
      />
      <MainStack.Screen
        name={navigationStrings.AboutMe}
        component={AboutMe}
        options={options}
      />
      <MainStack.Screen
        name={navigationStrings.InterestSelection}
        component={InterestSelection}
        options={options}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigation;
