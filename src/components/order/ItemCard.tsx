import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';
import { Image } from 'expo-image';
import fonts, { fontSize } from '../../constants/typography';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Icon from '../common/Icon';
interface props {
    name?: string
    stock: number
    price?: number
    lowStock?: number
    currency?: string
    imageurl?: string,
    //menuOpen?: boolean
    // onMenuPress?: () => void
    // onPressEdit?:()=>void
    // onPressDelete?:()=>void
}
const ItemCard: React.FC<props> = ({ name, stock, price, currency,
    imageurl, }) => {
    const [quantity, setQuantity] = useState(1)
    return (
        <View style={styles.container}>

            <Image
                style={styles.image}
                source={{ uri: imageurl }}
                contentFit='cover'
            />
            <View style={styles.content}>

                <Text style={styles.name}>{name}</Text>



                <Text style={styles.price}>
                    {currency} {price?.toLocaleString()}
                </Text>

            </View>
            <View style={styles.quantityControls}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.button}
                    onPress={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                    <Icon
                        name="minus"
                        type="Entypo"
                        size={wp(5)}
                        color={Colors.text}
                    />
                </TouchableOpacity>

                <Text
                    style={styles.quantityText}
                    numberOfLines={1}

                >{quantity}</Text>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.button}
                    onPress={() => setQuantity((prev) => Math.min(stock, prev + 1))}
                >

                    <Icon
                        name="plus"
                        type="Entypo"
                        size={wp(5)}
                        color={Colors.text}
                    />
                </TouchableOpacity>

            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.surface,
        flexDirection: 'row',
        padding: wp(3),
        borderRadius: wp(3),
        alignItems: 'center',
        marginBottom: hp(2),
        elevation: 1,
        position: 'relative',
    },
    image: {
        borderWidth: 0.3,
        width: wp(12),
        height: wp(12),
        borderRadius: wp(2),
        borderColor: Colors.textMuted,
        overflow: 'hidden'
    },
    content: {
        marginLeft: wp(3),
        flex: 1,
        //justifyContent: 'space-between'
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        fontFamily: fonts.medium,
        fontSize: fontSize.text,
    },
    price: {
        fontFamily: fonts.medium,
        fontSize: fontSize.smallText
    },
    quantityControls: {
        flexDirection: 'row'
    },
    controlText: {
        fontFamily: fonts.bold,
        fontSize: fontSize.heading,
        color: Colors.text,
        borderWidth: 1,
        //alignSelf: 'center'
        //textAlignVertical:'center'
    },
    button: {
        width: wp(10),
        height: wp(8),
        borderRadius: wp(2),
        borderWidth: 0.5,
        borderColor: Colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: wp(1)
    },
    quantityText: {
        fontFamily: fonts.medium,
        fontSize: fontSize.text,
        textAlignVertical: 'center',
        textAlign: 'center',
        color: Colors.text,
        //borderWidth:0.5,
        width: wp(8)
    }

});

//make this component available to the app
export default ItemCard;
