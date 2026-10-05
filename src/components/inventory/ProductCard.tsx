import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import { Image } from 'expo-image';
import fonts, { fontSize } from '../../constants/typography';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
interface props {
    title?: string
    stock?: number
    imageurl?: string
    lowStock?: string,
    isLast?: boolean
}
const ProductCard: React.FC<props> = ({ title, stock, imageurl, lowStock, isLast }) => {
    const stockValue = Number(stock)
    const lowStockValue = Number(lowStock)
    const isStockLow = stockValue <= lowStockValue
    const isStockOut = stockValue <= 0
    return (
        <View style={[styles.container, !isLast && { borderBottomWidth: 0.3 }]}>
            {/* <View style={{borderWidth:1,flex:1}}> */}
            <Image
                source={{ uri: imageurl }}
                style={styles.image}
            />
            {/* </View> */}

            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                {/* <Text style={styles.text}>{stock}</Text> */}
                <View style={styles.stockContainer}>

                    <Text style={styles.text}>stock: {Number(stock) <= 999 ? stock : '999+'}</Text>



            <Text style={[styles.badgeText,
            isStockOut ? styles.outStock : isStockLow ? styles.lowBadge : styles.stock
            ]}>{isStockOut ? 'Out of Stock' : isStockLow ? 'Low Stock' : 'In Stock'}</Text>
                </View>
            </View>

            


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //borderWidth:0.5,
        padding: wp(2),
        flexDirection: 'row',
        alignItems: 'center',
        //borderColor: Colors.surface,
        backgroundColor: Colors.surface,
        borderRadius: wp(2),
        elevation:1,
        marginBottom: hp(2)
    },
    title: {
        fontFamily: fonts.medium,
        fontSize: fontSize.text,
        color: Colors.text,
        //marginBottom: hp(1)
    },
    text: {
        fontFamily: fonts.medium,
        fontSize: fontSize.text,
        color: Colors.textSecondary,

    },
    image: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(2)
    },
    textContainer: {
        flex: 1,
        marginLeft: wp(3),
        //width: '50%'
    },
    badgeText: {
        fontSize: fontSize.extraSmallText,
        fontFamily: fonts.regular,
        paddingVertical: wp(1),
        borderWidth: 1,
        borderRadius: wp(2),
        width: wp(22),
        textAlign: 'center',
        marginLeft: wp(3)
        //flex:1
    },
    outStock: {
        color: Colors.error,
        borderColor: Colors.error
    },
    lowBadge: {
        color: Colors.warning,
        borderColor: Colors.warning
    },
    stock: {
        color: Colors.success,
        borderColor: Colors.success
    },
    stockContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

//make this component available to the app
export default ProductCard;
