import { StyleSheet } from "react-native"
import Colors from "../../../src/constants/colors"
import fonts, { fontSize } from "../../../src/constants/typography"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen"
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: wp(3),
        justifyContent: 'center'
    },

    iconContainer: {
        width: wp(15),
        height: wp(15),
        borderRadius: wp(4),
        backgroundColor: Colors.successLight,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: hp(1),
    },
    title: {
        fontFamily: fonts.bold,
        fontSize: fontSize.heading,
        marginBottom: hp(1),
        color: Colors.text,
        textAlign: 'center'
    },
    description: {
        fontSize: fontSize.text,
        fontFamily: fonts.medium,
        color: Colors.textSecondary,
        marginBottom: hp(8),
        textAlign: 'center'

    },
    button: {
        marginTop: hp(6),
        marginBottom: hp(1)
    },
    emailCard: {
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: wp(2),
        padding: wp(3),
        marginBottom: hp(4),
    },
    emailLabel: {
        fontSize: fontSize.smallText,
        fontFamily: fonts.medium,
        color: Colors.textSecondary,
        marginBottom: hp(1),
    },
    emailText: {
        fontSize: fontSize.text,
        color: Colors.text,
        fontFamily: fonts.bold

    },
    message: {
        fontSize: 13,
        lineHeight: 19,
        marginBottom: 16,
    },
    
    backButton: {
        alignItems: 'center',
        paddingVertical: hp(1.5),
        marginTop: hp(1),
        marginBottom: hp(2)
    },
    backButtonText: {
        fontSize: fontSize.text,
        fontFamily: fonts.semiBold,
        color: Colors.primary,
    },
    footer: {
        fontSize: fontSize.smallText,
        color: Colors.textSecondary,
        textAlign: 'center',
    },


})
export default styles
