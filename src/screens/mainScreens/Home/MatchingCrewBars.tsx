import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import SearchScreen from './components/SearchCard';
import SuccessfulCardBars from './components/SuccessfulCardBars';

const MatchingCrewBars = () => {
  const [progress] = useState(new Animated.Value(0));
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => setIsCompleted(true));
  }, [progress]);

  return (
    <WrapperContainer>
      {!isCompleted ? (
        <SearchScreen progress={progress} />
      ) : (
        <SuccessfulCardBars />
      )}
    </WrapperContainer>
  );
};

export default MatchingCrewBars;
