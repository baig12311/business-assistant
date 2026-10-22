import { StyleSheet } from "react-native";
import Colors from "../../../src/constants/colors";
import fonts, {fontSize} from "../../../src/constants/typography";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: wp(3),
    },
    section: {
        borderColor: Colors.border,
        borderWidth:1,
        borderRadius: wp(2),
        padding: wp(3),
        marginBottom: hp(2),
        //elevation: 1
    },
    subHeading: {
        fontFamily: fonts.medium,
        fontSize: fontSize.text,
        color: Colors.textSecondary,
        marginBottom: hp(4)
    },
     buttonContainer:{
        paddingVertical: hp(2),
    },
    scrollContainer:{
        paddingBottom: hp(6),
        flexGrow:1,
       
    },
    heading:{
        fontFamily:fonts.extraBold,
        fontSize:fontSize.subHeading,
        color:Colors.text
    },
    
});

export default styles;