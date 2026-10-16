import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Colors from '../../constants/colors';
import fonts, { fontSize } from '../../constants/typography';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Icon from './Icon';

interface props{
    title?:string
    subText?:string
    iconName:string
    iconType:string
    onPress?:()=>void
    selected?:boolean
}
const BusinessType:React.FC<props> = ({title, subText, iconName, iconType, selected, onPress}) => {
    return (
        <TouchableOpacity
        activeOpacity={0.7} 
        style={[styles.container,selected&&{borderWidth:1.5}]}
        onPress={onPress}
        >
            <View style={styles.icon}>
                <Icon
                name={iconName}
                type={iconType}
                size={wp(5.5)}
                color={Colors.primary}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textTitle}>{title}</Text>
                <Text style={styles.textSub}>{subText}</Text>
            </View>
            <View style={[styles.check, {
                backgroundColor: selected ? Colors.primary : Colors.surface,
                borderWidth: !selected ? 1 : 0
            }]}>
                {
                    selected && (<View style={styles.selectedCheck}/>)
                }
            </View>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        borderColor:Colors.primary,
        //elevation:5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius:wp(2),
        padding: wp(2),
        marginBottom: hp(2)
    },
    textContainer:{
        marginLeft: wp(3),
        flex:1
    },
    check:{
        width: wp(5),
        height: wp(5),
        borderRadius: wp(3),
        //backgroundColor: Colors.textMuted,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.border
    },
    icon:{
        width: wp(10),
        height: wp(10),
        borderRadius: wp(6),
        backgroundColor: Colors.successLight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textTitle:{
        fontSize: fontSize.text,
        fontFamily: fonts.semiBold,
        color:Colors.text
    },
    textSub:{
        fontSize: fontSize.smallText,
        fontFamily: fonts.medium,
        color:Colors.textSecondary
    },
    selectedCheck:{
         width: wp(2.5),
        height: wp(2.5),
        borderRadius: wp(3),
        backgroundColor: Colors.successLight,
        //alignSelf: 'center'
    }
});

//make this component available to the app
export default BusinessType;
