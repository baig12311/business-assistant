import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import fonts, {fontSize} from '../../constants/typography';
import { widthPercentageToDP as wp,
    heightPercentageToDP as hp
 } from 'react-native-responsive-screen';
 import Icon from '../common/Icon';
 interface props{
    bgColor?: string
    iconBgColor?:string
    iconName:string
    iconType:string
    color:string
    stock?:string | number
    threshold: string | number
    badge?:string
 }
const StockAlert:React.FC<props> = ({bgColor, iconBgColor, badge, color, iconName, iconType, stock, threshold}) => {
    return (
        <View style={[styles.container, 
        {backgroundColor: Colors.surface,
            borderColor: color
        }
    ]}>
            <View style={[styles.icon, {backgroundColor: iconBgColor}]}>
                <Icon
                name='package-variant-closed'
                type='MaterialDesignIcons'
                size={wp(8)}
                color={color}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Current Stock</Text>
                <Text style={styles.textSt}>{stock} pcs</Text>
                <Text style={styles.textThresh}>Low stock threshold: {threshold} pcs</Text>
            </View>
            <View style={[styles.badge, {backgroundColor: iconBgColor}]}>
                <Icon
                name={iconName}
                type={iconType}
                size={wp(5)}
                color={color}
                />
                <Text style={[styles.badgeText, {color:color}]}>{badge}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth:0.3,
        borderRadius: wp(2),
        padding: wp(3),
        flexDirection: 'row',
        marginBottom: hp(2)
    },
    textContainer:{
        flex:1,
        marginLeft: wp(3)
    },
    icon:{
        width: wp(12),
        height: wp(12),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(6)
    },
    badge:{
        flexDirection: 'row',
        gap:5,
        alignSelf: 'flex-start',
        paddingHorizontal: wp(2),
        paddingVertical: wp(0.5),
        borderRadius: wp(50)
    },
    badgeText:{
        fontFamily: fonts.medium,
        fontSize: fontSize.extraSmallText,
    },
    text:{
        fontFamily: fonts.medium,
        fontSize: fontSize.text,
        color: Colors.text,
    },
    textThresh:{
        fontFamily: fonts.medium,
        fontSize: fontSize.extraSmallText,
        color: Colors.textSecondary,
        
    },
    textSt:{
        fontFamily: fonts.bold,
        fontSize: fontSize.subHeading,
        color: Colors.text,
        marginBottom: hp(0.3)
    }
});

//make this component available to the app
export default StockAlert;
