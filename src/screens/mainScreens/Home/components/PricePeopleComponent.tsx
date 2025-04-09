import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { imagePath } from '../../../../constants/imagePath';
import { getScaledFontSize } from '../../../../constants/globalFunctions';
import { colors } from '../../../../constants/colors';
import { globalStyleDefinitions } from '../../../../constants/globalStyleDefinitions';

const PricePeopleComponent = ({
  showPrice
}:any) => {
  return (
    <View style={styles.container}>
      {!showPrice &&
      <View style={styles.section}>
        <View style={styles.labelRow}>
          <Text style={styles.priceText}>$</Text>

          <Text style={styles.labelText}>Price Range:</Text>
        </View>
        <View style={styles.priceButtons}>
          <TouchableOpacity style={styles.priceOption}>
            <Text style={styles.priceText}>$</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.priceOption, styles.priceSelected]}>
            <Text style={[styles.priceText, styles.priceTextSelected]}>$$</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.priceOption}>
            <Text style={styles.priceText}>$$$</Text>
          </TouchableOpacity>
        </View>
      </View>
      }
      <View style={styles.section}>
        <View style={styles.labelRow}>
          <Icon name="person-outline" size={18} color="white" />
          <Text style={styles.labelText}>People:</Text>
        </View>

        <View style={styles.peopleRow}>
          {[
           imagePath.coffeeImage,
           imagePath.coffeeImage,
            imagePath.coffeeImage,
            imagePath.coffeeImage,
            imagePath.coffeeImage,
          ].map((src, index) => (
            <Image
              key={index}
              source={src}
              style={[styles.avatar, { marginLeft: index === 0 ? 0 : -12 }]}
            />
          ))}
        </View>

        <Text style={styles.sayHi}>
          <Text style={styles.underline}>Say Hi!</Text> 👋
        </Text>
      </View>
    </View>
  );
};

export default PricePeopleComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  section: {
    width: '48%',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  labelText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '500',
  },
  priceButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 2*globalStyleDefinitions.br_10.borderRadius,
    borderWidth: 1,
    borderColor: colors.darkPurple,
  },
  priceSelected: {
    backgroundColor: colors.darkPurple,
  },
  priceText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize:getScaledFontSize(14)
  },
  priceTextSelected: {
    color: '#fff',
  },
  peopleRow: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 4,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
  },
  sayHi: {
    color: '#fff',
    fontSize: 14,
  },
  underline: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
