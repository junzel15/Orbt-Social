import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import CustomImage from '../../../components/atoms/image/CustomImage';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import {getAccessToken} from '../../../constants/asyncStoreManager';
import {windowHeight, windowWidth} from '../../../constants/globalConstants';
import {imagePath} from '../../../constants/imagePath';
import {navigationStrings} from '../../../navigation/navigationStrings';
import {setAccessToken} from '../../../redux/slices/authState';
import {ImageBackground, StyleSheet} from 'react-native';

const Splash = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      getInitialData();
    }, 3000);
  }, []);

  const getInitialData = async () => {
    const accessToken = await getAccessToken();

    console.log(accessToken);

    if (accessToken) {
      dispatch(setAccessToken(accessToken.toString()));
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: navigationStrings.OnBoarding}],
      });
    }
  };

  return (
    <WrapperContainer>
      <ImageBackground source={imagePath.background} style={styles.image}>
        <CustomImage url={imagePath.appLogo} height={70} width={windowWidth} />
      </ImageBackground>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  image: {
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Splash;
