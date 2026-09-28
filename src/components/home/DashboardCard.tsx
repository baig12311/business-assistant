import { View, Text, StyleSheet } from 'react-native';
import fonts, { fontSize } from '../../constants/typography';
import Colors from '../../constants/colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Icon from '../common/Icon';
interface props{
    title:string
    info?:string
}
const DashboardCard:React.FC<props> = ({ title, info}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>{title}</Text>
            <Text style={styles.textInfo}>{info}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.surface,
        elevation:1,
        padding: wp(3),
        borderRadius: wp(3),
        //flex:1
        width: '48%'
    },
    textTitle:{
        fontFamily:fonts.medium,
        fontSize: fontSize.text,
        color: Colors.textSecondary,
        marginBottom: hp(1)
    },
    textInfo:{
        fontFamily:fonts.semiBold,
        fontSize: fontSize.heading,
        color: Colors.text,
    }
});

export default DashboardCard;
