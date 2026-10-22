
import { View, Text, StyleSheet} from 'react-native';
import Icon from '../common/Icon';
import Colors from '../../constants/colors';
import fonts, {fontSize} from '../../constants/typography';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface Props {
    paddingHorizontal?: number
    paddingVertical?: number
    iconName: string
    iconType: string
    mainText?: string
    subText?: string
    borderBottomWidth?: number
    status?: string
    isHelp?:boolean
    onPress?: () => void
}
const DeleteRow: React.FC<Props> = ({ paddingHorizontal,
    paddingVertical,
    iconName,
    iconType,
    mainText,
    subText,
    borderBottomWidth,
  
}) => {
    return (
        <View
        style={[styles.container, {
            paddingHorizontal: paddingHorizontal,
            paddingVertical: paddingVertical,
            borderBottomWidth: borderBottomWidth
        }]}>

            {/* <View style={styles.icon}> */}
                <Icon
                    name={iconName}
                    type={iconType}
                    size={wp(5.5)}
                    color={Colors.error}
                />
            {/* </View> */}
            <View style={styles.textContainer}>
                {/* <Text style={[styles.mainText, isDelete && {color: Colors.error}]}>{mainText}</Text> */}
                <Text style={styles.mainText}>{mainText}</Text>
                <Text style={styles.subtext}>{subText}</Text>

             

            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        //justifyContent: 'space-between',
        //alignItems: 'center',
        borderColor: Colors.textSecondary,
    },
    textContainer: {
        flex: 1,
        marginLeft: wp(4)
    },
    mainText: {
        fontFamily: fonts.bold,
        color: Colors.text,
        fontSize: fontSize.text
    },
    subtext: {
        fontFamily: fonts.medium,
        color: Colors.textSecondary,
        fontSize: fontSize.smallText
    },
   
    icon: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(6),
        backgroundColor: Colors.background,

        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(4)
    },
});

//make this component available to the app
export default DeleteRow;
