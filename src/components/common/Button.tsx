import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Colors from '../../constants/colors';
import fonts, { fontSize } from '../../constants/typography';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
interface props {
    title: string
    onPress?: () => void
    isLoading?: boolean
}
const Button: React.FC<props> = ({ title, onPress, isLoading }) => {
    return (
        <TouchableOpacity
            style={[styles.container, isLoading&&{backgroundColor: Colors.textMuted}]}
            activeOpacity={0.7}
            onPress={onPress}
            disabled={isLoading}
        >
            {
                isLoading ? (<ActivityIndicator size='small' color={Colors.primary} />) : (
                    <Text style={styles.text}>{title}</Text>

                )
            }
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: wp(2),
        height: hp(5.5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        elevation:2
    },
    text: {
        fontFamily: fonts.semiBold,
        fontSize: fontSize.subHeading,
        color: Colors.background
    }
});

//make this component available to the app
export default Button;
