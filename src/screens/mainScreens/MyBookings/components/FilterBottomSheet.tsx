// BookingFilterBottomSheet.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import RsBottomSheet from 'react-native-raw-bottom-sheet';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../../../constants/colors';
import { windowHeight, windowWidth } from '../../../../constants/globalConstants';
import { globalStyleDefinitions } from '../../../../constants/globalStyleDefinitions';
import commonStyles from '../../../../constants/commonStyles';
import { getScaledFontSize } from '../../../../constants/globalFunctions';
import { fonts } from '../../../../constants/fonts';

const CustomMarker = ({ currentValue }: any) => (
  <View style={styles.customMarkerContainer}>
    <View style={styles.marker} />
    <Text style={styles.markerLabel}>{currentValue} km</Text>
  </View>
);

const FilterBottomSheet = ({
  refRBSheet,
  sliderValue,
  setSliderValue,
  selectedEventType,
  toggleEventType,
  selectedPrice,
  setSelectedPrice,
  handleReset,
}: any) => {
  const onApplyPress=()=>{
    refRBSheet.current.close()
  }
  return (
    <RsBottomSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={windowHeight / 1.5}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        draggableIcon: {
          backgroundColor: "#000",
        },
        container: {
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          backgroundColor: colors.white
        }
      }}
    >
      <View style={commonStyles.fullInnerContainer} >
        <Text style={styles.headerBottomSheet} >Filter</Text>

        <Text style={styles.optHeader} >Location</Text>
        <TextInput placeholder='Location' style={styles.inputLocation} />

        <Text style={styles.optHeader} >Distance</Text>
       <MultiSlider
          values={sliderValue}
          sliderLength={350}
          min={0}
          max={100}
          step={1}
          onValuesChange={(values) => setSliderValue(values)}
          selectedStyle={{ backgroundColor: colors.primary }}
          unselectedStyle={{ backgroundColor: colors.lighGrey }}
          trackStyle={{ height: 4 }}
          markerStyle={{
            height: 16,
            width: 16,
            borderRadius: 8,
            backgroundColor: '#7A5AF8',
            marginTop: 3
          }} 
          customMarker={(e) => <CustomMarker currentValue={e.currentValue} />}
          enabledOne={true}
        />

        <Text style={styles.optHeader}>Event Type</Text>
        <View style={styles.optionsRow}>
          {['Dining', 'Bars', 'Experiences'].map((type) => {
            const isSelected = selectedEventType.includes(type);
            return (
              <TouchableOpacity
                key={type}
                style={styles.checkbox}
                onPress={() => toggleEventType(type)}
              >
                <View style={[
                  styles.iconBox,
                  isSelected ? styles.iconBoxSelected : styles.iconBoxUnselected,
                ]}>
                  {isSelected && <Icon name="check" size={14} color="#fff" />}
                </View>
                <Text style={styles.checkboxLabel}>{type}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.optHeader}>Price</Text>
        <View style={styles.optionsRow}>
          {['Free', 'Paid'].map((price) => (
            <TouchableOpacity
              key={price}
              style={[
                styles.priceOption,
                selectedPrice === price && styles.priceOptionSelected,
              ]}
              onPress={() => setSelectedPrice(price)}
            >
              <Text style={[
                styles.priceText,
                selectedPrice === price && styles.priceTextSelected,
              ]}>
                {price}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={onApplyPress}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RsBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: globalStyleDefinitions.screenPadding.padding,
  },
  rowWrapper: {
    flexDirection: 'row',
    gap: globalStyleDefinitions.gap.gap,
    marginTop: Platform.select({
      ios: 3 * globalStyleDefinitions.screenPadding.padding,
      android: 2 * globalStyleDefinitions.screenPadding.padding,
    }),
    justifyContent: 'space-between'
  },
  headerTitle: {
    color: colors.white,
    fontSize: getScaledFontSize(22),
    fontFamily: fonts.fontSemiBold,
    marginLeft: globalStyleDefinitions.mb_10.marginBottom
  },
  searchView: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    marginTop: 25,
  },
  searchIcon: {
    marginRight: globalStyleDefinitions.mr_10.marginRight,
  },
  optView: {
    flexDirection: 'row',
    marginTop: 4 * globalStyleDefinitions.mt_10.marginTop,
    justifyContent: 'space-around',
  },
  optText: {
    color: colors.white,
    fontSize: getScaledFontSize(14),
    fontFamily: fonts.fontMedium,
  },
  tabItem: {
    width: windowWidth / 3,
    height: windowHeight / 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.white,
  },
  activeTabText: {
    color: colors.primary,
    fontSize: getScaledFontSize(14),
    fontFamily: fonts.fontMedium,
  },
  headerBottomSheet: {
    alignSelf: 'center',
    fontSize: getScaledFontSize(18),
    fontFamily: fonts.fontSemiBold
  },
  optHeader: {
    fontSize: getScaledFontSize(14),
    fontFamily: fonts.fontBold,
    marginTop: 1.5 * globalStyleDefinitions.mt_15.marginTop
  },
  inputLocation: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.lightgray,
    height: 50,
    borderRadius: 15,
    marginTop:5,
    padding: globalStyleDefinitions.screenPadding.padding / 2
  },
  slider: {
    width: '100%',
    height: 40,
  },
  floatingLabel: {
    position: 'absolute',
    bottom: 290,
    width: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 2,
    elevation: 3,
    zIndex: 10,
  },
  floatingText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  customMarkerContainer: {
    alignItems: 'center',
  },
  markerLabel: {
    fontSize: 12,
    color: colors.primary,
  },
  marker: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    marginTop: 2 * globalStyleDefinitions.mt_10.marginTop
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
    color: '#000',
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop:0.5* globalStyleDefinitions.mt_15.marginTop,
  },
  priceOption: {
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lighGrey,
    alignItems: 'center',
    paddingHorizontal:20
  },
  priceOptionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.lighGrey
  },
  priceText: {
    fontSize: getScaledFontSize(14),
    fontFamily:fonts.fontSemiBold,
    color:colors.black
  },
  priceTextSelected: {
    color: colors.white,
    fontSize: getScaledFontSize(14),
    fontFamily:fonts.fontSemiBold,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:2* globalStyleDefinitions.mt_15.marginTop,
  },
  resetButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  resetText: {
    fontSize: getScaledFontSize(16),
    fontFamily:fonts.fontSemiBold
  },
  applyButton: {
    flex: 1,
    backgroundColor:colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginLeft: 10,
  },
  applyText: {
    fontSize: getScaledFontSize(16),
    fontFamily:fonts.fontSemiBold,
    color:colors.white
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    height: 30,
    width: 30,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: globalStyleDefinitions.mt_8.marginTop
  },
  iconBoxSelected: {
    backgroundColor: colors.primary,
  },
  iconBoxUnselected: {
    borderWidth: 1,
    borderColor: colors.lighGrey,
    backgroundColor: 'transparent',
  },
  checkboxLabel: {
    fontSize: getScaledFontSize(14),
    fontFamily:fonts.fontMedium
  }
  
});
export default FilterBottomSheet;
