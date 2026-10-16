import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';
import Icon from '../common/Icon';
import fonts, { fontSize } from '../../constants/typography';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
interface props {
    amount?: number
    allocations?: any[]
    date?: string
    currency:string
}
const PaymentCard: React.FC<props> = ({ amount, allocations, date, currency}) => {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <View style={styles.icon}>
                    <Icon
                        name='wallet-outline'
                        type='Ionicons'
                        size={wp(5.5)}
                        color={Colors.primary}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Payment Received</Text>
                    <Text style={styles.date}>{date}</Text>

                </View>
                <View style={{alignItems:'flex-end'}}>
                    <Text style={styles.textRec}>+ {currency} {amount?.toLocaleString()}</Text>
                    <Text style={styles.date}>Received</Text>
                </View>
            </View>

            <View>
                {
                    allocations?.map((item, index) => {
                        return (
                            <View key={index} style={styles.allocContainer}>
                                <View style={styles.allocRow}>
                                    <Text style={styles.textAlloc}>Allocated to</Text>
                                    <Text style={styles.textAlloc}>Order #{item.orders.order_number}</Text>
                                </View>
                                <View style={styles.allocRow}>
                                    <Text style={styles.textAlloc}>Allocated amount</Text>
                                    <Text style={styles.textAlloc}>{currency} {item.amount.toLocaleString()}</Text>
                                </View>

                            </View>


                        )
                    })
                }
            </View>


            {/* <Text>{orderAllocated}</Text> */}
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: Colors.surface,
        marginBottom: hp(2),
        padding: wp(3),
        elevation: 1,
        backgroundColor: Colors.surface,
        borderRadius: wp(2)
        //flexDirection: 'row'
    },
    info: {
        flexDirection: 'row',
        marginBottom: hp(1),
        borderColor: Colors.textSecondary
    },
    icon: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.successLight
    },
    textContainer: {
        flex: 1,
        marginLeft: wp(3)
    },
    title: {
        fontFamily: fonts.semiBold,
        fontSize: fontSize.text,
        color: Colors.text
    },
    date: {
        fontFamily: fonts.medium,
        fontSize: fontSize.extraSmallText,
        color: Colors.textSecondary
    },
    allocRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: hp(0.3),
    },
    textAlloc:{
        fontFamily: fonts.medium,
        fontSize: fontSize.smallText,
        color: Colors.text
    },
    textRec:{
        fontFamily: fonts.bold,
        fontSize: fontSize.text,
        color: Colors.text
    },
    allocContainer:{
        borderTopWidth: 0.3,
        borderColor: Colors.textSecondary,
        paddingVertical: hp(0.3)
    }
});

//make this component available to the app
export default PaymentCard;
