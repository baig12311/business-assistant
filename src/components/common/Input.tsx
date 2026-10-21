import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardTypeOptions } from "react-native"
import Colors from "../../../src/constants/colors"
import fonts, { fontSize } from "../../../src/constants/typography"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen"
import Icon from "./Icon"
import { maxLength } from "zod"
interface props {
    value?: string
    onChangeText?: any
    title?: string
    placeholder?: string
    secure?: boolean
    error?: string
    max?: number
    iconName?: string
    iconType?: string
    keyboard?: KeyboardTypeOptions
    isOrderInput?: boolean
    isEditable?: boolean
    onPressEdit?: () => void
    autoFocus?: boolean
    onBlur?:()=>void
}
const Input: React.FC<props> = ({ autoFocus, onBlur, isOrderInput, max, value, onChangeText, title, placeholder,
    error, iconName, iconType, keyboard, isEditable = true, onPressEdit }) => {
    const [show, setShow] = useState(false)
    const inputRef = useRef<TextInput>(null);
    const isPasswordField = title === 'Password*' || title === 'Confirm Password*'
    || title === 'Password' || title === 'Confirm Password'
    // useEffect(() => {
    //     if (!isEditable) return;

    //     const timer = setTimeout(() => {
    //         inputRef.current?.focus();
    //     }, 100);

    //     return () => clearTimeout(timer);
    // }, [isEditable]);
    useEffect(() => {
    if (!autoFocus || !isEditable) return;

    const timer = setTimeout(() => {
        inputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
}, [autoFocus, isEditable]);
    return (
        <View style={!isOrderInput && { marginBottom: hp(2) }}>
            {
                title && (<Text style={styles.title}>{title}</Text>
                )
            }
            <View style={styles.inputContainer}>
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

                <TextInput
                    ref={inputRef}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    keyboardType={keyboard}
                    maxLength={max}
                    placeholderTextColor={Colors.textSecondary}
                    style={styles.input}
                    editable={isEditable}
                    autoFocus={autoFocus}
                    onBlur={onBlur}
                    secureTextEntry={(title === 'Password*' || title === 'Confirm Password*') && !show}
                />
                {
                    (isPasswordField) && (
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
                {
                    !isEditable && (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={onPressEdit}
                        >
                            <Icon
                                name='edit'
                                type='Feather'
                                size={wp(5)}
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

    },
    inputContainer: {
        flexDirection: 'row',
        borderWidth: 0.1,
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
        color: Colors.text,
        marginLeft: wp(1)
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
export default Input;
