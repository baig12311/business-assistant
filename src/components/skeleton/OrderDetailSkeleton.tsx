import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from '../skeleton/SkeletonBox'; // Path apne project structure ke hisab se adjust kar lein
import Colors from '../../constants/colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const OrderDetailSkeleton = () => {
    return (
        <View style={styles.container}>
            

            {/* Customer Details & Order Status Card */}
            <View style={styles.card}>
                {/* Customer Info (Avatar + Name/Phone) */}
                <View style={styles.customerRow}>
                    <SkeletonBox
                        width={wp(12)}
                        height={wp(12)}
                        borderRadius={wp(6)}
                    />
                    <View style={{ marginLeft: wp(3) }}>
                        <SkeletonBox
                            width={wp(30)}
                            height={hp(2)}
                            borderRadius={wp(1)}
                            style={{ marginBottom: hp(0.8) }}
                        />
                        <SkeletonBox
                            width={wp(38)}
                            height={hp(1.6)}
                            borderRadius={wp(1)}
                        />
                    </View>
                </View>

                {/* Order Date & Payment Status */}
                <View style={[styles.rowBetween, { marginTop: hp(2) }]}>
                    <View>
                        <SkeletonBox
                            width={wp(25)}
                            height={hp(1.6)}
                            borderRadius={wp(1)}
                            style={{ marginBottom: hp(0.8) }}
                        />
                        <SkeletonBox
                            width={wp(35)}
                            height={hp(1.8)}
                            borderRadius={wp(1)}
                        />
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <SkeletonBox
                            width={wp(30)}
                            height={hp(1.6)}
                            borderRadius={wp(1)}
                            style={{ marginBottom: hp(0.8) }}
                        />
                        <SkeletonBox
                            width={wp(15)}
                            height={hp(1.8)}
                            borderRadius={wp(1)}
                        />
                    </View>
                </View>
            </View>

            {/* Order Items Section Title */}
            <SkeletonBox
                width={wp(32)}
                height={hp(2.2)}
                borderRadius={wp(1)}
                style={{ marginBottom: hp(1.2) }}
            />

            {/* Order Items Table Card */}
            <View style={styles.card}>
                {/* Table Header Row */}
                <View style={styles.tableHeaderRow}>
                    <SkeletonBox width={wp(30)} height={hp(1.8)} borderRadius={wp(1)} />
                    <SkeletonBox width={wp(10)} height={hp(1.8)} borderRadius={wp(1)} />
                    <SkeletonBox width={wp(15)} height={hp(1.8)} borderRadius={wp(1)} />
                </View>

                {/* Item Rows */}
                {Array.from({ length: 4 }).map((_, index) => (
                    <View key={index} style={styles.tableItemRow}>
                        <SkeletonBox width={wp(28)} height={hp(1.8)} borderRadius={wp(1)} />
                        <SkeletonBox width={wp(6)} height={hp(1.8)} borderRadius={wp(1)} />
                        <SkeletonBox width={wp(12)} height={hp(1.8)} borderRadius={wp(1)} />
                    </View>
                ))}
            </View>

            {/* Price Summary Section Title */}
            <SkeletonBox
                width={wp(38)}
                height={hp(2.2)}
                borderRadius={wp(1)}
                style={{ marginBottom: hp(1.2) }}
            />

            {/* Price Summary Card */}
            <View style={styles.card}>
                {/* SubTotal */}
                <View style={styles.rowBetween}>
                    <SkeletonBox width={wp(20)} height={hp(1.8)} borderRadius={wp(1)} />
                    <SkeletonBox width={wp(16)} height={hp(1.8)} borderRadius={wp(1)} />
                </View>

                {/* Discount */}
                <View style={[styles.rowBetween, { marginTop: hp(1.2) }]}>
                    <SkeletonBox width={wp(22)} height={hp(1.8)} borderRadius={wp(1)} />
                    <SkeletonBox width={wp(6)} height={hp(1.8)} borderRadius={wp(1)} />
                </View>

                {/* Total */}
                <View style={[styles.rowBetween, { marginTop: hp(1.2) }]}>
                    <SkeletonBox width={wp(15)} height={hp(2.2)} borderRadius={wp(1)} />
                    <SkeletonBox width={wp(20)} height={hp(2.2)} borderRadius={wp(1)} />
                </View>

                {/* Amount Paid */}
                <View style={[styles.rowBetween, { marginTop: hp(1.2) }]}>
                    <SkeletonBox width={wp(28)} height={hp(1.8)} borderRadius={wp(1)} />
                    <SkeletonBox width={wp(16)} height={hp(1.8)} borderRadius={wp(1)} />
                </View>
            </View>

            {/* Bottom Action Button Placeholder */}
            <View style={styles.bottomButtonContainer}>
                <SkeletonBox
                    width={wp(92)}
                    height={hp(6)}
                    borderRadius={wp(3)}
                />
            </View>
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
        marginBottom: hp(2),
    },
    card: {
        backgroundColor: Colors.surface || '#FFFFFF',
        borderRadius: wp(3),
        padding: wp(3.5),
        marginBottom: hp(2),
        borderWidth: 1,
        borderColor: Colors.border || '#E5E7EB',
    },
    customerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tableHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: hp(1),
        borderBottomWidth: 1,
        borderBottomColor: Colors.border || '#E5E7EB',
    },
    tableItemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: hp(1.2),
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: hp(2),
        left: wp(4),
        right: wp(4),
        alignItems: 'center',
    },
});

export default OrderDetailSkeleton;