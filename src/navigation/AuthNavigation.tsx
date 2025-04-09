import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import OnBoarding from '../screens/authScreens/OnBoarding';
import Register from '../screens/authScreens/Register';
import Confirmation from '../screens/authScreens/Register/Confirmation';
import PhoneVerify from '../screens/authScreens/Register/PhoneVerify';
import Splash from '../screens/authScreens/Splash';
import UserSetup from '../screens/authScreens/UserSetup';
import AboutMe from '../screens/authScreens/UserSetup/AboutMe';
import BirthdaySelection from '../screens/authScreens/UserSetup/BirthdaySelection';
import GenderSelection from '../screens/authScreens/UserSetup/GenderSelection';
import InterestSelection from '../screens/authScreens/UserSetup/InterestsSelection';
import { navigationStrings } from './navigationStrings';
import Login from '../screens/authScreens/Login';
import ForgetPassword from '../screens/authScreens/ForgetPassword.tsx';
import VerifyScreen from '../screens/authScreens/ForgetPassword.tsx/VerifyScreen.tsx';
import NewPassword from '../screens/authScreens/ForgetPassword.tsx/NewPassword.tsx';
import SuccessfulPassword from '../screens/authScreens/ForgetPassword.tsx/SuccessfulPassword.tsx';
import LocationAllow from '../screens/authScreens/AccessScreen/LocationAllow.tsx';
import NotificationAllow from '../screens/authScreens/AccessScreen/NotificationAllow.tsx';

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
      <AuthStack.Screen
        name={navigationStrings.Login}
        component={Login}
        options={options}
      />
      <AuthStack.Screen
        name={navigationStrings.ForgetPassword}
        component={ForgetPassword}
        options={options}
      />
      <AuthStack.Screen
        name={navigationStrings.VerifyScreen}
        component={VerifyScreen}
        options={options}
      />
      <AuthStack.Screen
        name={navigationStrings.NewPassword}
        component={NewPassword}
        options={options}
      />
      <AuthStack.Screen
        name={navigationStrings.SuccessfulPassword}
        component={SuccessfulPassword}
        options={options}
      />
      <AuthStack.Screen
        name={navigationStrings.NotificationAllow}
        component={NotificationAllow}
        options={options}
      />
      <AuthStack.Screen
        name={navigationStrings.LocationAllow}
        component={LocationAllow}
        options={options}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
