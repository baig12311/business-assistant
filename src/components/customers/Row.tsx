
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import Icon from '../common/Icon';
import fonts, { fontSize } from '../../constants/typography';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
interface props{
    iconName:string
    iconType:string
    rowTitle?:string
}
const Row:React.FC<props> = ({iconName, iconType, rowTitle}) => {
    return (
        <View style={styles.container}>
            <Icon
            name={iconName}
            type={iconType}
            color={Colors.textSecondary}
            size={wp(5)}
            />
            <Text style={styles.title}>{rowTitle}</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:hp(0.5)
    },
    title:{
        fontSize: fontSize.text,
        fontFamily:fonts.medium,
        color: Colors.textSecondary,
        marginLeft: wp(3)
    }
});

//make this component available to the app
export default Row;
