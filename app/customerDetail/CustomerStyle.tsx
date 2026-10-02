import { StyleSheet } from "react-native";
import Colors from "../../src/constants/colors";
import { widthPercentageToDP as wp, 
    heightPercentageToDP as hp
 } from "react-native-responsive-screen";
import fonts, { fontSize } from "../../src/constants/typography";
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: Colors.background,
        padding:wp(3)
    },
    scrollContainer: {
        paddingBottom: hp(4),
        paddingTop:hp(0.5),
        flexGrow: 1
    },
    nameText:{
        fontFamily: fonts.semiBold,
        fontSize: fontSize.subHeading,
        color: Colors.text,
        marginBottom: hp(1)
    },
    infoContainer:{
        flexDirection: 'row',
        marginBottom: hp(2)
    },
    avatar:{
        width: wp(14),
        height: wp(14),
        borderRadius: wp(7),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary
    },
    initials:{
        fontFamily: fonts.bold,
        fontSize: fontSize.subHeading,
        color:Colors.surface,
        letterSpacing:2
    },
    infoTextContainer:{
        marginLeft: wp(5)
    },
    menu:{
        position: 'absolute',
        //height: wp(20),
        right:wp(3),
        backgroundColor: Colors.surface,
        elevation:2,
        paddingHorizontal: wp(5),
        paddingVertical:wp(3),
        borderRadius: wp(2),
        top:hp(4),
        zIndex:99
    },
    row: {
        flexDirection: 'row',
        marginVertical: hp(0.5),
        
    },
    rowText: {
        fontFamily: fonts.regular,
        fontSize: fontSize.smallText,
        marginLeft: wp(2)
    },
    dashboard:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom:hp(2)
    }
});
export default styles