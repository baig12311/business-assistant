import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../constants/colors';
import fonts, {fontSize} from '../../constants/typography';
import { widthPercentageToDP as wp, 
    heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface props{
    title:string
    onPress?:()=>void
}
const Button:React.FC<props> = ({title, onPress}) => {
    return (
        <TouchableOpacity 
        style={styles.container} 
        activeOpacity={0.7}
        onPress={onPress}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius:wp(2),
        height: hp(5.5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary
    },
    text:{
        fontFamily:fonts.semiBold,
        fontSize:fontSize.subHeading,
        color:Colors.background
    }
});

//make this component available to the app
export default Button;
