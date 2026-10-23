import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';
import Icon from '../common/Icon';
import fonts, { fontSize } from '../../constants/typography';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
interface props{
    iconName:string
    text:string
    onPress:()=>void
}
const ActionButton:React.FC<props> = ({iconName,text, onPress}) => {
    return (
        <TouchableOpacity 
        activeOpacity={0.7}
        style={styles.container}
        onPress={onPress}
        >
            <Icon
            name={iconName}
            type='Ionicons'
            color={Colors.surface}
            size={wp(5)}
            />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height: hp(4),
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        gap:5,
        alignItems: 'center',
        borderRadius: wp(2),
        justifyContent: 'center',
    },
    text:{
        fontFamily: fonts.semiBold,
        fontSize: fontSize.text,
        color: Colors.surface
    }
});

//make this component available to the app
export default ActionButton;
