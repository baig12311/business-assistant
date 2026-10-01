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
    }
});
export default styles
