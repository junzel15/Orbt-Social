import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { imagePath } from '../../../../constants/imagePath';
import { colors } from '../../../../constants/colors';
import { fonts } from '../../../../constants/fonts';

interface ContactOptionButtonProps {
    type: 'sms' | 'email';
    selected: boolean;
    onPress: () => void;
    label: string;
    value: string;
}

const SmsButton: React.FC<ContactOptionButtonProps> = ({
    type,
    selected,
    onPress,
    label,
    value,
}) => {
    return (
        <TouchableOpacity
            style={[styles.option, selected && styles.selectedOption]}
            onPress={onPress}
        >
            <View style={styles.iconWrapper}>
                <Image
                    source={type === 'sms' ? imagePath.smsIcon : imagePath.smsIcon}
                    style={styles.icon}
                />
            </View>
            <View style={styles.textWrapper}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.text}>{value}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    option: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.lightgray,
        marginBottom: 10,
    },
    selectedOption: {
        borderColor: colors.purple,
        backgroundColor: colors.lightpink,
    },
    iconWrapper: {
        width: 50,
        height: 50,
        backgroundColor: '#EDE8FF',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 26,
        height: 26,
    },
    textWrapper: {
        marginLeft: 10,
    },
    label: {
        fontSize: 14,
        color: "gray",
        fontFamily: fonts.fontRegular,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
        fontFamily: fonts.soraSemiBold,
    },
});

export default SmsButton;
