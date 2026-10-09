import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useCustomerById } from '../../hooks/useCustomer';
import Colors from '../../constants/colors';
import { Image } from 'expo-image';
import fonts, { fontSize } from '../../constants/typography';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Icon from '../common/Icon';
interface props {
    orderNumber?:string
    customerName?:string
    date?:string
    amount:string
    currency:string
    onPress?:()=>void
}
const OrderCard:React.FC<props> = ({orderNumber, customerName, date, amount, currency, onPress}) => {
    // const {data, isLoading} =useCustomerById(customerId)
    return (
        <TouchableOpacity 
        style={styles.container}
        activeOpacity={0.7}
        onPress={onPress}
        >
            <View style={styles.row}>
                <Text style={styles.order}>Order #{orderNumber}</Text>
                <Text style={styles.order}>{currency} {amount.toLocaleString()}</Text>
            </View>
            
            <Text style={styles.customer}>{customerName}</Text>
            <Text style={styles.date}>{date}</Text>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        padding:wp(2),
        backgroundColor: Colors.surface,
        elevation:1,
        marginBottom:hp(2),
        borderRadius: wp(2),
        borderWidth:1,
        borderColor:Colors.surface
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        //marginBottom: hp(0.5)
    },
    order:{
        fontFamily: fonts.bold,
        fontSize:fontSize.text,
        color:Colors.text
    },
    date:{
        fontFamily: fonts.medium,
        fontSize:fontSize.extraSmallText,
        color:Colors.textSecondary
    },
    customer:{
        fontFamily: fonts.medium,
        fontSize:fontSize.smallText,
        color:Colors.text,
        marginBottom:hp(0.5)
    }
});


export default OrderCard;
