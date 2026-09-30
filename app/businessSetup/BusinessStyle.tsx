import { StyleSheet } from "react-native"
import Colors from "../../src/constants/colors"
import fonts, {fontSize} from "../../src/constants/typography"
import { widthPercentageToDP as wp,
    heightPercentageToDP as hp
 } from "react-native-responsive-screen"
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: wp(3),
    },
    scrollContainer:{
        paddingBottom: hp(6),
        flexGrow:1,
        //justifyContent: 'center',
    },
    button:{
        marginTop: hp(4)
    },
    heading:{
        fontFamily:fonts.bold,
        fontSize:fontSize.heading,
        color:Colors.text,
        marginBottom: hp(0.5)
    },
    sub:{
        fontFamily:fonts.regular,
        fontSize:fontSize.text,
        color:Colors.textSecondary,
        marginBottom:hp(4)
    },
    uploadImage:{
        width:wp(20),
        height: wp(20),
        borderRadius: wp(10),
        borderWidth: 1,
        borderColor: Colors.textSecondary,
        borderStyle:'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        //alignSelf: 'center',
       
    },
    image:{
        width:wp(20),
        height: wp(20),
        borderRadius: wp(10),
        //alignSelf: 'center',
        
    },
    logoContainer:{
        alignItems: 'center',
        marginBottom: hp(2)
    },
    uploadText:{
        fontFamily: fonts.regular,
        fontSize: fontSize.smallText,
        color: Colors.textSecondary,
        marginTop: hp(0.5)
    }

})
export default styles
