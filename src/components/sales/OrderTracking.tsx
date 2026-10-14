
import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../constants/colors';
import fonts from '../../constants/typography';

type OrderStatusType = 'Pending' | 'Confirmed' | 'Shipped';

interface Props {
    status: OrderStatusType;
}

const statuses: OrderStatusType[] = [
    'Pending',
    'Confirmed',
    'Shipped',
];

const OrderStatus: React.FC<Props> = ({ status }) => {
    const currentIndex = statuses.indexOf(status);

    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withTiming(
            Math.max(currentIndex, 0),
            { duration: 800 }
        );
    }, [currentIndex]);

    const animatedLine = useAnimatedStyle(() => ({
        width: `${(progress.value / 2) * 100}%`,
    }));

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Order Status</Text>

            <View style={styles.progressContainer}>
                <View style={styles.baseLine} />

                <Animated.View
                    style={[styles.activeLine, animatedLine]}
                />

                {statuses.map((item, index) => {
                    const isActive = index <= currentIndex;

                    return (
                        <View
                            key={item}
                            style={styles.stepContainer}
                        >
                            <View
                                style={[
                                    styles.circle,
                                    isActive && styles.activeCircle,
                                ]}
                            />

                            <Text
                                style={[
                                    styles.statusText,
                                    isActive && styles.activeText,
                                ]}
                            >
                                {item}
                            </Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: wp(4),
        borderRadius: wp(3),
        backgroundColor: Colors.surface,
        elevation:1,
        borderWidth: 1,
        borderColor: Colors.surface,
    },

    heading: {
        fontFamily: fonts.semiBold,
        fontSize: wp(4),
        color: Colors.primary,
        marginBottom: hp(2),
    },

    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
    },

    baseLine: {
        position: 'absolute',
        height: 2,
        backgroundColor: Colors.textMuted,
        left: '16.66%',
        right: '16.66%',
        top: wp(2),
    },

    activeLine: {
        position: 'absolute',
        height: 2,
        backgroundColor: Colors.primary,
        left: '16.66%',
        top: wp(2),
        maxWidth: '66.68%',
    },

    stepContainer: {
        flex: 1,
        alignItems: 'center',
    },

    circle: {
        width: wp(4),
        height: wp(4),
        borderRadius: wp(2),
        backgroundColor: Colors.textMuted,
        zIndex: 1,
    },

    activeCircle: {
        backgroundColor: Colors.primary,
    },

    statusText: {
        fontFamily: fonts.medium,
        fontSize: wp(3),
        color: Colors.textSecondary,
        marginTop: wp(2),
    },

    activeText: {
        color: Colors.primary,
    },
});

export default OrderStatus;