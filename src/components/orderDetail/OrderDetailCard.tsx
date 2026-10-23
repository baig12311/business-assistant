import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';
import { Image } from 'expo-image';
import fonts, { fontSize } from '../../constants/typography';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Icon from '../common/Icon';

interface props {
    cName: string
    orderDate: string
    phone: string
    amount: number
    paidAmount: number
    orderStatus?:string
    
    //pStatus: string | number
}
const OrderDetailCard: React.FC<props> = ({ orderStatus, cName, orderDate, phone, amount, paidAmount }) => {
    const initials = cName
        .trim()
        .split(' ')
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
    const due = paidAmount - amount
    const badgeText = (paidAmount > 0 && due < 0) ? 'Partially Paid' : paidAmount === 0 ? `Due: ${due.toLocaleString()}` : 'Paid'
    const badgeColor = badgeText === 'Paid' ? { bg: Colors.successLight, color: Colors.primary } :
        badgeText === 'Partially Paid' ? { bg: Colors.warningLight, color: Colors.yellow }
            : { bg: Colors.errorLight, color: Colors.error }

            const orderBadgeColor = orderStatus === 'Pending' ? { bg: Colors.warningLight, color: Colors.yellow } :
         orderStatus === 'Confirmed' ? { bg: Colors.blueLight, color: Colors.blue } :
           orderStatus === 'Shipped' ? { bg: Colors.successLight, color: Colors.primary }:
           {bg: Colors.errorLight, color: Colors.error }
            


    return (
        <View style={styles.container}>
            <View style={styles.customerInfo}>
                <View style={styles.icon}>
                    <Text style={styles.initial}>{initials}</Text>

                </View>
                <View style={styles.textContainer}>
                    <Text style={[styles.name, { color: Colors.text }]}>{cName}</Text>
                    <Text style={[styles.name, { color: Colors.textSecondary }]}>{phone}</Text>
                </View>
            </View>

            <View style={styles.orderInfo}>
                <View>
                    <Text style={[styles.name, { color: Colors.text }]}>Order Date</Text>
                    <Text style={styles.date}>{orderDate}</Text>
                </View>
                {
                 orderStatus && (
                    <View>
                    <Text style={[styles.name, { color: Colors.text }]}>Order Status</Text>
                    <Text style={[styles.badge, {
                        backgroundColor: orderBadgeColor.bg, color: orderBadgeColor.color
                    }]}>{orderStatus}</Text>
                </View>
                 )   
                }
                {
                    orderStatus!=='Cancelled' && (
                        <View>
                    <Text style={[styles.name, { color: Colors.text }]}>Payment Status</Text>
                    <Text style={[styles.badge, {
                        backgroundColor: badgeColor.bg,
                        color: badgeColor.color
                    }]}>{badgeText}</Text>
                </View>
                    )
                }
                
            </View>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.surface,
        elevation: 1,
        borderRadius: wp(2),
        padding: wp(2),
        marginBottom: hp(2)
    },
    icon: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(6),
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    initial: {
        fontSize: fontSize.text,
        fontFamily: fonts.bold,
        color: Colors.surface,
        letterSpacing: 2
    },
    customerInfo: {
        flexDirection: 'row',
        marginBottom: hp(2)
    },
    textContainer: {
        marginLeft: wp(3)
    },
    orderInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        fontFamily: fonts.medium,
        fontSize: fontSize.text,
        marginBottom: hp(0.5)
    },
    date: {
        fontFamily: fonts.medium,
        fontSize: fontSize.smallText,
        color: Colors.textSecondary
    },
    badge: {
        fontFamily: fonts.medium,
        fontSize: fontSize.smallText,
        paddingHorizontal: wp(3),
        borderRadius: wp(50),
        paddingVertical: wp(0.5),
        marginBottom: hp(0.5),
        textAlign: 'center'
    },
});

//make this component available to the app
export default OrderDetailCard;
