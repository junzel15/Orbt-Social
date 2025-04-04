import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import SearchScreen from './components/SearchCard';
import SuccessfulCard from './components/SuccessfulCard';

const MatchingCrew = () => {
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => setIsCompleted(true));
  }, []);

  return <WrapperContainer>
    {!isCompleted ? <SearchScreen progress={progress} /> : <SuccessfulCard />
    }
  </WrapperContainer>;
};

export default MatchingCrew;
