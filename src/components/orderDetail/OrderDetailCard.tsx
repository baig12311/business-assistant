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
    pStatus: string | number
}
const OrderDetailCard: React.FC<props> = ({ cName, orderDate, phone, pStatus}) => {
    const initials = cName
        .trim()
        .split(' ')
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
    return (
        <View style={styles.container}>
            <View style={styles.customerInfo}>
                <View style={styles.icon}>
                    <Text style={styles.initial}>{initials}</Text>

                </View>
                <View style={styles.textContainer}>
                    <Text style={[styles.name, {color:Colors.text}]}>{cName}</Text>
                    <Text style={[styles.name, {color:Colors.textSecondary}]}>{phone}</Text>
                </View>
            </View>

            <View style={styles.orderInfo}>
                <View>
                    <Text style={[styles.name, {color:Colors.text}]}>Order Date</Text>
                    <Text style={styles.date}>{orderDate}</Text>
                </View>
                <View>
                    <Text style={[styles.name, {color:Colors.text}]}>Payment Status</Text>
                    <Text style={[styles.name, {color:Colors.text}]}>{pStatus}</Text>
                </View>
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
        fontFamily:fonts.medium,
        fontSize: fontSize.text,
        marginBottom: hp(0.5)
    },
    date:{
        fontFamily:fonts.medium,
        fontSize: fontSize.smallText,
        color:Colors.textSecondary
    }
});

//make this component available to the app
export default OrderDetailCard;
