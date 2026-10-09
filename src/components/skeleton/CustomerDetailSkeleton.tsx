import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from '../skeleton/SkeletonBox'; // Path apne project structure ke hisab se adjust kar lein
import Colors from '../../constants/colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CustomerDetailSkeleton = () => {
    return (
        <View style={styles.container}>
            {/* Header Section (Back Arrow + Title + Options Menu Icon) */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <SkeletonBox
                        width={wp(6)}
                        height={wp(6)}
                        borderRadius={wp(3)}
                    />
                    <SkeletonBox
                        width={wp(40)}
                        height={hp(2.8)}
                        borderRadius={wp(1)}
                        style={{ marginLeft: wp(4) }}
                    />
                </View>
                {/* Right Three Dots Menu Icon Placeholder */}
                <SkeletonBox
                    width={wp(2)}
                    height={hp(2.2)}
                    borderRadius={wp(1)}
                />
            </View>

            {/* Customer Profile Banner Section */}
            <View style={styles.profileSection}>
                {/* Large Avatar */}
                <SkeletonBox
                    width={wp(16)}
                    height={wp(16)}
                    borderRadius={wp(8)}
                />
                {/* Name and Phone Number */}
                <View style={styles.profileInfo}>
                    <SkeletonBox
                        width={wp(35)}
                        height={hp(2.2)}
                        borderRadius={wp(1)}
                        style={{ marginBottom: hp(0.8) }}
                    />
                    <SkeletonBox
                        width={wp(42)}
                        height={hp(1.8)}
                        borderRadius={wp(1)}
                    />
                </View>
            </View>

            {/* Stats Section (2 Cards Row: Total Orders & Total Spent) */}
            <View style={styles.statsRow}>
                {/* Total Orders Card */}
                <View style={styles.statCard}>
                    <View style={styles.statHeader}>
                        <SkeletonBox width={wp(10)} height={wp(10)} borderRadius={wp(2.5)} />
                        <SkeletonBox width={wp(22)} height={hp(1.8)} borderRadius={wp(1)} />
                    </View>
                    <SkeletonBox width={wp(10)} height={hp(3)} borderRadius={wp(1)} style={styles.statValue} />
                </View>

                {/* Total Spent Card */}
                <View style={styles.statCard}>
                    <View style={styles.statHeader}>
                        <SkeletonBox width={wp(10)} height={wp(10)} borderRadius={wp(2.5)} />
                        <SkeletonBox width={wp(20)} height={hp(1.8)} borderRadius={wp(1)} />
                    </View>
                    <SkeletonBox width={wp(20)} height={hp(3)} borderRadius={wp(1)} style={styles.statValue} />
                </View>
            </View>

            {/* Customer Orders List Skeleton */}
            {Array.from({ length: 5 }).map((_, index) => (
                <View key={index} style={styles.orderCard}>
                    <View style={styles.orderRow}>
                        <SkeletonBox
                            width={wp(32)}
                            height={hp(2.2)}
                            borderRadius={wp(1)}
                        />
                        <SkeletonBox
                            width={wp(24)}
                            height={hp(2.2)}
                            borderRadius={wp(1)}
                        />
                    </View>

                    {/* Order Date */}
                    <SkeletonBox
                        width={wp(25)}
                        height={hp(1.6)}
                        borderRadius={wp(1)}
                        style={{ marginTop: hp(0.8) }}
                    />
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: hp(2),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: hp(2.5),
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(2.5),
    },
    profileInfo: {
        marginLeft: wp(4),
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(2.5),
    },
    statCard: {
        width: wp(44),
        backgroundColor: Colors.surface || '#FFFFFF',
        borderRadius: wp(3),
        padding: wp(3.5),
        borderWidth: 1,
        borderColor: Colors.border || '#E5E7EB',
    },
    statHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: hp(1.2),
    },
    statValue: {
        alignSelf: 'flex-end',
    },
    orderCard: {
        backgroundColor: Colors.surface || '#FFFFFF',
        borderRadius: wp(3),
        padding: wp(4),
        marginBottom: hp(1.5),
        borderWidth: 1,
        borderColor: Colors.border || '#E5E7EB',
    },
    orderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default CustomerDetailSkeleton;