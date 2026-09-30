import { StyleSheet } from "react-native";
import fonts, { fontSize } from "../../src/constants/typography";
import Colors from "../../src/constants/colors";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: wp(3)
    },
    button:{
        marginTop: hp(4)
    },
    scrollContainer:{
        paddingBottom: hp(6),
        paddingTop:hp(0.5),
        flexGrow:1,
        //justifyContent: 'center',
    },
    heading:{
        fontFamily:fonts.extraBold,
        fontSize:fontSize.largeHeading,
        color:Colors.text,
        marginBottom:hp(4)
    },
    imageContainer:{
        borderWidth: 0.5,
        borderRadius:wp(3),
        borderColor: Colors.textSecondary,
        justifyContent: 'center',
        alignItems:'center',
        height: hp(20),
        marginBottom: hp(2)
    },
    selectImage:{
        width: wp(20),
        height: wp(20),
        borderRadius: wp(10),
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: Colors.textSecondary,
        marginBottom:hp(0.5),
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
        //backgroundColor: Colors.successLight
    },
    text:{
        fontFamily: fonts.medium,
        fontSize: fontSize.smallText,
        color:Colors.textSecondary
    },
    image:{
        width:wp(20),
        height: wp(20),
        borderRadius: wp(10),
        //alignSelf: 'center',
        
    },
    row: {
        flexDirection: 'row',
        marginVertical: hp(0.5)
    },
    rowText: {
        fontFamily: fonts.regular,
        fontSize: fontSize.smallText,
        marginLeft: wp(2)
    },
    subHeading:{
        fontFamily:fonts.medium,
        fontSize: fontSize.text,
        color:Colors.text,
        marginBottom:hp(4)
    }
});
export default styles