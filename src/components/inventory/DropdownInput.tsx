import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../constants/colors';
import fonts, {fontSize} from '../../constants/typography';
import { widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { adjustmentReasons } from '../../services/data/adjustmentReasons';
import Icon from '../common/Icon';
interface props{
    onPress?:()=>void
    value:string
    onChange:(value:string)=>void
    error?:string
    open?:boolean
}

const DropdownInput:React.FC<props> = ({onChange, value, onPress, error, open}) => {
    const selectedReason = adjustmentReasons.find(
    (reason) => reason.value === value
);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reason</Text>
               
            

            <TouchableOpacity
                style={styles.inputContainer}
                activeOpacity={0.7}
                onPress={onPress}
            >

                <Text style={[styles.input,
                { color: value ? Colors.text : Colors.textSecondary }
                ]}>
                    {selectedReason?.label ?? 'Select reason'}
                </Text>
                <Icon
                    name='chevron-small-down'
                    type='Entypo'
                    size={wp(7)}
                    color={Colors.text}
                />
            </TouchableOpacity>
            {
                open && (
                    <View style={styles.dropDown}>
                        {
                            adjustmentReasons.map((reason, index)=>{
                                return(
                                    <TouchableOpacity
                                    activeOpacity={0.7}
                                    key={reason.value}
                                    onPress={()=>onChange(reason.value)}
                                    style={styles.reasonButton}
                                    >
                                        <Text style={styles.dropText}>{reason.label}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                )
            }
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
    },
    reasonButton:{
        paddingHorizontal: wp(3),
        paddingVertical: hp(1)
    },
    dropDown:{
        
        paddingVertical: wp(2),
        backgroundColor: Colors.surface,
        elevation:2
    },
    dropText:{
        fontSize: fontSize.smallText,
        fontFamily: fonts.medium,
        color: Colors.text
    }
});


export default DropdownInput;
