import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import CommonHeader from '../../../../components/header/CommonHeader'
import { getScaledFontSize } from '../../../../constants/globalFunctions'
import { fonts } from '../../../../constants/fonts'
import { colors } from '../../../../constants/colors'
import { globalStyleDefinitions } from '../../../../constants/globalStyleDefinitions'
import { windowHeight, windowWidth } from '../../../../constants/globalConstants'
import CommonButton from '../../../../components/atoms/button/CommonButton'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { navigationStrings } from '../../../../navigation/navigationStrings'

const CancelEvent = () => {

  const navigation = useNavigation<NavigationProp<any>>();

  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  const reasons = [
    'Change in Plans',
    'Health Issues',
    'Unexpected Work',
    'Personal Preferences',
    'Scheduling Conflicts',
    'Other',
  ];


  const OnPressCancel =()=>{
    navigation.navigate(navigationStrings.CancelBooking)
  }

  return (
     <LinearGradient colors={['#4C0BCE', '#180028', '#000000']}
                locations={[0.0, 0.5, 0.8]} // Blue ends early
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
      <View style={styles.container}>
        <CommonHeader showBackIcon={true} headerTitle=''/>
      <Text style={styles.HeadingText}>Cancel Booking</Text>
      <Text style={styles.subText}>Please select the reason for cancellation:</Text>
      <View style={styles.card}>
        {reasons.map((reason) => (
          <TouchableOpacity
            key={reason}
            style={styles.radioRow}
            onPress={() => setSelectedReason(reason)}
          >
            <View style={[styles.outerCircle, selectedReason === reason && styles.selectedCircle]}>
              {selectedReason === reason && <View style={styles.innerCircle} />}
            </View>
            <Text style={styles.reasonText}>{reason}</Text>
          </TouchableOpacity>
        ))}

        <TextInput
          style={styles.input}
          placeholder="Please specify"
          placeholderTextColor="#A9A9A9"
          multiline
          numberOfLines={4}
          value={otherReason}
          onChangeText={setOtherReason}
        />
      </View>
     
    </View>
    <View style={styles.buttonView}>
    <CommonButton
       title='Cancel Booking'
       onPress={OnPressCancel}
      />
    </View>
    
    </LinearGradient>
  )
}

export default CancelEvent

const styles= StyleSheet.create({
    gradient:{
        flex:1
    },
    container:{
        padding:globalStyleDefinitions.screenPadding.padding ,
        flex:1
    },
    HeadingText:{
        fontSize:getScaledFontSize(24),
        fontFamily:fonts.soraRegular,
        color:colors.white

    },
    subText:{
        fontSize:getScaledFontSize(16),
        fontFamily:fonts.fontRegular,
        color:colors.white
    },
    card: {
      backgroundColor: colors.white,
      borderRadius: globalStyleDefinitions.br_10.borderRadius,
      padding: globalStyleDefinitions.screenPadding.padding,
      marginTop:3*globalStyleDefinitions.mt_10.marginTop
    },
    radioRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: globalStyleDefinitions.mb_10.marginBottom,
    },
    outerCircle: {
      height: windowHeight*0.03,
      width: windowWidth*0.06,
      borderRadius: 2*globalStyleDefinitions.br_10.borderRadius,
      borderWidth: 2,
      borderColor: colors.lighgrey,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    selectedCircle: {
      borderColor: colors.primary,
    },
    innerCircle: {
      height: 12,
      width: 12,
      borderRadius: 6,
      backgroundColor: colors.primary,
    },
    reasonText: {
      fontSize: getScaledFontSize(16),
      color: colors.black,
    },
    input: {
      marginTop: globalStyleDefinitions.mt_10.marginTop,
      borderWidth: 1,
      borderColor: colors.lighgrey,
      borderRadius: globalStyleDefinitions.br_10.borderRadius,
      padding: globalStyleDefinitions.screenPadding.padding/2,
      minHeight: 200,
      textAlignVertical: 'top',
      fontSize: getScaledFontSize(16),
      color: colors.white,
    },
    
   buttonView:{
    flex:0.12, 
    padding:globalStyleDefinitions.screenPadding.padding
  }
   
})

