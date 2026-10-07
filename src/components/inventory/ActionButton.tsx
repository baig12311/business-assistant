import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../constants/colors';
import fonts, {fontSize} from '../../constants/typography';
import { widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Icon from '../common/Icon';
interface props{
    bgColor:string
    iconColor: string
    iconName: string
    iconType:string
    borderColor?:string
    borderWidth?: number,
    mainText?:string
    subText?:string
    maincolor?:string
    subColor?:string
    onPress?:()=>void
}
const ActionButton:React.FC<props> = ({bgColor, iconColor, iconName, 
    iconType,  borderWidth, borderColor, onPress, mainText, subText, maincolor, subColor}) => {
    return (
        <TouchableOpacity 
        style={[styles.container, {backgroundColor: bgColor, borderWidth: borderWidth, borderColor: borderColor}]}
        activeOpacity={0.7}
        onPress={onPress}
        >
            <Icon
            name={iconName}
            type={iconType}
            color={iconColor}
            size={wp(8)}
            />
            <Text style={[styles.main, {color: maincolor}]}>{mainText}</Text>
            <Text style={[styles.sub, {color: subColor}]}>{subText}</Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width: wp(45),
        //paddingHorizontal: wp(5),
        paddingVertical: wp(3),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(2),
        elevation: 1
    },
    main:{
        fontSize: fontSize.text,
        fontFamily: fonts.semiBold,
        marginTop: hp(0.5)
    },
    sub:{
        fontFamily: fonts.medium,
        fontSize: fontSize.extraSmallText
    }
});

//make this component available to the app
export default ActionButton;
