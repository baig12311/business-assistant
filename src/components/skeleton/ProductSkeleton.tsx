import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';
import { Image } from 'expo-image';
import SkeletonBox from '../skeleton/SkeletonBox';
import fonts, { fontSize } from '../../constants/typography';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Icon from '../common/Icon';

const ProductSkeleton = () => {
    return (
        <View>
            {Array.from({ length: 4 }).map((_, index) => (
                <View style={styles.container} key={index}>
                    <SkeletonBox style={styles.image} />
                    <View style={styles.content}>
                        <View style={styles.bottom}>
                            <SkeletonBox width={wp(40)} height={hp(1.5)} borderRadius={wp(1)} />
                            <SkeletonBox width={wp(3)} height={hp(3)} borderRadius={wp(1)} />

                        </View>

                        <SkeletonBox width={wp(20)} height={hp(1.5)} borderRadius={wp(1)} style={{ marginBottom: hp(1.5) }} />
                        <View style={styles.bottom}>
                            <SkeletonBox width={wp(15)} height={hp(1.5)} borderRadius={wp(1)} style={{ marginBottom: hp(1) }} />
                            <SkeletonBox width={wp(15)} height={hp(1.5)} borderRadius={wp(1)} />

                        </View>
                    </View>
                </View>
            ))}


        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.surface,
        flexDirection: 'row',
        padding: wp(3),
        borderRadius: wp(3),
        alignItems: 'center',
        marginBottom: hp(2),
        borderWidth: 1,
        borderColor: Colors.border,
    },
    image: {
        borderWidth: 0.3,
        width: wp(15),
        height: wp(15),
        borderRadius: wp(2),
        borderColor: Colors.textMuted,
        overflow: 'hidden'
    },
    content: {
        marginLeft: wp(3),
        flex: 1
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});

//make this component available to the app
export default ProductSkeleton;
