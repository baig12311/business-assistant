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
interface props{
    title?:string
    isSelected?:boolean
    onPress?:()=>void
}
const Status:React.FC<props> = ({title, isSelected, onPress}) => {
    return (
        <TouchableOpacity 
        activeOpacity={0.7}
        onPress={onPress}
        style={[styles.container, {backgroundColor:
            isSelected ? Colors.primary : Colors.border
        }]}>
            <Text style={[styles.text,
                {color: isSelected ? Colors.surface : Colors.textSecondary,
                    fontFamily: isSelected ? fonts.semiBold : fonts.medium
                }
            ]}>{title}</Text>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        //backgroundColor: Colors.border,
        paddingHorizontal: wp(4),
        paddingVertical: wp(0.5),
        borderRadius: wp(50),
    },
    text:{
        
        fontSize: fontSize.smallText,
        //fontFamily: fonts.medium,
    }
});


export default Status;
