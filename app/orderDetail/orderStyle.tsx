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
    sectionTitle:{
        fontFamily: fonts.bold,
        fontSize: fontSize.subHeading,
        color:Colors.text,
        marginBottom: hp(0.5)
    },
    buttonContainer:{
        paddingVertical: hp(2)
    },
    orderTrackcontainer: {
        width: '100%',
        padding: wp(4),
        borderRadius: wp(3),
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.surface,
        elevation: 1,
    },
    buttonOutline:{
        width: wp(45),
        alignSelf: 'center',

    }
    
});

export default styles;