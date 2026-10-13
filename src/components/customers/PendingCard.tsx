
import { View, Text, StyleSheet } from 'react-native';
import Button from '../common/Button';
import Colors from '../../constants/colors';
import Icon from '../common/Icon';
import fonts, { fontSize } from '../../constants/typography';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
interface props{
    pending?: string | number
    onPress?:()=>void
}
const PendingCard:React.FC<props> = ({pending, onPress}) => {
    return (
        <View style={styles.container}>
            <View style={styles.Header}>
                <View style={styles.icon}>
                    <Icon
                    name='wallet-outline'
                    type='Ionicons'
                    size={wp(5.5)}
                    color={Colors.primary}
                    />
                </View>
                <Text style={[styles.outText, {color:Colors.text}]}>Outstanding Balance</Text>
            </View>
            <Text style={styles.pend}>{pending}</Text>
            <Text style={[styles.outText, {color:Colors.textSecondary, marginBottom: hp(2)}]}>Amount Pending from this customer</Text>
            <Button
            title='Receive Payment'
            onPress={onPress}
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        borderWidth:1,
        //backgroundColor: Colors.textMuted,
        borderColor: Colors.border,
        padding:wp(3),
        borderRadius: wp(2),
        marginBottom: hp(2)
    },
    icon:{
        width: wp(10),
        height: wp(10),
        backgroundColor:Colors.successLight,
        borderRadius: wp(5),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(3)
    },
    Header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    outText:{
        fontFamily: fonts.medium,
        fontSize: fontSize.text
    },
    pend:{
        fontFamily: fonts.extraBold,
        fontSize: fontSize.largeHeading,
        color: Colors.text
    }
});

//make this component available to the app
export default PendingCard;
