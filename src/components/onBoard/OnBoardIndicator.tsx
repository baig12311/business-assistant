import { StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../../constants/colors';

interface Props {
    active: boolean;
}

const OnboardingIndicator: React.FC<Props> = ({ active }) => {
    const ACTIVE_WIDTH = wp(5);
const INACTIVE_WIDTH = wp(2.5);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: withTiming(
                active ? ACTIVE_WIDTH : INACTIVE_WIDTH,
                { duration: 250 }
            ),
            opacity: withTiming(
                active ? 1 : 0.6,
                { duration: 250 }
            ),
        };
    });

    return (
        <Animated.View
            style={[
                styles.indicator,
                animatedStyle,
                {
                    backgroundColor: active
                        ? Colors.primary
                        : Colors.border,
                },
            ]}
        />
    );
};

const styles = StyleSheet.create({
    indicator: {
        height: wp(2.5),
        borderRadius: wp(2),
    },
});

export default OnboardingIndicator;