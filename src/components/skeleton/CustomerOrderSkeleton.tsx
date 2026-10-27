import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from '../skeleton/SkeletonBox'; // Path apne project structure ke hisab se adjust kar lein
import Colors from '../../constants/colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const OrderStatusSkeleton = () => {
    return (
        <View style={styles.container}>
            {Array.from({ length: 4 }).map((_, index) => (
                <View key={index} style={styles.card}>
                    {/* Top Row: Order # + Status Badges */}
                    <View style={styles.topRow}>
                        <SkeletonBox
                            width={wp(32)}
                            height={hp(2.2)}
                            borderRadius={wp(1)}
                        />
                        <View style={styles.badgesContainer}>
                            <SkeletonBox
                                width={wp(16)}
                                height={hp(2.4)}
                                borderRadius={wp(3)}
                                style={{ marginRight: wp(1.5) }}
                            />
                            <SkeletonBox
                                width={wp(14)}
                                height={hp(2.4)}
                                borderRadius={wp(3)}
                            />
                        </View>
                    </View>

                    {/* Date / Time */}
                    <SkeletonBox
                        width={wp(35)}
                        height={hp(1.6)}
                        borderRadius={wp(1)}
                        style={{ marginTop: hp(0.8), marginBottom: hp(1.2) }}
                    />

                    {/* Bottom Row: Total, Paid, Due Amounts */}
                    <View style={styles.bottomRow}>
                        <SkeletonBox width={wp(18)} height={hp(1.6)} borderRadius={wp(1)} />
                        <View style={styles.separator} />
                        <SkeletonBox width={wp(18)} height={hp(1.6)} borderRadius={wp(1)} />
                        <View style={styles.separator} />
                        <SkeletonBox width={wp(18)} height={hp(1.6)} borderRadius={wp(1)} />
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    card: {
        backgroundColor: Colors.surface || '#FFFFFF',
        borderRadius: wp(3),
        padding: wp(3.5),
        marginBottom: hp(1.5),
        borderWidth: 1,
        borderColor: Colors.border || '#E5E7EB',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    badgesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent: 'space-between',
        marginTop: hp(0.5),
    },
    separator: {
        width: 1,
        height: hp(1.5),
        backgroundColor: Colors.border || '#E5E7EB',
        marginHorizontal: wp(2),
    },
});

export default OrderStatusSkeleton;