import React, { useCallback, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    SafeAreaView,
    ListRenderItem,
    Image,
    TouchableOpacity,
    Dimensions,
    Platform
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../../constants/fonts';
import { imagePath } from '../../../constants/imagePath';
import { colors } from '../../../constants/colors';
import { getScaledFontSize } from '../../../constants/globalFunctions';
import { globalStyleDefinitions } from '../../../constants/globalStyleDefinitions';


type NotificationItem = {
    id: string;
    title: string;
    message: string;
    time: string;
    category: string;
    place: string;
    section: string;
    unread: boolean;
};

const windowWidth = Dimensions.get('window').width;

const notifications: NotificationItem[] = [
    {
        id: '1',
        title: 'Countdown to Fun!',
        message:
            'The clock is ticking! Only 1 hour left until your Cooking class. Don’t forget to get ready!',
        time: 'Just now',
        category: 'Dining',
        place: 'The Bistro',
        section: 'Today',
        unread: true,
    },
    {
        id: '2',
        title: 'Your Group Chat is Live!',
        message:
            'The group chat for your upcoming event (Ref: ORT-BA0001) is now available! Get to know your crew, share excitement, and prep for tomorrow’s adventure.',
        time: 'Just now',
        category: 'Dining',
        place: 'Cafe Commune',
        section: 'Today',
        unread: true,
    },
    {
        id: '3',
        title: 'Christian cancelled!',
        message:
            'Uh-oh! Christian won’t be joining tonight’s dinner. But don’t worry, we’ve got a seat for you. See you soon!',
        time: '3 hours ago',
        category: 'Dining',
        place: 'Brew & Co.',
        section: 'Today',
        unread: true,
    },
    {
        id: '4',
        title: 'Thea will be late!',
        message:
            'Thea is running a bit behind! She’ll be there soon to join the fun at your brunch gathering!',
        time: '2 hours ago',
        category: 'Dining',
        place: 'Cafe Sirusdan',
        section: 'Today',
        unread: true,
    },
    {
        id: '5',
        title: 'Your Tickets Are Ready!',
        message:
            'Your e-ticket and the restaurant details are now ready! Check out your table number at "The Bistro" and get ready to enjoy!',
        time: '1 day ago',
        category: 'Bars',
        place: 'The Bistro',
        section: 'Earlier',
        unread: false,
    },
];

// const notifications: NotificationItem[] = [];

const sortedNotifications = notifications.sort((a, b) => {
    if (a.section === b.section) return 0;
    return a.section === 'Today' ? -1 : 1;
});

const Notification = () => {

    const navigation = useNavigation();

    const [notifications, setNotifications] = useState(sortedNotifications)

    let lastSection: string | null = null;


    const renderItem: ListRenderItem<NotificationItem> = useCallback(({ item }) => {
        const showSection = lastSection !== item.section;
        lastSection = item.section;
        return (
            <>
                {showSection && (
                    <Text style={styles.sectionHeader}>{item.section}</Text>
                )}
                <View style={styles.notificationItem}>
                    <View style={styles.iconBox}>
                        <Feather name="bell" color="#000" size={20} />
                    </View>
                    <View style={styles.content}>
                        <View style={styles.headerRow}>
                            <Text style={styles.title}>{item.title}</Text>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.time}>{item.time}</Text>
                            </View>
                        </View>
                        <Text style={styles.message}>{item.message}</Text>
                        <View style={styles.footerRow}>
                            <Text style={styles.category}>{item.category}</Text>
                            <Text style={styles.dot}>•</Text>
                            <Text style={styles.place}>{item.place}</Text>
                        </View>
                    </View>
                    {item.unread && <View style={styles.unreadDot} />}
                </View>
            </>
        );
    }, []);

    const ListEmptyComponent = useCallback(() => (
        <View style={styles.emptyContainer}>
            <Image
                source={imagePath.noNotificationImage}
                style={styles.emptyImage}
                resizeMode="contain"
            />
            <Text style={styles.emptyTitle}>No Notifications Yet</Text>
            <Text style={styles.emptySubtitle}>
                It’s quiet here. Check back later for updates!
            </Text>
        </View>
    ), []);

    const onBackPress = () => {
        navigation.goBack()
    }

    const onClearAllPress = () => {
        setNotifications([])
    }

    const listKeyExtractor = useCallback((item: any, index: any) => { return index.toString() }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={onBackPress} >
                    <Feather name="arrow-left" color="#000" size={24} />
                </TouchableOpacity>
                <View style={{ flex: 1, marginLeft: globalStyleDefinitions.cardInnerPadding.padding }}>
                    <Text style={styles.sectionHeaderTitle}>Notification</Text>
                </View>
                <TouchableOpacity onPress={onClearAllPress} >
                    <Text style={styles.sectionHeader2}>Clear All</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={notifications}
                keyExtractor={listKeyExtractor}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={ListEmptyComponent}
            />
        </SafeAreaView>
    );
};

