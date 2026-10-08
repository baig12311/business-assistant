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
    title?: string
    placeholder?: string
    error?: string
    onPress?: () => void
    iconName?: string
    iconType?: string
    flag?: string
}
const SelectInput: React.FC<props> = ({ flag, value, title, placeholder, error, onPress, iconName, iconType }) => {
    const newValue = flag ? flag + '  ' + value : value
    return (
        <View style={styles.container}>
            {
                title && (<Text style={styles.title}>{title}</Text>
                )
            }

            <TouchableOpacity
                style={styles.inputContainer}
                activeOpacity={0.7}
                onPress={onPress}
            >
                {
                    iconName && iconType && (
                        <Icon
                            name={iconName}
                            type={iconType}
                            color={Colors.textSecondary}
                            size={wp(5)}
                        />
                    )
                }

                <Text style={[styles.input,
                { color: value ? Colors.text : Colors.textSecondary }
                ]}>
                    {value ? newValue : placeholder}
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
        alignItems: 'center',
        backgroundColor: Colors.surface,
        elevation: 1,
    },
    input: {
        flex: 1,
        fontSize: fontSize.text,
        fontFamily: fonts.medium,
        //color: Colors.textSecondary,
        marginLeft: wp(2)
    },
    title: {
        fontFamily: fonts.medium,
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
