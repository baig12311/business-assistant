
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import Colors from '../../constants/colors';
import fonts, { fontSize } from '../../constants/typography';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Icon from '../common/Icon';

interface Props {
    title: string;
    subtitle: string;
    icon: string;
    onPress: () => void;
    showDivider?: boolean;
}

const ProfileMenuItem = ({
    title,
    subtitle,
    icon,
    onPress,
    showDivider = true,
}: Props) => {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <View style={styles.iconContainer}>
                <Icon
                    name={icon}
                    type="Ionicons"
                    size={wp(5.5)}
                    color={Colors.primary}
                />
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>
                    {title}
                </Text>

                <Text
                    style={styles.subtitle}
                    numberOfLines={2}
                >
                    {subtitle}
                </Text>
            </View>

            <Icon
                name="chevron-forward"
                type="Ionicons"
                size={wp(4.5)}
                color={Colors.textSecondary}
            />

            {showDivider && (
                <View style={styles.divider} />
            )}
        </TouchableOpacity>
    );
};

export default ProfileMenuItem;

const styles = StyleSheet.create({
    container: {
        minHeight: hp(9),
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp(1.3),
        gap: wp(3),
        position: 'relative',
    },

    iconContainer: {
        width: wp(11),
        height: wp(11),
        borderRadius: wp(3.2),
        backgroundColor: Colors.successLight,
        alignItems: 'center',
        justifyContent: 'center',
    },

    content: {
        flex: 1,
        gap: hp(0.5),
    },

    title: {
        fontFamily: fonts.medium,
        fontSize: fontSize.text,
        color: Colors.text,
    },

    subtitle: {
        fontFamily: fonts.regular,
        fontSize: fontSize.extraSmallText,
        color: Colors.textSecondary,
        lineHeight: wp(4.5),
    },

    divider: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: wp(14),
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.border,
    },
});
