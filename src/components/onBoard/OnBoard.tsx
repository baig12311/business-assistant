import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { onBoardType } from '../../types/onBoardType';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import fonts, { fontSize } from '../../constants/typography';
import Colors from '../../constants/colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
// interface props{
//     image?:any
//     mainText:string
//     subText:string
// }
const OnBoard = ({ image, mainText, subText }: onBoardType) => {
    return (
        <View style={styles.container}>

            <Image
                source={image}
                style={styles.image}
                contentFit="contain"
            />

            <Text style={styles.main}>{mainText}</Text>
            <Text style={styles.sub}>{subText}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(4)
    },

    image: {
        width: wp(110),
        height: hp(50),
        opacity: 0.7,
        alignSelf: 'center'
    },
    main: {
        fontFamily: fonts.extraBold,
        fontSize: fontSize.largeHeading,
        color: Colors.text,
        textAlign: 'center',
        marginBottom: hp(5)
    },
    sub: {
        fontFamily: fonts.semiBold,
        fontSize: fontSize.text,
        color: Colors.textSecondary,
        textAlign: 'center'

    }
});

export default OnBoard;
