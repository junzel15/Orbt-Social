import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { launchImageLibrary } from 'react-native-image-picker';
import { fonts } from '../../../../constants/fonts';
import { colors } from '../../../../constants/colors';
import { globalStyleDefinitions } from '../../../../constants/globalStyleDefinitions';
import { iconPath } from '../../../../constants/iconPath';

interface ProfilePicturePickerProps {
    profilePic: string | null;
    setProfilePic: (uri: string | null) => void;
}

const ProfilePicturePicker: React.FC<ProfilePicturePickerProps> = ({ profilePic, setProfilePic }) => {
    const bottomSheetRef = useRef<RBSheet>(null);

    const openBottomSheet = () => {
        bottomSheetRef.current?.open();
    };

    const handleImagePick = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };
        launchImageLibrary(options, response => {
            if (response.didCancel) return;
            if (response.assets && response.assets.length > 0) {
                setProfilePic(response.assets[0].uri);
                bottomSheetRef.current?.close();
            }
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={openBottomSheet} style={styles.profileContainer}>
                {profilePic ? (
                    <Image source={{ uri: profilePic }} style={styles.profileImage} />
                ) : (
                    <View style={styles.profileCircle}>
                        <Text style={styles.profileInitial}>C</Text>
                    </View>
                )}
                <TouchableOpacity onPress={openBottomSheet} style={styles.editIconContainer}>
                    <Image source={iconPath.editProfileIcon} style={styles.editIcon} />
                </TouchableOpacity>
            </TouchableOpacity>
            <RBSheet
                ref={bottomSheetRef}
                height={180}
                openDuration={250}
                closeOnDragDown={true}
                customStyles={{
                    container: styles.bottomSheetContainer,
                    draggableIcon: styles.draggableIcon
                }}
            >
                <TouchableOpacity onPress={handleImagePick} style={styles.sheetButton}>
                    <Text style={styles.actionText}>Upload Profile Picture</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setProfilePic(null); bottomSheetRef.current?.close(); }} style={styles.sheetButton}>
                    <Text style={[styles.actionText, { color: colors.red }]}>Delete Profile Pic</Text>
                </TouchableOpacity>
            </RBSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    profileContainer: {
        position: 'relative',
    },
    profileCircle: {
        height: 120,
        width: 120,
        borderRadius: 60,
        backgroundColor: colors.borderColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInitial: {
        fontSize: 80,
        color: colors.white,
        fontWeight: 'bold',
    },
    profileImage: {
        height: 120,
        width: 120,
        borderRadius: 60,
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: colors.primary,
        borderRadius: 20,
        padding: 6,
    },
    editIcon: {
        width: 20,
        height: 20,
    },
    bottomSheetContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: globalStyleDefinitions.screenPadding.padding,
        alignItems: 'center',
    },
    draggableIcon: {
        backgroundColor: '#ccc',
    },
    sheetButton: {
        width: '100%',
        padding: 10,
        alignItems: 'center',
    },
    actionText: {
        fontSize: 18,
        fontFamily: fonts.fontSemiBold,
    },
});

export default ProfilePicturePicker;
