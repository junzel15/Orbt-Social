import React, {useCallback, useState} from 'react';
import {FlatList} from 'react-native';
import WrapperContainer from '../../components/wrapper/WrapperContainer';
import {slides} from './component/data';
import OnBoardingProgress from './component/OnBoardingProgress';

const OnBoarding = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const renderItem = useCallback(
    ({item, index}: any) => {
      return (
        <OnBoardingProgress
          item={slides[activeIndex]}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      );
    },
    [activeIndex],
  );

  return (
    <WrapperContainer>
      <FlatList
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
      />
    </WrapperContainer>
  );
};

export default OnBoarding;
