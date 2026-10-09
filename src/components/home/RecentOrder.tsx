import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';
import { Image } from 'expo-image';
import fonts, { fontSize } from '../../constants/typography';
import Icon from '../common/Icon';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
interface props{
    cName?:string
    order?:number
    amount?:string | number
    currency?:string
    onPress?:()=>void
}
const RecentOrder:React.FC<props> = ({cName, order, amount, currency, onPress}) => {
    return (
        <TouchableOpacity 
        style={styles.container}
        activeOpacity={0.7}
        onPress={onPress}
        >
            <Text style={[styles.text]}>#{order}</Text>
            <Text style={[styles.text, {flex:2, marginLeft: wp(3)}]}>{cName}</Text>
            <Text style={[styles.text]}>{currency} {amount}</Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        borderBottomWidth: 0.3,
        borderColor: Colors.textSecondary,
        paddingVertical: hp(1.5)
    },
    text:{
        fontFamily: fonts.medium,
        fontSize: fontSize.smallText,
        color: Colors.text
    }
});

//make this component available to the app
export default RecentOrder;
