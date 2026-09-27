import { StyleSheet } from "react-native"
import Colors from "../../../src/constants/colors"
import fonts, {fontSize} from "../../../src/constants/typography"
import { widthPercentageToDP as wp,
    heightPercentageToDP as hp
 } from "react-native-responsive-screen"
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: wp(3),
    },
    heading:{
        fontFamily:fonts.extraBold,
        fontSize:fontSize.largeHeading,
        color:Colors.text
    },
    subHeading:{
        fontFamily:fonts.medium,
        fontSize:fontSize.text,
        color:Colors.textSecondary,
        marginBottom:hp(4)
    },
    forgotText:{
        fontFamily:fonts.regular,
        fontSize:fontSize.smallText,
        color:Colors.primary,
        marginBottom:hp(4),
        alignSelf:'flex-end',
        textDecorationLine: 'underline'
    },
    newText:{
        fontFamily:fonts.medium,
        fontSize:fontSize.text,
        color:Colors.textSecondary,
        textAlign: 'center',
        marginTop:hp(1.5)
    },
    sign:{
        color: Colors.primary,
        fontFamily:fonts.semiBold
    },
    button:{
        marginTop: hp(4)
    },
    scrollContainer:{
        paddingBottom: hp(6),
        flexGrow:1,
        justifyContent: 'center',
    }

})
export default styles
