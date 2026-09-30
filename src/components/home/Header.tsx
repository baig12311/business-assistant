
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
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
    imageurl?:string
}
const Header: React.FC<props> = ({ userName, business, imageurl}) => {
    return (
        <View style={styles.container}>
            {
                imageurl && (
                    <Image
            style={styles.logo}
            source={{uri:imageurl}}
            />
                )
            }
            
            <View style={styles.textContainer}>
                <Text style={styles.text} numberOfLines={1}>Good Afternoon, {userName}</Text>
                <Text style={styles.text}>{business}</Text>
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
        borderBottomWidth:0.5,
        borderColor:Colors.border
        //justifyContent: ''
    },
    textContainer: {
        flex: 1,
        paddingRight: wp(5),
        marginLeft: wp(3)
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
    },
    logo:{
        width: wp(14),
        height: wp(14),
        borderRadius:wp(7)
    }
});

//make this component available to the app
export default Header;
