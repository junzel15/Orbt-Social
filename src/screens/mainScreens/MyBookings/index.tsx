import React from 'react';
import { ImageBackground, Platform, StyleSheet, Text, TextInput, View, ViewBase } from 'react-native';
import WrapperContainer from '../../../components/wrapper/WrapperContainer';
import commonStyles from '../../../constants/commonStyles';
import CustomImage from '../../../components/atoms/image/CustomImage';
import { TouchableOpacity } from 'react-native';
import { iconPath } from '../../../constants/iconPath';
import { globalStyleDefinitions } from '../../../constants/globalStyleDefinitions';
import { imagePath } from '../../../constants/imagePath';
import { colors } from '../../../constants/colors';
import { getScaledFontSize } from '../../../constants/globalFunctions';
import { fonts } from '../../../constants/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign'

const MyBookings = () => {
  return (
    <WrapperContainer>
      <View style={commonStyles.flexFull}>
        <ImageBackground source={imagePath.linearBackground} style={commonStyles.fullInnerContainer} >
          <View style={styles.rowWrapper}>
            <AntDesign name='arrowleft' size={28} color={'white'} />
            <Text style={styles.headerTitle}>My Bookings</Text>
            <TouchableOpacity activeOpacity={0.9}>
              <CustomImage url={imagePath.filter} height={25} width={25} />
            </TouchableOpacity>
          </View>
          <View style={styles.searchView} >
            <AntDesign name='search1' size={28} color={'white'}  style={styles.searchIcon} />
            <TextInput placeholder='Search Events, Dates, Places ...' />
          </View>
        </ImageBackground>
      </View>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: globalStyleDefinitions.gap.gap,
    marginTop: Platform.select({
      ios: 2 * globalStyleDefinitions.screenPadding.padding,
      android: 2 * globalStyleDefinitions.screenPadding.padding,
    }),
  },
  headerTitle: {
    color: colors.white,
    fontSize: getScaledFontSize(22),
    fontFamily: fonts.fontSemiBold,
    flex: 1,
  },
  searchView: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 10,
    flexDirection: "row",
    alignItems:'center',
    paddingLeft:15,
    marginTop:globalStyleDefinitions.commonItemMargin.margin
  },
  searchIcon:{
    marginRight:globalStyleDefinitions.commonItemMargin.margin
  }
});

export default MyBookings;


