
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../common/Icon';
import Colors from '../../constants/colors';
import fonts, { fontSize } from '../../constants/typography';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface Props {
    name: string
    email?: string
}
const ProfileInfoCard: React.FC<Props> = ({ name, email }) => {
    const initials = name
        .trim()
        .split(' ')
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <Text style={styles.initials}>{initials}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.mainText}>{name}</Text>
                <Text style={styles.subtext}>{email}</Text>
                <View style={styles.tag}>
                    <Text style={styles.tagText}>Business Owner</Text>
                </View>
                
            </View>
            {/* <Icon
                name='chevron-small-right'
                type='Entypo'
                size={wp(7)}
                color={Colors.textSecondary}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        //justifyContent: 'space-between',
        //alignItems: 'center',
        borderColor: Colors.border,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        padding: wp(3),
        borderRadius: wp(2),
        marginBottom: hp(2)
    },
    textContainer: {
        flex: 1
    },
    mainText: {
        fontFamily: fonts.bold,
        color: Colors.text,
        fontSize: fontSize.subHeading,
        //marginBottom: hp(0.5)
    },
    subtext: {
        fontFamily: fonts.medium,
        color: Colors.textSecondary,
        fontSize: fontSize.smallText,
        marginBottom: hp(1)
    },

    icon: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(6),
        backgroundColor: Colors.primary,

        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(4)
    },
    initials: {
        fontFamily: fonts.bold,
        fontSize: fontSize.subHeading,
        color: Colors.surface,
        letterSpacing: 2
    },
    tag:{
        backgroundColor: Colors.successLight,
        borderRadius: wp(50),
        paddingHorizontal: wp(3),
        paddingVertical: wp(1),
        alignSelf: 'flex-start'
    },
    tagText:{
        fontFamily: fonts.medium,
        color: Colors.primary,
        fontSize: fontSize.smallText,
    }
});

//make this component available to the app
export default ProfileInfoCard;
