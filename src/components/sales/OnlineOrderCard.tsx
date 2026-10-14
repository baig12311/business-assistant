
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../../constants/colors';
import Icon from '../common/Icon';
import fonts, { fontSize } from '../../constants/typography';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
interface props {
    date?: any
    orderNumber?: string
    amount?: number
    paidAmount?: number
    currency?: string
    onPress?:()=>void
    disabled?:boolean
    customer?:string
    status?:string
}
const OnlineOrderCard: React.FC<props> = ({ status, customer, onPress, date, orderNumber, amount, paidAmount, currency, disabled}) => {
    // const formatDate = new Date(date).toLocaleDateString('en-GB', {
    //     day: '2-digit',
    //     month: 'short',
    //     year: 'numeric',
    // });

    // const due = paidAmount - amount
    // const totalPaid = paidAmount >= amount ? amount : paidAmount
    // const badgeText = (paidAmount > 0 && due < 0) ? 'Partially Paid' : paidAmount === 0 ? 'Due' : 'Paid'
    const badgeColor = status === 'Pending' ? { bg: Colors.yellowLight, color: Colors.yellow } :
         status === 'Confirmed' ? { bg: Colors.blueLight, color: Colors.blue } :
             { bg: Colors.warningLight, color: Colors.yellow }
    return (
        <TouchableOpacity 
        style={styles.container}
        activeOpacity={0.7}
        disabled={disabled}
        onPress={onPress}
        >
            <View style={styles.header}>
                <Text style={styles.order}>Order # {orderNumber}</Text>
                <Text style={[styles.badgeText,
                { backgroundColor: badgeColor.bg, color: badgeColor.color }
                ]}>{status}</Text>

            </View>
            {
                customer && (<Text style={styles.customer}>{customer}</Text>)
            }
            <Text style={styles.date}>{date}</Text>


            
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        borderRadius: wp(2),
        padding: wp(3),
        backgroundColor: Colors.surface,
        elevation: 1,
        marginBottom: hp(2),

    },
    textContainer: {
        flex: 1,
        marginLeft: wp(3)
    },
    order: {
        fontFamily: fonts.bold,
        fontSize: fontSize.text,
        color: Colors.text,
        //marginBottom: hp(1)
    },
    date: {
        fontFamily: fonts.medium,
        fontSize: fontSize.extraSmallText,
        color: Colors.textSecondary
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    amountRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: hp(1),
        flexWrap: 'wrap'
    },
    divider: {
        height: hp(2.5),
        borderWidth: 0.5,
        borderColor: Colors.textMuted
    },
    badgeText: {
        fontFamily: fonts.medium,
        fontSize: fontSize.extraSmallText,
        paddingHorizontal: wp(2),
        paddingVertical: wp(0.5),
        borderRadius: wp(50)
        //color: Colors.textSecondary
    },
    customer:{
         fontFamily: fonts.medium,
        fontSize:fontSize.smallText,
        color:Colors.text,
        marginBottom:hp(0.5)
    }
   
});

//make this component available to the app
export default OnlineOrderCard;
