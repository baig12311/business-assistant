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
   
});
export default styles