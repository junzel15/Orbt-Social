import React, { useEffect, useState } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { imagePath } from '../../../constants/imagePath';
import { windowHeight, windowWidth } from '../../../constants/globalConstants';
import CommonButton from '../../../components/atoms/button/CommonButton';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import commonStyles from '../../../constants/commonStyles';
import { globalStyleDefinitions } from '../../../constants/globalStyleDefinitions';

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

    const widthInterpolate = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%']
    });

    return (
        <View style={styles.container}>
            {!isCompleted ? (
                <WrapperContainer>
                    <View style={commonStyles.fullInnerContainer}  >
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} >
                            <View style={{ flex: 0.5, marginTop: 10 }} >
                                <Image source={imagePath.searchIcon} style={{ width: windowWidth / 1.3, height: windowHeight / 6 }} />
                                <View style={styles.progressBarBackground}>
                                    <Animated.View style={[styles.progressBar, { width: widthInterpolate }]} />
                                </View>
                            </View>
                            <View >
                                <Text style={styles.title}>Matching You with Your Crew...</Text>
                                <Text style={styles.subtitle}>Our algorithm is curating the perfect group for your upcoming adventure. Hang tight—your plans are coming together!</Text>
                            </View>
                        </View>
                    </View>
                </WrapperContainer>
            ) : (
                <WrapperContainer>
                    <View style={commonStyles.fullInnerContainer} >
                        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }} >
                            <Image source={imagePath.sucessfully} style={{ width: windowWidth / 1.1, height: windowHeight / 2.5 }} />
                            <View style={{ marginTop: 40, width: windowWidth / 1.9, alignSelf: 'center' }}  >
                                <Text style={styles.title}>Booking Successful!</Text>
                            </View>
                            <View style={{ width: windowWidth / 1.5, alignSelf: 'center' }}  >
                                <Text style={styles.subtitle}>Your reservation is confirmed! Tap the button below to view your ticket details.</Text>
                            </View>
                        </View>
                        <CommonButton title='View Booking' />
                    </View>
                </WrapperContainer>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0D0D0D',
        padding: 20,
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        color: 'gray',
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 10,
    },
    progressBarBackground: {
        width: 200,
        height: 10,
        backgroundColor: 'gray',
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 20,
    },
    progressBar: {
        height: 10,
        backgroundColor: '#6A0DAD',
    },
    button: {
        backgroundColor: '#6A0DAD',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    }
});

export default MatchingCrew;


