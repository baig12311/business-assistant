
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';
import Icon from '../common/Icon';
import fonts, { fontSize } from '../../constants/typography';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
interface props{
    date?:any
    orderNumber?:string
    amount:any
    credit: any
}
const CustomerOrderCard:React.FC<props> = ({date, orderNumber, amount, credit}) => {
    const formatDate = new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.order}>Order # {orderNumber}</Text>
                <Text style={styles.date}>{formatDate}</Text>
                <Text style={styles.date}>{credit}</Text>
            </View>
            <Text style={styles.order}>{amount}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        borderRadius:wp(2),
        padding:wp(3),
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        backgroundColor: Colors.surface,
        elevation:1,
        marginBottom:hp(2),
       
    },
    textContainer:{
        flex:1,
        marginLeft: wp(3)
    },
    order:{
        fontFamily:fonts.bold,
        fontSize: fontSize.text,
        color:Colors.text,
        marginBottom: hp(1)
    },
    date:{
        fontFamily:fonts.medium,
        fontSize:fontSize.smallText,
        color:Colors.textSecondary
    }
});

//make this component available to the app
export default CustomerOrderCard;
