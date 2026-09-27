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
    onChangeText?: any
    title: string
    placeholder: string
    secure?: boolean
    error?: string
    iconName:string
    iconType:string
}
const Input: React.FC<props> = ({ value, onChangeText, title, placeholder, error, iconName, iconType}) => {
    const [show, setShow] = useState(false)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.inputContainer}>
                <Icon
                name={iconName}
                type={iconType}
                color={Colors.textSecondary}
                size={wp(5)}
                />
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.textSecondary}
                    style={styles.input}
                    secureTextEntry={(title === 'Password' || title === 'Confirm Password') && !show}
                />
                {
                    (title === 'Password' || title === 'Confirm Password') && (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => setShow(!show)}
                        >
                            <Icon
                                name={show ? 'eye-outline' : 'eye-off-outline'}
                                type='Ionicons'
                                size={wp(6)}
                                color={Colors.textSecondary}
                            />
                        </TouchableOpacity>

                    )
                }

            </View>
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
        color: Colors.text,
        marginLeft:wp(1)
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
export default Input;
