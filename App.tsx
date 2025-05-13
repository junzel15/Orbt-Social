import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';

import './src/aws/aws-config';

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import AppNavigation from './src/navigation/AppNavigation';
import store from './src/redux/store/state';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <PaperProvider>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
