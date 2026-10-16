
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';
import fonts, {fontSize} from '../../constants/typography';
import Icon from '../common/Icon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface Props{
    onPress?:()=>void
}
const SignOut:React.FC<Props> = ({onPress}) => {
    return (
       
            <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={onPress}>
                <View style={styles.icon}>
                    <Icon
                    name='log-out-outline'
                    type='Ionicons'
                    size={wp(7)}
                    color={Colors.error}
                />
                </View>
                
                <Text style={styles.text}>Log Out</Text>
            </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
         borderRadius: wp(2),
        alignItems: 'center',
        flexDirection: 'row',
        borderColor:Colors.border,
       height: hp(5.5),
        paddingLeft:wp(2),
        borderWidth:1,
        marginTop:hp(2)
    },
    text: {
        fontFamily: fonts.bold,
        fontSize: wp(4.5),
        color: Colors.error,
        textAlign: 'center'
    },
    icon:{
        position:'absolute',
        left:wp(2)
    }
});

//make this component available to the app
export default SignOut;
