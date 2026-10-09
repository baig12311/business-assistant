import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from '../skeleton/SkeletonBox'; // Path apne project structure ke hisab se set kar lein
import Colors from '../../constants/colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DashboardSkeleton = () => {
    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    {/* Profile Logo Skeleton */}
                    <SkeletonBox
                        width={wp(13)}
                        height={wp(13)}
                        borderRadius={wp(6.5)}
                    />
                    {/* Greeting & Shop Name */}
                    <View style={styles.headerTextGroup}>
                        <SkeletonBox
                            width={wp(48)}
                            height={hp(1.8)}
                            borderRadius={wp(1)}
                            style={{ marginBottom: hp(0.8) }}
                        />
                        <SkeletonBox
                            width={wp(38)}
                            height={hp(1.5)}
                            borderRadius={wp(1)}
                        />
                    </View>
                </View>

                {/* Bell / Notification Icon Skeleton */}
                <SkeletonBox
                    width={wp(10)}
                    height={wp(10)}
                    borderRadius={wp(5)}
                />
            </View>

            {/* Date Filter Dropdown Placeholder */}
            <View style={styles.filterContainer}>
                <SkeletonBox
                    width={wp(32)}
                    height={hp(4.2)}
                    borderRadius={wp(2)}
                />
            </View>

            {/* Stat Cards Grid (2x2) */}
            <View style={styles.statsGrid}>
                {/* Products Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <SkeletonBox width={wp(10)} height={wp(10)} borderRadius={wp(2.5)} />
                        <SkeletonBox width={wp(18)} height={hp(1.8)} borderRadius={wp(1)} />
                    </View>
                    <SkeletonBox width={wp(10)} height={hp(3)} borderRadius={wp(1)} style={styles.cardValue} />
                </View>

                {/* Customers Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <SkeletonBox width={wp(10)} height={wp(10)} borderRadius={wp(2.5)} />
                        <SkeletonBox width={wp(20)} height={hp(1.8)} borderRadius={wp(1)} />
                    </View>
                    <SkeletonBox width={wp(10)} height={hp(3)} borderRadius={wp(1)} style={styles.cardValue} />
                </View>

                {/* Orders Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <SkeletonBox width={wp(10)} height={wp(10)} borderRadius={wp(2.5)} />
                        <SkeletonBox width={wp(16)} height={hp(1.8)} borderRadius={wp(1)} />
                    </View>
                    <SkeletonBox width={wp(10)} height={hp(3)} borderRadius={wp(1)} style={styles.cardValue} />
                </View>

                {/* Today's Sales Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <SkeletonBox width={wp(10)} height={wp(10)} borderRadius={wp(2.5)} />
                        <SkeletonBox width={wp(22)} height={hp(1.8)} borderRadius={wp(1)} />
                    </View>
                    <SkeletonBox width={wp(22)} height={hp(3)} borderRadius={wp(1)} style={styles.cardValue} />
                </View>
            </View>

            {/* Quick Actions Title */}
            <View style={styles.sectionHeader}>
                <SkeletonBox width={wp(32)} height={hp(2.2)} borderRadius={wp(1)} />
            </View>

            {/* Quick Actions Horizontal Row */}
            <View style={styles.quickActionsRow}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <View key={index} style={styles.quickActionCard}>
                        <SkeletonBox
                            width={wp(11)}
                            height={wp(11)}
                            borderRadius={wp(2.5)}
                            style={{ marginBottom: hp(1) }}
                        />
                        <SkeletonBox width={wp(14)} height={hp(1.2)} borderRadius={wp(0.8)} style={{ marginBottom: hp(0.5) }} />
                        <SkeletonBox width={wp(10)} height={hp(1.2)} borderRadius={wp(0.8)} />
                    </View>
                ))}
            </View>

            {/* Sales Overview Title */}
            <View style={styles.sectionHeader}>
                <SkeletonBox width={wp(42)} height={hp(2.2)} borderRadius={wp(1)} />
            </View>

            {/* Sales Overview Chart Card Placeholder */}
            <View style={styles.chartContainer}>
                <SkeletonBox
                    width={wp(92)}
                    height={hp(22)}
                    borderRadius={wp(3)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: Colors.surface || '#FFFFFF',
        paddingTop: hp(2),
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: hp(1.5),
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTextGroup: {
        marginLeft: wp(3),
    },
    filterContainer: {
        alignItems: 'flex-end',
        marginBottom: hp(1.5),
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: hp(1.5),
    },
    card: {
        width: wp(44),
        backgroundColor: Colors.surface || '#FFFFFF',
        borderRadius: wp(3),
        padding: wp(3.5),
        marginBottom: hp(1.5),
        borderWidth: 1,
        borderColor: Colors.border || '#E5E7EB',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: hp(1.2),
    },
    cardValue: {
        alignSelf: 'flex-end',
    },
    sectionHeader: {
        marginBottom: hp(1.2),
    },
    quickActionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(2),
    },
    quickActionCard: {
        width: wp(21),
        height: hp(10.5),
        backgroundColor: Colors.surface || '#FFFFFF',
        borderRadius: wp(3),
        alignItems: 'center',
        justifyContent: 'center',
        padding: wp(2),
        borderWidth: 1,
        borderColor: Colors.border || '#E5E7EB',
    },
    chartContainer: {
        alignItems: 'center',
        marginTop: hp(0.5),
    },
});

export default DashboardSkeleton;