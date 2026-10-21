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
    },
    content: {
        flex: 1,
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
        marginBottom: hp(4),
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
        marginBottom: hp(1),
        textAlign: 'center'

    },
    description2: {
        fontSize: fontSize.text,
        fontFamily: fonts.medium,
        color: Colors.textSecondary,
        marginBottom: hp(8),
        textAlign: 'center'

    },
    button: {
        marginTop: hp(6),
        marginBottom: hp(2)
    },

    rememText: {
        fontSize: fontSize.text,
        fontFamily: fonts.medium,
        color: Colors.textSecondary,
        textAlign: 'center'
    },
    textPress: {
        fontSize: fontSize.text,
        fontFamily: fonts.bold,
        color: Colors.primary,
    }

})
export default styles
