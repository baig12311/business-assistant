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
interface props{
    onPress:()=>void
    valueNumber:string
    valueCode:string
    onChangeCode:()=>void
    onChangeNumber:()=>void
}
const PhoneInput: React.FC<props>= ({onPress, valueCode, valueNumber,
    onChangeNumber, onChangeCode
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Phone Number*</Text>
            <View style={styles.inputRow}>
                <View style={{ width: wp(30) }}>
                    <SelectInput 
                    iconName='call-outline'
                    iconType='Ionicons'
                    value={valueCode}
                    onPress={onChangeCode}
                    

                    />
                </View>

                <View style={{ flex: 1 }}>

                    <Input 
                    placeholder= 'XXXXXXXXXX'
                    max={10}
                    value={valueNumber}
                    onChangeText={onChangeNumber}
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