export default Notification;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: globalStyleDefinitions.cardInnerPadding.padding,
        paddingTop:Platform.select({ios:3*globalStyleDefinitions.screenPadding.padding,android:2.5*globalStyleDefinitions.screenPadding.padding})
    },
    sectionHeaderTitle: {
        paddingHorizontal: globalStyleDefinitions.cardInnerPadding.padding,
        fontSize: getScaledFontSize(20),
        fontWeight: '600',
        color: colors.black,
    },
    sectionHeader2: {
        paddingHorizontal: globalStyleDefinitions.cardInnerPadding.padding,
        fontSize: getScaledFontSize(14),
        color: colors.primary,
        fontFamily: fonts.fontMedium
    },
    sectionHeader: {
        paddingHorizontal: globalStyleDefinitions.cardInnerPadding.padding,
        paddingTop: globalStyleDefinitions.screenPadding.padding,
        paddingBottom: globalStyleDefinitions.screenPadding.padding / 2,
        fontSize: getScaledFontSize(14),
        fontWeight: '600',
        color: colors.black,
    },
    notificationItem: {
        flexDirection: 'row',
        paddingHorizontal: globalStyleDefinitions.cardInnerPadding.padding,
        paddingVertical: globalStyleDefinitions.screenPadding.padding / 2,
        borderBottomWidth: 1,
        borderColor: '#eee',
        alignItems: 'flex-start',
        position: 'relative',
    },
    iconBox: {
        padding: globalStyleDefinitions.screenPadding.padding / 2,
        backgroundColor: colors.lavender,
        borderRadius: 3 * globalStyleDefinitions.br_10.borderRadius,
        marginRight: globalStyleDefinitions.cardInnerPadding.padding,
    },
    content: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: fonts.fontBold,
        fontSize: getScaledFontSize(15),
        marginRight: globalStyleDefinitions.mt_8.marginTop,
        marginBottom: globalStyleDefinitions.mt_8.marginTop,
        color: colors.black,
    },
    time: {
        fontSize: getScaledFontSize(12),
        color: colors.mediumgray,
    },
    message: {
        fontFamily: fonts.fontRegular,
        fontSize: getScaledFontSize(12),
        color: colors.black,
        marginTop: globalStyleDefinitions.mt_8.marginTop / 2,
    },
    footerRow: {
        flexDirection: 'row',
        marginTop: globalStyleDefinitions.mt_8.marginTop,
        alignItems: 'center',
    },
    category: {
        fontFamily: fonts.fontMedium,
        color: colors.primary,
        fontSize: getScaledFontSize(12),
    },
    dot: {
        marginHorizontal: globalStyleDefinitions.mt_8.marginTop / 2,
        color: colors.primary,
    },
    place: {
        fontFamily: fonts.fontMedium,
        color: colors.primary,
        fontSize: getScaledFontSize(13),
    },
    unreadDot: {
        width: 10,
        height: 10,
        backgroundColor: colors.red,
        borderRadius: globalStyleDefinitions.br_10.borderRadius,
        position: 'absolute',
        top: 12,
        right: 12,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: globalStyleDefinitions.screenPadding.paddingTop,
    },
    emptyImage: {
        width: windowWidth * 0.7,
        height: 300,
        marginBottom: globalStyleDefinitions.screenPadding.padding,
    },
    emptyTitle: {
        fontSize: getScaledFontSize(20),
        fontFamily: fonts.fontBold,
        color: colors.black,
        marginBottom: globalStyleDefinitions.mt_15.marginTop,
    },
    emptySubtitle: {
        fontSize: getScaledFontSize(14),
        color: colors.primaryText,
        fontFamily: fonts.fontRegular,
        textAlign: 'center',
    },
});
