import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from './Icon';
import Colors from '../../constants/colors';
import fonts, { fontSize } from '../../constants/typography';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
interface props {
    title: string
    iconName:string
    iconType:string
    onPress?:()=>void
}
const ActionButton: React.FC<props> = ({ title, onPress, iconName, iconType}) => {
    return (
        <TouchableOpacity
        style={styles.container}
        activeOpacity={0.7}
        onPress={onPress}
        >
           <Icon
           name={iconName}
           type={iconType}
           size={wp(6)}
           color={Colors.surface}
           />
           <Text style={styles.text}>{title}</Text> 
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: wp(2),
        paddingHorizontal: wp(5),
        paddingVertical:wp(2),
        backgroundColor: Colors.primary,
        alignItems: 'center',
        elevation: 2,
        flexDirection: 'row',
        gap:8
    },
    text: {
        fontFamily: fonts.semiBold,
        fontSize: fontSize.text,
        color: Colors.surface
    }
});

//make this component available to the app
export default ActionButton;
