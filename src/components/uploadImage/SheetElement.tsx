import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';
import fonts, {fontSize} from '../../constants/typography';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from '../common/Icon';
interface Props {
    Color: string
    bgColor: string
    iconName: string
    iconType: string
    title?: string
    onPress?: () => void
}

const SheetElement: React.FC<Props> = ({ onPress, bgColor, iconName, iconType, Color, title }) => {

    return (
        <TouchableOpacity
            style={[styles.container, { borderColor: Color }]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={[styles.icon, { backgroundColor: bgColor }]}>
                <Icon
                    name={iconName}
                    type={iconType}
                    color={Color}
                    size={wp(5)}
                />
            </View>
            <Text style={[styles.title, { color: Color }]}>{title}</Text>
            <Icon
                name='chevron-small-right'
                type='Entypo'
                size={wp(7)}
                color={Color}
            />
        </TouchableOpacity>

    );
};


const styles = StyleSheet.create({
    container: {
        borderRadius: wp(2),
        marginBottom: hp(1),
        padding: wp(2),
        borderWidth: 0.3,
        flexDirection: 'row',
        alignItems: 'center'

    },
    icon: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: fonts.medium,
        fontSize: fontSize.smallText,
        marginLeft: wp(3),
        flex: 1
    }

});

export default SheetElement;

