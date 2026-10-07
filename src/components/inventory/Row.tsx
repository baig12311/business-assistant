import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import fonts, { fontSize } from '../../constants/typography';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Icon from '../common/Icon';
interface props {
    title: string
    info: string
    currency: string
}
const Row: React.FC<props> = ({ title, info, currency }) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, { fontFamily: fonts.semiBold, width: wp(25) }]}>{title}</Text>
            <Text style={[styles.text, { fontFamily: fonts.semiBold }]}>:</Text>
            <Text style={[styles.text, { fontFamily: fonts.medium, marginLeft: wp(3) }]}>{currency} {info}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: hp(0.3)

    },
    text: {
        fontSize: fontSize.smallText,
        color: Colors.text
    }
});

//make this component available to the app
export default Row;
