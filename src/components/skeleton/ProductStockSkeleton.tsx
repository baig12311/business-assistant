import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from '../skeleton/SkeletonBox'; // Path apne project structure ke hisab se adjust kar lein
import Colors from '../../constants/colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ProductStockSkeleton = () => {
    return (
        <View style={styles.container}>
           

            {/* Product Header Card (Image + Prices) */}
            <View style={styles.card}>
                <View style={styles.productRow}>
                    <SkeletonBox
                        width={wp(18)}
                        height={wp(18)}
                        borderRadius={wp(3)}
                    />
                    <View style={styles.productInfo}>
                        <SkeletonBox
                            width={wp(30)}
                            height={hp(2.2)}
                            borderRadius={wp(1)}
                            style={{ marginBottom: hp(1) }}
                        />
                        <View style={styles.priceRow}>
                            <SkeletonBox width={wp(20)} height={hp(1.6)} borderRadius={wp(1)} />
                            <SkeletonBox width={wp(18)} height={hp(1.6)} borderRadius={wp(1)} />
                        </View>
                        <View style={[styles.priceRow, { marginTop: hp(0.5) }]}>
                            <SkeletonBox width={wp(22)} height={hp(1.6)} borderRadius={wp(1)} />
                            <SkeletonBox width={wp(18)} height={hp(1.6)} borderRadius={wp(1)} />
                        </View>
                    </View>
                </View>
            </View>

            {/* Current Stock Banner Card */}
            <View style={styles.card}>
                <View style={styles.stockRow}>
                    <View style={styles.stockLeft}>
                        <SkeletonBox
                            width={wp(10)}
                            height={wp(10)}
                            borderRadius={wp(2.5)}
                        />
                        <View style={{ marginLeft: wp(3) }}>
                            <SkeletonBox width={wp(28)} height={hp(1.8)} borderRadius={wp(1)} />
                            <SkeletonBox width={wp(18)} height={hp(2.5)} borderRadius={wp(1)} style={{ marginTop: hp(0.5) }} />
                            <SkeletonBox
                    width={wp(35)}
                    height={hp(1.4)}
                    borderRadius={wp(1)}
                    style={{ marginTop: hp(1) }}
                />
                        </View>
                    </View>
                    <SkeletonBox
                        width={wp(22)}
                        height={hp(3)}
                        borderRadius={wp(4)}
                    />
                </View>
                
            </View>

            {/* Restock & Adjust Action Cards (2 Columns) */}
            <View style={styles.actionRow}>
                <View style={styles.actionCard}>
                    <SkeletonBox width={wp(8)} height={wp(8)} borderRadius={wp(2)} style={{ marginBottom: hp(1) }} />
                    <SkeletonBox width={wp(20)} height={hp(2)} borderRadius={wp(1)} style={{ marginBottom: hp(0.5) }} />
                    <SkeletonBox width={wp(28)} height={hp(1.2)} borderRadius={wp(1)} />
                </View>
                <View style={styles.actionCard}>
                    <SkeletonBox width={wp(8)} height={wp(8)} borderRadius={wp(2)} style={{ marginBottom: hp(1) }} />
                    <SkeletonBox width={wp(24)} height={hp(2)} borderRadius={wp(1)} style={{ marginBottom: hp(0.5) }} />
                    <SkeletonBox width={wp(30)} height={hp(1.2)} borderRadius={wp(1)} />
                </View>
            </View>

            {/* Stock History Title */}
            <SkeletonBox
                width={wp(32)}
                height={hp(2.2)}
                borderRadius={wp(1)}
                style={{ marginBottom: hp(1.2) }}
            />

            {/* Stock History List Card */}
            <View style={styles.historyCard}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <View key={index} style={styles.historyRow}>
                        <View style={styles.historyLeft}>
                            <SkeletonBox
                                width={wp(11)}
                                height={wp(11)}
                                borderRadius={wp(5.5)}
                            />
                            <View style={{ marginLeft: wp(3) }}>
                                <SkeletonBox width={wp(26)} height={hp(1.8)} borderRadius={wp(1)} />
                                <SkeletonBox width={wp(18)} height={hp(1.4)} borderRadius={wp(1)} style={{ marginTop: hp(0.5) }} />
                            </View>
                        </View>
                        <SkeletonBox width={wp(25)} height={hp(1.4)} borderRadius={wp(1)} />
                    </View>
                ))}
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
        justifyContent: 'space-between',
        marginBottom: hp(2),
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    card: {
        backgroundColor: Colors.surface || '#FFFFFF',
        borderRadius: wp(3),
        padding: wp(3.5),
        marginBottom: hp(1.5),
        borderWidth: 1,
        borderColor: Colors.border || '#E5E7EB',
    },
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productInfo: {
        marginLeft: wp(3.5),
        flex: 1,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    stockRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //alignItems: 'center',
    },
    stockLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(2),
    },
    actionCard: {
        width: wp(44),
        height: hp(11),
        backgroundColor: Colors.surface || '#FFFFFF',
        borderRadius: wp(3),
        padding: wp(3.5),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.border || '#E5E7EB',
    },
    historyCard: {
        backgroundColor: Colors.surface || '#FFFFFF',
        borderRadius: wp(3),
        padding: wp(3.5),
        borderWidth: 1,
        borderColor: Colors.border || '#E5E7EB',
    },
    historyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp(1),
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.border || '#E5E7EB',
    },
    historyLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default ProductStockSkeleton;