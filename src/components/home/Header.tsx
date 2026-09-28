
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import fonts, { fontSize } from '../../constants/typography';
import Colors from '../../constants/colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Icon from '../common/Icon';
interface props {
    userName?: string
    business?: string
}
const Header: React.FC<props> = ({ userName, business }) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text} numberOfLines={1}>Good Afternoon, {userName}</Text>
                <Text>{business}</Text>
            </View>
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.icon}
            >
                <Icon
                    name='notifications-outline'
                    type='Ionicons'
                    size={wp(6)}
                    color={Colors.text}
                />
            </TouchableOpacity>


        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingVertical: hp(1),
        marginBottom: hp(2),
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent: ''
    },
    textContainer: {
        flex: 1,
        paddingRight: wp(5)
    },
    icon: {
        padding: wp(2),
        backgroundColor: Colors.surface,
        elevation: 1,
        borderRadius: wp(3)
    },
    text: {
        fontFamily: fonts.medium,
        fontSize: fontSize.text,
        color: Colors.text
    }
});

//make this component available to the app
export default Header;
