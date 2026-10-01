import { View, Text, StyleSheet } from 'react-native';
import Animated, { withTiming, withRepeat, useAnimatedStyle, useSharedValue, withSequence } from 'react-native-reanimated';
import Colors from '../../constants/colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { useEffect } from 'react';
const AnimatedLoader = () => {
    const translateX = useSharedValue(-100)
    const animatedStyle = useAnimatedStyle(() => (
        {
            transform: [
                {
                    translateX: translateX.value
                }
            ]
        }
    ))

    useEffect(() => {
        translateX.value = withRepeat(

            withTiming(150, { duration: 1400 })


            , -1, false)
    }, []);
    return (
        <View style={styles.container}>
            <Animated.View
                style={[styles.inner, animatedStyle]}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        marginTop: hp(6),
        backgroundColor: Colors.textMuted,
        //elevation:3,
        width: wp(30),
        height: wp(1),
        borderRadius: wp(10),
        overflow: 'hidden'
    },
    inner: {
        height: '100%',
        width: wp(14),
        backgroundColor: Colors.primary,
        borderRadius: wp(10)
    }
});

export default AnimatedLoader;
