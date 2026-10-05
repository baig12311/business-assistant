import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import fonts, { fontSize } from '../../constants/typography';
import Colors from '../../constants/colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Icon from '../common/Icon';
interface props {
    title: string
    onPress?: () => void
    isMenu?: boolean
    onPressMenu?: () => void
    noBack?:boolean
}
const Header: React.FC<props> = ({ noBack, title, onPress, onPressMenu, isMenu }) => {
    return (
        <View style={styles.container}>
            {
                !noBack && (
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
                )
            }
            
            <Text style={styles.title}>{title}</Text>
            {
                isMenu && (
                    <TouchableOpacity
                activeOpacity={0.7}
                style={styles.menu}
                onPress={onPressMenu}
            >
            <Icon
                name='dots-three-vertical'
                type='Entypo'
                size={wp(5)}
                color={Colors.text}
            />
            </TouchableOpacity>
                )
            }
            
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
    title: {
        fontFamily: fonts.bold,
        fontSize: fontSize.subHeading,
        color: Colors.text,
        flex:1
    },
    menu:{
        paddingLeft:wp(2)
    }
});

//make this component available to the app
export default Header;
