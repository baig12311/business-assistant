import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import fonts, { fontSize } from '../../constants/typography';
import { adjustmentReasons } from '../../services/data/adjustmentReasons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Icon from '../common/Icon';

interface props {
    type: string
    isLast?: boolean
    quantity?: string
    reason?: string
    date?: string
    invoice?: string
}
const StockCard: React.FC<props> = ({ type, isLast, quantity, reason, date, invoice }) => {
    const formatType = type.charAt(0).toUpperCase() + type?.slice(1)
    const formatQuantity =
        type === 'restock' || (type === 'adjustment' && Number(quantity) > 0)
            ? `+${quantity}`
            : quantity;
    quantity
    const reasonLabel = adjustmentReasons.find(item => item.value === reason)?.label ?? reason
    const reasonText = reason === 'Order sale' ? `Invoice #${invoice}` : reasonLabel
    const icon = type === 'sale' ? { name: 'arrow-down', type: 'Ionicons' } :
        type === 'restock' ? { name: 'arrow-up', type: 'Ionicons' } :
            { name: 'minus', type: 'Entypo' }
    const colors = type === 'sale' ? { bgColor: Colors.errorLight, color: Colors.error } :
        type === 'restock' ? { bgColor: Colors.successLight, color: Colors.primary } :
            { bgColor: Colors.warningLight, color: Colors.warning }
    return (
        <View style={[styles.container, !isLast && { borderBottomWidth: 0.3 }]}>
            <View style={styles.iconContainer}>
                <View style={[styles.icon, { backgroundColor: colors.bgColor }]}>
                    <Icon
                        name={icon.name}
                        type={icon.type}
                        color={colors.color}
                        size={wp(6)}
                    />
                </View>
                <Text style={[styles.txtStock, { color: colors.color }]}>{formatQuantity} pcs</Text>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.type}>{formatType}</Text>
                {
                    reason && (<Text style={styles.reason}>{reasonText}</Text>)
                }
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={[styles.reason,]}>{date}</Text>

            </View>

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        borderColor: Colors.textSecondary,
        paddingVertical: hp(1),
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtStock: {
        fontFamily: fonts.bold,
        fontSize: fontSize.text,
        marginLeft: wp(1),
    },
    textContainer: {
        flex: 1,
        marginLeft: wp(3),
    },
    type: {
        fontFamily: fonts.bold,
        fontSize: fontSize.smallText,
        color: Colors.text,
        marginBottom: hp(0.4)
    },
    reason: {
        fontFamily: fonts.medium,
        fontSize: fontSize.extraSmallText,
        color: Colors.textSecondary
    }
});

//make this component available to the app
export default StockCard;
