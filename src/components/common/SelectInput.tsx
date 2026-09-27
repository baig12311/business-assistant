import { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import Colors from "../../../src/constants/colors"
import fonts, { fontSize } from "../../../src/constants/typography"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen"
import Icon from "./Icon"
interface props {
    value?: string
    //onChangeText?: any
    title: string
    placeholder: string
    error?: string
    onPress?:()=>void
}
const SelectInput: React.FC<props> = ({ value,title, placeholder, error, onPress}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity 
            style={styles.inputContainer} 
            activeOpacity={0.7}
            onPress={onPress}
            >
                <Text style={styles.input}>
                    {value ? value : placeholder}
                </Text>
                <Icon
                name='chevron-small-down'
                type='Entypo'
                size={wp(7)}
                color={Colors.text}
            />
            </TouchableOpacity>
            {
                error && (
                    <Text style={styles.error}>{error}</Text>

                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: hp(2)
    },
    inputContainer: {
        flexDirection: 'row',
        borderWidth: 0.5,
        borderRadius: wp(2),
        borderColor: Colors.textMuted,
        height: hp(5.5),
        paddingHorizontal: wp(2),
        alignItems: 'center'
    },
    input: {
        flex: 1,
        fontSize: fontSize.text,
        fontFamily: fonts.medium,
        color: Colors.textSecondary,
    },
    title: {
        fontFamily: fonts.semiBold,
        fontSize: fontSize.text,
        marginBottom: hp(0.5),
        color: Colors.textSecondary
    },
    error: {
        fontFamily: fonts.regular,
        fontSize: fontSize.smallText,
        marginBottom: hp(0.5),
        color: Colors.error
    }
});

//make this component available to the app
export default SelectInput;
