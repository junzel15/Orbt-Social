import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {navigationStrings} from './navigationStrings';
import Splash from '../screens/Splash';
import OnBoarding from '../screens/OnBoarding';
import Register from '../screens/auth/Register';
import PhoneVerify from '../screens/auth/Register/PhoneVerify';
import Confirmation from '../screens/auth/Register/Confirmation';
import UserSetup from '../screens/auth/UserSetup';
import GenderSelection from '../screens/auth/UserSetup/GenderSelection';
import BirthdaySelection from '../screens/auth/UserSetup/BirthdaySelection';
import AboutMe from '../screens/auth/UserSetup/AboutMe';
import InterestSelection from '../screens/auth/UserSetup/InterestsSelection';

const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => {
  const options: any = {
    gestureEnabled: false,
    animation: 'slide_from_right',
  };

  const screenOptions = {
    headerShown: false,
  };

  return (
    <AuthStack.Navigator screenOptions={screenOptions}>
      <AuthStack.Screen
        name={navigationStrings.Splash}
        component={Splash}
        options={options}
      />
      <AuthStack.Screen
        name={navigationStrings.OnBoarding}
        component={OnBoarding}
        options={options}
      />
      <AuthStack.Screen
        name={navigationStrings.Register}
        component={Register}
        options={options}
      />
      <AuthStack.Screen
        name={navigationStrings.PhoneVerify}
        component={PhoneVerify}
        options={options}
      />
      <AuthStack.Screen
        name={navigationStrings.Confirmation}
        component={Confirmation}
        options={options}
      />
      <AuthStack.Screen
        name={navigationStrings.UserSetup}
        component={UserSetup}
        options={options}
      />
      <AuthStack.Screen
        name={navigationStrings.GenderSelection}
        component={GenderSelection}
        options={options}
      />
      <AuthStack.Screen
        name={navigationStrings.BirthdaySelection}
        component={BirthdaySelection}
        options={options}
      />
      <AuthStack.Screen
        name={navigationStrings.AboutMe}
        component={AboutMe}
        options={options}
      />
      <AuthStack.Screen
        name={navigationStrings.InterestSelection}
        component={InterestSelection}
        options={options}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
