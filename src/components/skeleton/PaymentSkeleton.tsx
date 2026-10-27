import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from '../skeleton/SkeletonBox'; // Path apne project structure ke hisab se adjust kar lein
import Colors from '../../constants/colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const PaymentSkeleton = () => {
    return (
        <View style={styles.container}>
            {Array.from({ length: 4 }).map((_, index) => (
                <View key={index} style={styles.card}>
                    {/* Top Row: Icon + Title/Date + Amount/Status */}
                    <View style={styles.topRow}>
                        <View style={styles.topLeft}>
                            <SkeletonBox
                                width={wp(11)}
                                height={wp(11)}
                                borderRadius={wp(5.5)}
                            />
                            <View style={{ marginLeft: wp(3) }}>
                                <SkeletonBox
                                    width={wp(35)}
                                    height={hp(2)}
                                    borderRadius={wp(1)}
                                    style={{ marginBottom: hp(0.6) }}
                                />
                                <SkeletonBox
                                    width={wp(28)}
                                    height={hp(1.5)}
                                    borderRadius={wp(1)}
                                />
                            </View>
                        </View>
                        <View style={styles.topRight}>
                            <SkeletonBox
                                width={wp(24)}
                                height={hp(2)}
                                borderRadius={wp(1)}
                                style={{ marginBottom: hp(0.6) }}
                            />
                            <SkeletonBox
                                width={wp(16)}
                                height={hp(1.4)}
                                borderRadius={wp(1)}
                                style={{ alignSelf: 'flex-end' }}
                            />
                        </View>
                    </View>

                    {/* Divider Line */}
                    <View style={styles.divider} />

                    {/* Bottom Rows: Allocated to & Allocated amount */}
                    <View style={styles.bottomRow}>
                        <SkeletonBox width={wp(22)} height={hp(1.6)} borderRadius={wp(1)} />
                        <SkeletonBox width={wp(20)} height={hp(1.6)} borderRadius={wp(1)} />
                    </View>
                    <View style={[styles.bottomRow, { marginTop: hp(0.8) }]}>
                        <SkeletonBox width={wp(28)} height={hp(1.6)} borderRadius={wp(1)} />
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
    topLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    topRight: {
        alignItems: 'flex-end',
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border || '#E5E7EB',
        marginVertical: hp(1.2),
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default PaymentSkeleton;