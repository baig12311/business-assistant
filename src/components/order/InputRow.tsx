import { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Colors from '../../constants/colors';
import { Image } from 'expo-image';
import fonts, { fontSize } from '../../constants/typography';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Icon from '../common/Icon';
interface props {
    value?: string
    onChangeText: any
    title?: string
    currency?:string
    borderWidth?:number
}
const InputRow: React.FC<props> = ({ value, onChangeText, title, currency, borderWidth}) => {
    return (
        <View style={[styles.summaryRow, { borderBottomWidth: borderWidth }]}>
            <Text style={styles.summaryText}>{title} ({currency})</Text>
            <View style={{ flex: 1 }}>
                <TextInput
                    placeholder='0'
                    style={styles.input}
                    keyboardType='numeric'
                    value={value}
                    onChangeText={onChangeText}
                    
                />
            </View>

        </View>
    );
};


const styles = StyleSheet.create({
    summaryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: hp(1),
        borderColor: Colors.textSecondary,
    },
    summaryText: {
        fontFamily: fonts.medium,
        fontSize: fontSize.text,
        color: Colors.textSecondary,
    },
    input:{
        borderWidth:0.3,
        borderColor: Colors.textSecondary,
        paddingHorizontal: wp(2),
        borderRadius: wp(2),
        width: '40%',
        alignSelf: 'flex-end',
        backgroundColor: Colors.surface,
        fontFamily: fonts.medium,
        fontSize: fontSize.text,
        color: Colors.text,
    },
});

//make this component available to the app
export default InputRow;
