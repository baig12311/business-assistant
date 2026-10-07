import { View, Text, StyleSheet } from 'react-native';
import fonts, { fontSize } from '../../constants/typography';
import Colors from '../../constants/colors';
import Icon from '../common/Icon';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

interface props {
    title: string
    info?: string | number
    iconName: string
    iconType: string
    iconColor: string
    bgColor?: string
    iconBg?: string
    currency?: string
}
const DashboardCard: React.FC<props> = ({ currency, title, info, iconName, iconType,
    iconColor, bgColor, iconBg }) => {
    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
            <View style={styles.row}>
                <View style={[styles.icon, { backgroundColor: iconBg }]}>
                    <Icon
                        name={iconName}
                        type={iconType}
                        size={wp(7)}
                        color={iconColor}
                    />
                </View>

                <Text style={styles.textTitle}>
                    {currency ? `${title} (${currency})` : title}
                </Text>
            </View>




            <Text style={[styles.textInfo, { color: iconColor }]}>
                {info}
            </Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: Colors.textSecondary,
        elevation: 1,
        padding: wp(2),
        borderRadius: wp(3),
        width: '48%'
    },
    textTitle: {
        fontFamily: fonts.medium,
        fontSize: fontSize.text,
        color: Colors.textSecondary,
        marginLeft: wp(2),
        flex: 1
    },
    textInfo: {
        fontFamily: fonts.semiBold,
        fontSize: fontSize.heading,
        marginLeft: wp(2),
        alignSelf: 'flex-end'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(6),
        justifyContent: 'center',
        alignItems: 'center',
        //elevation: 1
    },
    valueRow: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    currency: {
        fontFamily: fonts.medium,
        fontSize: fontSize.smallText,
        color: Colors.textSecondary,
        alignSelf: 'center'
    }
});

export default DashboardCard;
