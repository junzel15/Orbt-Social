import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import SearchScreen from './components/SearchCard';
import SuccessfulCard from './components/SuccessfulCard';
import {RouteProp, useRoute} from '@react-navigation/native';

const MatchingCrew = () => {
  const [progress] = useState(new Animated.Value(0));
  const [isCompleted, setIsCompleted] = useState(false);

  const route = useRoute<RouteProp<any>>();
  const bookingType = route.params?.bookingType;

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
        <SuccessfulCard bookingType={bookingType} />
      )}
    </WrapperContainer>
  );
};

export default MatchingCrew;
