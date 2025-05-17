import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {imagePath} from '../../../../constants/imagePath';
import commonStyles from '../../../../constants/commonStyles';
import {windowHeight, windowWidth} from '../../../../constants/globalConstants';
import {colors} from '../../../../constants/colors';
import CommonButton from '../../../../components/atoms/button/CommonButton';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {navigationStrings} from '../../../../navigation/navigationStrings';

type Props = {
  bookingType: string;
};

const SuccessfulCard = ({bookingType}: Props) => {
  const navigation = useNavigation<NavigationProp<any>>();

  const onViewBook = () => {
    navigation.navigate(navigationStrings.DiningDetails, {
      bookingType,
    });
  };

  return (
    <LinearGradient
      colors={['#4C0BCE', '#180028', '#000000']}
      locations={[0.0, 0.5, 0.8]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.gradient}>
      <View style={commonStyles.fullInnerContainer}>
        <View style={styles.container}>
          <Image source={imagePath.sucessfully} style={styles.successImage} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Booking{'\n'} Successful!</Text>
            <Text style={styles.subtitle}>
              Your reservation is confirmed! Tap the {'\n'} button below to view
              your ticket details.
            </Text>
          </View>
        </View>
        <CommonButton title="View Booking" onPress={onViewBook} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  successImage: {
    width: windowWidth / 1.1,
    height: windowHeight / 2.5,
  },
  textContainer: {
    marginTop: 40,
  },
  title: {
    color: colors.white,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.gray,
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default SuccessfulCard;
