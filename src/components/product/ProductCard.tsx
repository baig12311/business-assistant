import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import { Image } from 'expo-image';
import fonts, { fontSize } from '../../constants/typography';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
interface props {
    name?: string
    stock?: number
    price?: number
    lowStock?: number
    currency?: string
    imageurl?:string
}
const ProductCard: React.FC<props> = ({ name, stock, price, lowStock, currency,imageurl}) => {
    const stockValue = Number(stock)
    const lowStockValue = Number(lowStock)
    const isStockLow = stockValue <= lowStockValue
    const isStockOut = stockValue <= 0
    return (
        <View style={styles.container}>
            
            <Image 
            style={styles.image}
            source={{uri:imageurl}}
            contentFit='cover'
            onError={(error) => {
        console.log('IMAGE LOAD ERROR:', error);
    }}
            />
            <View style={styles.content}>
                <Text style={[styles.name, { color: Colors.text }]}>{name}</Text>
                <Text style={[styles.name, { marginBottom: hp(0.5), color: Colors.text }]}>
                    {currency} {price?.toLocaleString()}
                </Text>
                <View style={styles.bottom}>
                    <Text style={[styles.name, { color: Colors.textSecondary, fontFamily: fonts.regular }]}>
                        stock: {stock}</Text>
                    <Text style={[styles.badge,
                    isStockOut ? styles.outStock : isStockLow ? styles.lowBadge : styles.stockBadge
                    ]}>{isStockOut ? 'Out of Stock' : isStockLow ? 'Low Stock' : 'In Stock'}</Text>
                </View>
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
        elevation: 1
    },
    image: {
        borderWidth: 0.3,
        width: wp(15),
        height: wp(15),
        borderRadius: wp(2),
        borderColor: Colors.textMuted,
        overflow: 'hidden'
    },
    content: {
        marginLeft: wp(3),
        flex: 1
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        fontFamily: fonts.medium,
        fontSize: fontSize.text,
    },
    badge: {
        fontFamily: fonts.regular,
        fontSize: fontSize.extraSmallText,
        borderRadius: wp(50),
        paddingHorizontal: wp(2)
    },
    lowBadge: {
        color: Colors.warning,
        backgroundColor: Colors.warningLight
    },
    stockBadge: {
        color: Colors.success,
        backgroundColor: Colors.successLight
    },
    outStock:{
        color:Colors.error,
        backgroundColor:Colors.errorLight
    }
});

//make this component available to the app
export default ProductCard;
