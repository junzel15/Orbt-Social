import React from 'react';
import { View, Text, Animated, Image, ImageBackground, StyleSheet } from 'react-native';
import { imagePath } from '../../../../constants/imagePath';
import commonStyles from '../../../../constants/commonStyles';
import { windowHeight, windowWidth } from '../../../../constants/globalConstants';
import { colors } from '../../../../constants/colors';
import { globalStyleDefinitions } from '../../../../constants/globalStyleDefinitions';
import LinearGradient from 'react-native-linear-gradient';

interface SearchScreenProps {
    progress: Animated.Value;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ progress }) => {

    const widthInterpolate = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%']
    });

    return (
        <LinearGradient colors={['#4C0BCE', '#180028', '#000000']}
            locations={[0.0, 0.5, 0.8]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={imagePath.searchIcon} style={styles.image} />
                    <View style={styles.progressBarBackground}>
                        <Animated.View style={[styles.progressBar, { width: widthInterpolate }]} />
                    </View>
                </View>
                <Text style={styles.title}>Matching You with {"\n"}  Your  Crew...</Text>
                <Text style={styles.subtitle}>Our algorithm is curating the perfect  {"\n"}  group for your upcoming adventure. Hang  {"\n"} tight—your plans are coming together!</Text>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    imageContainer: {
        flex: 0.7,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: windowWidth / 1.3,
        height: windowHeight / 6,
    },
    progressBarBackground: {
        width: 200,
        height: 10,
        backgroundColor: 'gray',
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 2 * globalStyleDefinitions.br_10.borderRadius
    },
    progressBar: {
        height: 10,
        backgroundColor: colors.white,
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

export default SearchScreen;