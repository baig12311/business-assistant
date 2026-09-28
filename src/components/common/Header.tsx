import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import fonts, { fontSize } from '../../constants/typography';
import Colors from '../../constants/colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Icon from '../common/Icon';
interface props{
    title:string
    onPress?:()=>void
}
const Header:React.FC<props> = ({title, onPress}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
            activeOpacity={0.7} 
            style={styles.icon}
            onPress={onPress}
            >
                <Icon 
                name='arrow-back'
                type='MaterialIcons'
                size={wp(7)}
                color={Colors.text}
                />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            </View>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingVertical: hp(1),
        marginBottom: hp(2),
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        paddingRight: wp(2),
        marginRight: wp(5)
    },
    title:{
        fontFamily: fonts.bold,
        fontSize: fontSize.subHeading,
        color:Colors.text
    }
});

//make this component available to the app
export default Header;
