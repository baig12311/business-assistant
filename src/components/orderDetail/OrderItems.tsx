
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';
import { Image } from 'expo-image';
import fonts, { fontSize } from '../../constants/typography';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Icon from '../common/Icon';
interface Props{
    orderItem: any[]
}
const OrderItems:React.FC<Props>= ({orderItem}) => {
    
    return (
        <View style={styles.container}>
            <Row
            name='Product Name'
            qty='Qty'
            price='Price'
            />
            {
                orderItem.map((item, index)=>{
                    const unitPrice = item.unit_price
                    const subTotal = Number(unitPrice) * item.quantity
                    return(
                        <Row
                        key={index}
                        name={item.product?.name}
                        qty={item.quantity}
                        price={subTotal.toLocaleString()}
                        isLast={index === orderItem.length -1}
                        />
                    )
                })
            }

        </View>
    );
};
interface props{
    name:string
    qty?:string
    price:string
    isLast?:boolean
}
const Row:React.FC<props>=({name, qty, price, isLast})=>{
    return (
        <View style={[styles.row, !isLast && {borderBottomWidth:0.3}]}>
            <Text style={[styles.text, {flex:3}]}>{name}</Text>
            <Text style={[styles.text, {flex:1, textAlign: 'center'}]}>{qty}</Text>
            <Text style={[styles.text, {flex:1, textAlign: 'right'}]}>{price}</Text>
    </View>
    )
    
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.surface,
        elevation: 1,
        borderRadius: wp(2),
        padding: wp(2),
        marginBottom:hp(2)
        
    },
    row:{
        flexDirection: 'row',
        paddingVertical: hp(1),
        borderColor: Colors.textSecondary
    },
    text:{
        fontFamily: fonts.medium,
        fontSize: fontSize.text
    }
});

//make this component available to the app
export default OrderItems;
