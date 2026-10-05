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
    scrollContainer: {
        paddingBottom: hp(4),
        paddingTop: hp(0.5),
        flexGrow: 1
    },
    invoiceContainer: {
        width: wp(80),
        alignSelf: 'center',
        backgroundColor: Colors.surface,
        padding: wp(3),
        //elevation: 3
    },
    invoice: {
        padding: wp(3),
        borderStyle: 'dashed',
        borderWidth: 1.5,
        borderRadius: wp(2),
        borderColor: Colors.textSecondary,
        //backgroundColor: Colors.error
    },
    invoiceTable: {
        paddingTop: hp(2),
        paddingBottom: hp(0.5),
        borderTopWidth: 1,
        borderColor: Colors.textSecondary,
        borderBottomWidth: 1,
        borderStyle: 'dashed',
        marginBottom: hp(2)
    },
    invoiceNumber: {
        fontFamily: fonts.bold,
        fontSize: fontSize.subHeading,
        color: Colors.text,
    },
    time: {
        fontFamily: fonts.medium,
        fontSize: fontSize.smallText,
        color: Colors.textSecondary,
        marginBottom: hp(2)
    },
    businessName: {
        textAlign: 'center',
        marginBottom: hp(1)
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: hp(1)
    },
    textPrice: {
        fontFamily: fonts.medium,
        fontSize: fontSize.text
    },
    totalContainer: {
        borderBottomWidth: 1,
        borderStyle: 'dashed',
        paddingBottom: hp(1),
        marginBottom: hp(2),
        borderColor: Colors.textSecondary,
    },
    txtThank: {
        fontFamily: fonts.semiBold,
        fontSize: fontSize.text,
        color: Colors.text,
        textAlign: 'center'
    },
    visit: {
        fontFamily: fonts.medium,
        fontSize: fontSize.text,
        color: Colors.textSecondary,
        textAlign: 'center'
    }

});
export default styles
