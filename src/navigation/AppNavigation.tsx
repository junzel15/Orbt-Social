import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import AuthNavigation from './AuthNavigation';
import SetupNavigation from './SetupNavigation';
import MainNavigation from './MainNavigation';
import {navigationStrings} from './navigationStrings';
import axios from 'axios';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const accessToken = useSelector((state: any) => state.authState.accessToken);
  const uuid = useSelector((state: any) => state.userSetup.uuid);
  const [initialScreen, setInitialScreen] = useState<'auth' | 'setup' | 'main'>(
    'auth',
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileAndDecide = async () => {
      if (!accessToken || !uuid) {
        setInitialScreen('auth');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `https://du3kce1sli.execute-api.us-east-1.amazonaws.com/default/profile/${uuid}`,
          {
            headers: {Authorization: `Bearer ${accessToken}`},
          },
        );

        const profile = res.data;
        const isFilled = (v: any) => v && v !== '';
        const hasAllFields =
          isFilled(profile.gender) &&
          isFilled(profile.birthdate) &&
          isFilled(profile.bio) &&
          Array.isArray(profile.interests) &&
          profile.interests.length > 0;

        setInitialScreen(hasAllFields ? 'main' : 'setup');
      } catch (error) {
        setInitialScreen('auth');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndDecide();
  }, [accessToken, uuid]);

  if (loading) return null;

  if (initialScreen === 'auth') return <AuthNavigation />;
  if (initialScreen === 'setup') return <SetupNavigation />;

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={navigationStrings.BottomNavigation}
        component={MainNavigation}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
