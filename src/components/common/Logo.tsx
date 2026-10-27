
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Colors from '../../constants/colors';
import fonts, {fontSize} from '../../constants/typography';
import { widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
const Logo = () => {
    return (
        <View style={styles.container}>
            <Image
        style={styles.logo}
        source={require('../../../assets/appAssets/logo.png')}
        />
        <Text style={styles.text}>Shop
            <Text style={{color: Colors.success}}>Sphere</Text>
            </Text>
        </View>
        
    );
};


const styles = StyleSheet.create({
    container:{
        marginBottom: hp(3),
    },
    logo: {
        width: wp(30),
        height: wp(30),
        alignSelf: 'center',
    },
    text:{
        fontSize: fontSize.subHeading,
        fontFamily: fonts.extraBold,
        color: Colors.primaryDark,
        textAlign: 'center',
        marginTop: hp(-1),
    }
});
export default Logo;
