import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';
import Icon from '../common/Icon';
import fonts, { fontSize } from '../../constants/typography';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
interface props {
    name: string
    phone: string
    onPress?:()=>void
    order?:number
}
const CustomerCard: React.FC<props> = ({ name, phone,onPress, order}) => {
    const initials = name
        .trim()
        .split(' ')
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
    return (
        <TouchableOpacity 
        style={styles.container}
        activeOpacity={0.7}
        onPress={onPress}
        >
            <View style={styles.icon}>
                {/* <Icon
                name='person'
                type='Ionicons'
                size={wp(6)}
                color={Colors.textSecondary}
                /> */}
                <Text style={styles.initial}>{initials}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textName}>{name}</Text>
                <Text style={[styles.textPhone, {marginBottom: hp(0.8)}]}>{phone}</Text>
                {
                    order && order>0 && <Text style={styles.textPhone}>{order} {order>1?'Orders':'Order'}</Text>
                }
                
            </View>
            <View style={{ alignSelf: 'center' }}>
                <Icon
                    name='chevron-small-right'
                    type='Entypo'
                    size={wp(7)}
                    color={Colors.textSecondary}
                />
            </View>

        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.surface,
        elevation: 1,
        padding: wp(3),
        borderRadius: wp(2),
        flexDirection: 'row',
        marginBottom:hp(2)
        //alignItems: 'center'
    },
    textContainer: {
        flex: 1,
        marginLeft: wp(3)
    },
    icon: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(6),
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    initial:{
        fontSize: fontSize.text,
        fontFamily: fonts.bold,
        color:Colors.surface,
        letterSpacing:2
    },
    textName: {
        fontFamily: fonts.medium,
        fontSize: fontSize.text,
        color: Colors.text,
        marginBottom: hp(0)
    },
    textPhone: {
        fontFamily: fonts.medium,
        fontSize: fontSize.smallText,
        color: Colors.textSecondary,
        
    }
});

//make this component available to the app
export default CustomerCard;
