import { StyleSheet } from "react-native";
import fonts, {fontSize} from "../../src/constants/typography";
import Colors from "../../src/constants/colors";
import { widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: wp(3)
    },
    scrollContainer: {
        paddingBottom: hp(4),
        paddingTop:hp(0.5),
        flexGrow: 1
    },
    slectCustomer:{
        borderRadius: wp(2),
        elevation: 1,
        padding: wp(2),
        backgroundColor: Colors.surface,
        marginBottom:hp(2)
    },
    customerText:{
        fontFamily: fonts.medium,
        fontSize: fontSize.text,
        color: Colors.text,
        marginBottom: hp(1)
    },
    addButton:{
        height: hp(5),
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    textButton:{
        color:Colors.primary,
        fontSize: fontSize.text,
        fontFamily: fonts.medium,
        marginLeft: wp(2)
    },
    summaryRow:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: hp(1),
        borderColor: Colors.textSecondary,
    },
    input:{
        borderWidth:0.3,
        borderColor: Colors.textSecondary,
        paddingHorizontal: wp(2),
        borderRadius: wp(2),
        width: '40%',
        alignSelf: 'flex-end',
        backgroundColor: Colors.surface,
        fontFamily: fonts.medium,
        fontSize: fontSize.text,
        color: Colors.text,
    },
    summaryText:{
        fontFamily: fonts.medium,
        fontSize: fontSize.text,
        color: Colors.textSecondary,
    },
    totalText:{
        fontFamily: fonts.bold,
        fontSize: fontSize.text,
        color: Colors.text,
    },
    searchRow:{
        flexDirection: 'row',
        marginBottom: hp(2),
        //alignItems: 'center',
    },
    buttonAdd:{
        width: wp(11),
        height: hp(5.5),
        borderRadius: wp(2),
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: wp(5),
        alignSelf: 'flex-end'
    },
    summaryContainer:{
        padding: wp(3),
        borderRadius: wp(2),
        backgroundColor: Colors.surface,
        elevation: 1,
        marginBottom: hp(2)
    },
    titleText:{
        fontFamily: fonts.bold,
        fontSize: fontSize.text,
        color: Colors.text,
        marginBottom: hp(0.5)
    },
    titleTextCurrency:{
        fontFamily: fonts.medium,
        fontSize: fontSize.extraSmallText,
        color: Colors.textSecondary,
    },
    button:{
        marginTop: hp(4),
        marginBottom: hp(2)
    },
});
export default styles
