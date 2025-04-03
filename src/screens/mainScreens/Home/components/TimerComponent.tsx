import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyleDefinitions } from '../../../../constants/globalStyleDefinitions';
import { getScaledFontSize } from '../../../../constants/globalFunctions';

const TimerComponent = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>
                E-Ticket will be revealed 1 day before the event. Stay tuned!
            </Text>
            <View style={styles.timerRow}>
                <View style={styles.timerContainer}>
                    <View style={styles.timerBox}>
                        <Text style={styles.timerValue}>4</Text>
                    </View>
                    <Text style={styles.timerLabel}>DAYS</Text>
                </View>
                <Text style={styles.colon}>:</Text>
                <View style={styles.timerContainer}>
                    <View style={styles.timerBox}>
                        <Text style={styles.timerValue}>10</Text>
                    </View>
                    <Text style={styles.timerLabel}>HOURS</Text>
                </View>
                <Text style={styles.colon}>:</Text>
                <View style={styles.timerContainer}>
                    <View style={styles.timerBox}>
                        <Text style={styles.timerValue}>12</Text>

                    </View>
                    <Text style={styles.timerLabel}>MIN</Text>
                </View>
            </View>
        </View>
    );
};

export default TimerComponent;

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        alignItems: 'center',
    },
    timerContainer:{
        alignItems:'center'
    },
    message: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 14,
        marginBottom: 24,
        fontWeight: '500',
    },
    timerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: globalStyleDefinitions.gap.gap,
    },
    timerBox: {
        width: 60,
        height: 60,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerValue: {
        color: '#FFFFFF',
        fontSize:  getScaledFontSize(18),
        fontWeight: 'bold',
    },
    timerLabel: {
        color: '#FFFFFF',
        fontSize: getScaledFontSize(12),
        marginTop: globalStyleDefinitions.mt_10.marginTop,
    },
    colon: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
});
