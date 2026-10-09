import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from '../skeleton/SkeletonBox'; // Path apne structure ke hisab se adjust kar lein
import Colors from '../../constants/colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const OrderSkeleton = () => {
    return (
        <View style={styles.container}>
           

            {/* Order Cards List Skeleton */}
            {Array.from({ length: 6 }).map((_, index) => (
                <View key={index} style={styles.card}>
                    {/* Top Row: Order # and PKR Price */}
                    <View style={styles.row}>
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

                    {/* Customer Name */}
                    <SkeletonBox
                        width={wp(28)}
                        height={hp(1.8)}
                        borderRadius={wp(1)}
                        style={{ marginTop: hp(0.8), marginBottom: hp(1) }}
                    />

                    {/* Date / Time */}
                    <SkeletonBox
                        width={wp(22)}
                        height={hp(1.5)}
                        borderRadius={wp(1)}
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
        marginBottom: hp(2.5),
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: hp(6),
        borderWidth: 1,
        borderColor: Colors.border || '#E5E7EB',
        borderRadius: wp(3),
        paddingHorizontal: wp(3.5),
        marginBottom: hp(2),
        backgroundColor: Colors.surface || '#FFFFFF',
    },
    card: {
        backgroundColor: Colors.surface || '#FFFFFF',
        borderRadius: wp(3),
        padding: wp(4),
        marginBottom: hp(1.5),
        borderWidth: 1,
        borderColor: Colors.border || '#E5E7EB',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default OrderSkeleton;