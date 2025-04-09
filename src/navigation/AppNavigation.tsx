import React from 'react';
import { useSelector } from 'react-redux';
import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';

const AppNavigation = () => {

  const accessToken = useSelector((state: any) => state.authState.accessToken);

  return accessToken ?
    <MainNavigation /> :
    <AuthNavigation />;
};

export default AppNavigation;
