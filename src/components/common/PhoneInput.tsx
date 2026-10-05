import { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardTypeOptions } from "react-native"
import Colors from "../../../src/constants/colors"
import fonts, { fontSize } from "../../../src/constants/typography"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen"
import Icon from "./Icon"
import Input from "./Input"
import SelectInput from "./SelectInput"
interface props {
    //onPress: () => void
    valueNumber: string
    valueCode: string
    onChangeCode: () => void
    onChangeNumber: (text: string) => void
    flag: string
    errorMessage?: string
}
const PhoneInput: React.FC<props> = ({ errorMessage, flag, valueCode, valueNumber,
    onChangeNumber, onChangeCode
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Phone Number*</Text>
            <View style={styles.inputRow}>
                <View style={{ width: wp(32) }}>
                    <SelectInput

                        value={valueCode}
                        onPress={onChangeCode}
                        flag={flag && flag}


                    />
                </View>

                <View style={{ flex: 1 }}>

                    <Input
                        iconName='call-outline'
                        iconType='Ionicons'
                        placeholder='XXXXXXXXXX'
                        //max={10}
                        value={valueNumber}
                        onChangeText={onChangeNumber}
                        keyboard='phone-pad'
                        error={errorMessage}
                    />
                </View>

            </View>



        </View>
    );
};

const styles = StyleSheet.create({
    container: {


    },

    title: {
        fontFamily: fonts.medium,
        fontSize: fontSize.text,
        marginBottom: hp(0.5),
        color: Colors.textSecondary
    },
    inputRow: {
        flexDirection: 'row',

        gap: 10
        //justifyContent: 'flex-start'
    }
});

//make this component available to the app
export default PhoneInput;
