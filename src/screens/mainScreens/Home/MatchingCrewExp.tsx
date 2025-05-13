import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import SearchScreen from './components/SearchCard';
import SuccessfulCardExp from './components/SuccessfulCardExp';

const MatchingCrewExp = () => {
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
        <SuccessfulCardExp />
      )}
    </WrapperContainer>
  );
};

export default MatchingCrewExp;
