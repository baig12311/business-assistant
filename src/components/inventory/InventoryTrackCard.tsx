import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import fonts, {fontSize} from '../../constants/typography';
import Icon from '../common/Icon';
import { widthPercentageToDP as wp,
    heightPercentageToDP as hp
 } from 'react-native-responsive-screen';
 interface props{
    title?:string
    text?:number
    bgColor?:string
    color:string
    iconName:string
    iconType:string
 }
const InventoryTrackCard:React.FC<props> = ({title, text, bgColor, 
    color, iconName, iconType}) => {
    return (
        <View style={[styles.container, {backgroundColor: bgColor,
            borderColor: color
        }]}>
            <View style={styles.row}>
                <Icon
                name={iconName}
                type={iconType}
                size={wp(5)}
                color={color}
                />
                <Text style={[styles.title, {color:color}]}>{title}</Text>
            </View>
            
            <Text style={[styles.text, {color: color}]}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth:0.5,
        padding:wp(2),
        borderRadius: wp(2),
        elevation:1
    },
    title:{
        fontFamily: fonts.medium,
        fontSize: fontSize.text,
        marginLeft: wp(1)
        //color: Colors.textSecondary,
        //marginBottom: hp(1)
    },
    text:{
        fontFamily: fonts.semiBold,
        fontSize: fontSize.subHeading,
        alignSelf: 'flex-end'
        //color: Colors.textSecondary,
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center',
        
    }
});

//make this component available to the app
export default InventoryTrackCard;
