import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserSetup from '../screens/authScreens/UserSetup';
import GenderSelection from '../screens/authScreens/UserSetup/GenderSelection';
import BirthdaySelection from '../screens/authScreens/UserSetup/BirthdaySelection';
import AboutMe from '../screens/authScreens/UserSetup/AboutMe';
import InterestSelection from '../screens/authScreens/UserSetup/InterestsSelection';
import LocationAllow from '../screens/authScreens/AccessScreen/LocationAllow';
import NotificationAllow from '../screens/authScreens/AccessScreen/NotificationAllow';
import {navigationStrings} from './navigationStrings';

const SetupStack = createNativeStackNavigator();

const SetupNavigation = () => {
  return (
    <SetupStack.Navigator screenOptions={{headerShown: false}}>
      <SetupStack.Screen
        name={navigationStrings.UserSetup}
        component={UserSetup}
      />
      <SetupStack.Screen
        name={navigationStrings.GenderSelection}
        component={GenderSelection}
      />
      <SetupStack.Screen
        name={navigationStrings.BirthdaySelection}
        component={BirthdaySelection}
      />
      <SetupStack.Screen name={navigationStrings.AboutMe} component={AboutMe} />
      <SetupStack.Screen
        name={navigationStrings.InterestSelection}
        component={InterestSelection}
      />
      <SetupStack.Screen
        name={navigationStrings.LocationAllow}
        component={LocationAllow}
      />
      <SetupStack.Screen
        name={navigationStrings.NotificationAllow}
        component={NotificationAllow}
      />
    </SetupStack.Navigator>
  );
};

export default SetupNavigation;
