import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { imagePath } from '../../../../constants/imagePath'
import { windowHeight, windowWidth } from '../../../../constants/globalConstants'
import { colors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'
import { getScaledFontSize } from '../../../../constants/globalFunctions'
import CommonButton from '../../../../components/atoms/button/CommonButton'
import { navigationStrings } from '../../../../navigation/navigationStrings'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { globalStyleDefinitions } from '../../../../constants/globalStyleDefinitions'

const CancelBooking = () => {
    const navigation = useNavigation<NavigationProp<any>>();

    const onPressButton =()=>{
        navigation.popToTop()
    }
    return (
        <LinearGradient
            colors={['#4C0BCE', '#180028', '#000000']}
            locations={[0.0, 0.5, 0.8]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
        <View style={styles.container}>
            <Image
            source={imagePath.reviewImage}
            style={styles.imageStyle}
            
            />
            <View style={styles.innerContainer}> 
            <Text style={styles.thanksText}>Your Booking Has Been Cancelled</Text>
            <Text style={styles.subText}>We’re sorry to see you go, but we hope to see you again soon! If there’s anything we can do to improve your experience, let us know.</Text>
            </View>
            <CommonButton onPress={onPressButton} title='Back to Home'/>
            </View>
        </LinearGradient>
    )
}

export default CancelBooking;


const styles = StyleSheet.create({
 container:{ 
    flex:1,
    justifyContent: 'center',
    alignItems: 'center', 
    padding:globalStyleDefinitions.screenPadding.padding,
},
innerContainer:{ 
    alignItems:'center', 
    justifyContent:'center', 
    padding:globalStyleDefinitions.screenPadding.padding
},
imageStyle:{ 
    width: windowWidth * 0.8, 
    height: windowHeight * 0.4 
},
thanksText:{ 
    color: colors.white, 
    fontFamily: fonts.soraSemiBold, 
    fontSize: getScaledFontSize(28),
    textAlign:'center' 
},
subText:{ 
    color: colors.white, 
    fontFamily: fonts.fontRegular, 
    fontSize: getScaledFontSize(14), 
    textAlign:'center', 
    marginTop:3*globalStyleDefinitions.mt_10.marginTop
}

})