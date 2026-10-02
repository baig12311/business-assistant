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
    
});
export default styles
