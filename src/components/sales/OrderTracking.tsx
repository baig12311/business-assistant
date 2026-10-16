
import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
} from 'react-native-reanimated';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Colors from '../../constants/colors';
import fonts from '../../constants/typography';
import Icon from '../common/Icon';

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
    const statusIndex = statuses.indexOf(status);

    const progress = useSharedValue(0);
    const circleScale = useSharedValue(1);
    const checkScale = useSharedValue(0);

    useEffect(() => {
        progress.value = withTiming(
            Math.max(statusIndex, 0),
            { duration: 800 }
        );

        circleScale.value = 0;
        checkScale.value = 0;

        circleScale.value = withDelay(
            300,
            withTiming(1, { duration: 300 })
        );

        checkScale.value = withDelay(
            500,
            withTiming(1, { duration: 300 })
        );
    }, [statusIndex]);

    const animatedLine = useAnimatedStyle(() => ({
        width: `${(progress.value / 2) * 66.68}%`,
    }));

    const animatedCircle = useAnimatedStyle(() => ({
        transform: [{ scale: circleScale.value }],
    }));

    const animatedCheck = useAnimatedStyle(() => ({
        transform: [{ scale: checkScale.value }],
    }));

    return (
        // <View style={styles.container}>

            <View style={styles.tracker}>
                <View style={styles.baseLine} />

                <Animated.View
                    style={[styles.activeLine, animatedLine]}
                />

                {statuses.map((item, index) => {
                    const isCompleted = index < statusIndex;
                    const isCurrent = index === statusIndex;
                    const isActive = index <= statusIndex;

                    return (
                        <View
                            key={item}
                            style={styles.stepContainer}
                        >
                            <View
                                style={[
                                    styles.circleWrapper,
                                    isCurrent && styles.currentWrapper,
                                ]}
                            >
                                <Animated.View
                                    style={[
                                        styles.circle,
                                        isActive && styles.activeCircle,
                                        isCurrent && animatedCircle,
                                    ]}
                                >
                                    {isCompleted && (
                                        <Icon
                                            name="checkmark"
                                            type="Ionicons"
                                            color={Colors.background}
                                            size={wp(4)}
                                        />
                                    )}

                                    {isCurrent && (
                                        <Animated.View
                                            style={animatedCheck}
                                        >
                                            <Icon
                                                name="checkmark"
                                                type="Ionicons"
                                                color={Colors.background}
                                                size={wp(4)}
                                            />
                                        </Animated.View>
                                    )}
                                </Animated.View>
                            </View>

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
           
        // </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: wp(4),
        borderRadius: wp(3),
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.surface,
        elevation: 1,
    },

    heading: {
        fontFamily: fonts.semiBold,
        fontSize: wp(4),
        color: Colors.primary,
        marginBottom: hp(2),
    },

    tracker: {
        flexDirection: 'row',
        position: 'relative',
        marginBottom: hp(2),
    },

    baseLine: {
        position: 'absolute',
        height: wp(0.5),
        backgroundColor: Colors.textMuted,
        left: '16.66%',
        right: '16.66%',
        top: wp(4),
    },

    activeLine: {
        position: 'absolute',
        height: wp(0.5),
        backgroundColor: Colors.primary,
        left: '16.66%',
        top: wp(4),
        maxWidth: '66.68%',
    },

    stepContainer: {
        flex: 1,
        alignItems: 'center',
        zIndex: 2,
    },

    circleWrapper: {
        width: wp(8),
        height: wp(8),
        borderRadius: wp(4),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.surface,
    },

    currentWrapper: {
        borderWidth: 1.5,
        borderColor: Colors.primary,
    },

    circle: {
        width: wp(6),
        height: wp(6),
        borderRadius: wp(3),
        backgroundColor: Colors.textMuted,
        alignItems: 'center',
        justifyContent: 'center',
    },

    activeCircle: {
        backgroundColor: Colors.primary,
    },

    statusText: {
        marginTop: wp(2),
        fontFamily: fonts.medium,
        fontSize: wp(3.2),
        color: Colors.textSecondary,
        textAlign: 'center',
    },

    activeText: {
        color: Colors.primary,
    },
});

export default OrderStatus;
