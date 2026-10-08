import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';

import fonts, { fontSize } from '../../constants/typography';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

interface Props {
    subTotal: string | number
    total: string | number
    discount: string | number
    change: string | number
    paid: string | number
}
const PriceSummaryCard: React.FC<Props> = ({ subTotal, total, paid, discount, change }) => {

    return (
        <View style={styles.container}>
            <Row
                title='SubTotal'
                info={subTotal.toLocaleString()}
                fontWeight={fonts.medium}
                fsize={fontSize.text}
            />
            <Row
                title='Discount'
                info={discount.toLocaleString()}
                fontWeight={fonts.medium}
                fsize={fontSize.text}
            />
            <Row
                title='Total'
                info={total.toLocaleString()}
                fontWeight={fonts.bold}
                fsize={fontSize.subHeading}
            />
            <Row
                title='Amount Paid'
                info={paid.toLocaleString()}
                fontWeight={fonts.medium}
                fsize={fontSize.text}
            />

        </View>
    );
};
interface props {
    title: string
    info: string
    fontWeight?:string
    fsize?:number
}
const Row: React.FC<props> = ({ title, info, fontWeight, fsize}) => {
    
    return (
        <View style={styles.row}>
            <Text style={{fontFamily: fontWeight, fontSize:fsize}}>{title}</Text>
            <Text  style={{fontFamily: fontWeight, fontSize:fsize}}>{info}</Text>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.surface,
        elevation: 1,
        borderRadius: wp(2),
        padding: wp(2),
        marginBottom:hp(4)

    },
    row: {
        flexDirection: 'row',
        paddingVertical: hp(0.5),
        borderColor: Colors.textSecondary,
        justifyContent: 'space-between'
    },
    
});

//make this component available to the app
export default PriceSummaryCard;
