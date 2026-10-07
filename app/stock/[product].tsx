import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './style';
import { router } from 'expo-router';
import Icon from '../../src/components/common/Icon';
import { useProductById } from '../../src/hooks/useProducts';
import { useUser } from '../../src/hooks/useUser';
import { useBusiness } from '../../src/hooks/useBusiness';
import { useLocalSearchParams } from 'expo-router';
import { restockSchema } from '../../src/services/schema/restockSchema';
import { useRestockProduct } from '../../src/hooks/useRestockProduct';
import RestockModal from '../../src/components/inventory/RestockModal';
import ActionButton from '../../src/components/inventory/ActionButton';
import Colors from '../../src/constants/colors';
import Header from '../../src/components/common/Header';
import StockAlert from '../../src/components/inventory/StockAlert';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { success } from 'zod';
import { Image } from 'expo-image';
import Row from '../../src/components/inventory/Row';
const ProductDetail = () => {
    const { productId } = useLocalSearchParams<{ productId: string }>()
    const { data: user, isLoading: userLoading } = useUser()
    const { data: business, isLoading: businessLoading } = useBusiness(user?.id)
    const { data, isLoading, error } = useProductById(productId)
    const {mutateAsync: addRestockMutation, isPending} = useRestockProduct()
    const [showRestock, setShowRestock] = useState(false)
    const [showAdjustStock, setShowAdjustStock] = useState(false)
    const [restock, setRestock] = useState('')
    const [restockError, setRestockError] = useState('')
    const [adjustStock, setAdjustStock] = useState('')
    const [adjustError, setAdjustError] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const Loading = userLoading || businessLoading || isLoading
    const currency = business?.currency
    const image = data?.image_url
    const name = data?.name
    const costPrice = data?.cost_price
    const sellingPrice = data?.price
    const stock = data?.stock_quantity ?? 0
    const lowStockThreshold = data?.low_stock_threshold ?? 0
    const outStock = stock <= 0
    const lowStock = stock > 0 && stock <= lowStockThreshold
    const colors = outStock ? { iconBg: Colors.errorLight, color: Colors.error } :
        lowStock ? { iconBg: Colors.warningLight, color: Colors.warning } :
            { iconBg: Colors.successLight, color: Colors.primary }
    const badgeTitle = outStock ? 'Out of Stock' : lowStock ? 'Low Stock' : 'In Stock'
    const icon = outStock ? { name: 'close-circle', type: 'Ionicons' } :
        lowStock ? { name: 'alert-circle', type: 'Ionicons' } : { name: 'checkmark-circle', type: 'Ionicons' }

        // handle save

        const handleRestock = async()=>{
            try {
               const result = restockSchema.safeParse({
                quantity : restock
               })

               if(!result.success)
               {
                const fieldError = result.error.issues[0]?.message
                setRestockError(fieldError)
                return
               }
            //    const newS = Number(restock) + stock
            //    setNewStock(newS)
               await addRestockMutation({
                businessId: business?.id,
                productId: productId,
                quantity: Number(restock)
               })
               setShowRestock(false)
               setRestock('')

            } catch (error) {
                console.log('restock error', error);
                
            }
        }
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Product Stock' onPress={() => router.back()} />
            {
                showRestock && (
                    <RestockModal
                        stock={stock}
                        modalVisible={showRestock}
                        value={restock}
                        error={restockError}
                        heading='Restock Product'
                        subHeading='Add stock to your product'
                        inputTitle='Quantiy to Add*'
                        stockTitle='New Stock'
                        buttonTitle='Confirm Restock'
                        onChangeText={(t:string)=>{setRestock(t), setRestockError('')}}
                        onPressCancel={() => {setShowRestock(false), setRestock(''), setRestockError('')}}
                        onPressSave={handleRestock}
                        loader= {isPending}
                    />)
            }
            {
                showAdjustStock && (
                    <RestockModal
                        stock={stock}
                        modalVisible={showAdjustStock}
                        value={adjustStock}
                        error={adjustError}
                        heading='Adjust Stock'
                        subHeading='Manually update inventory'
                        inputTitle='New Stock*'
                        stockTitle='Stock Change'
                        buttonTitle='Confirm Adjustment'
                        open={showDropdown}
                        onPressDrop={()=>setShowDropdown(!showDropdown)}
                        onCloseDrop={()=>setShowDropdown(false)}
                        onChangeText={(t:string)=>{setAdjustStock(t), setAdjustError('')}}
                        onPressCancel={() => {setShowAdjustStock(false), setAdjustStock(''), setAdjustError('')}}
                        //onPressSave={handleRestock}
                        //loader= {isPending}
                    />)
            }
            {
                Loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <View>
                        <View style={styles.productContainer}>
                            {
                                image ? (
                                    <Image
                                        source={{ uri: image }}
                                        style={styles.image}
                                    />
                                ) : (
                                    <View style={styles.placeholder}>
                                        <Icon
                                            name='package-variant-closed'
                                            type='MaterialDesignIcons'
                                            size={wp(10)}
                                            color={Colors.primary}
                                        />
                                    </View>
                                )
                            }
                            <View style={styles.textContainer}>
                                <Text style={styles.name}>{name}</Text>
                                <Row
                                    title='Cost Price'
                                    info={costPrice}
                                    currency={currency}
                                />
                                <Row
                                    title='Selling Price'
                                    info={sellingPrice}
                                    currency={currency}
                                />
                            </View>
                        </View>
                        <StockAlert
                            iconBgColor={colors.iconBg}
                            //bgColor={Colors.warningLightExtra}
                            color={colors.color}
                            iconName={icon.name}
                            iconType={icon.type}
                            stock={stock}
                            threshold={lowStockThreshold}
                            badge={badgeTitle}
                        />
                        <View style={styles.action}>
                            <ActionButton
                                iconName='package-variant-closed-plus'
                                iconType='MaterialDesignIcons'
                                iconColor={Colors.surface}
                                mainText='Restock'
                                subText='Add more inventory'
                                maincolor={Colors.surface}
                                subColor={Colors.surface}
                                bgColor={Colors.primary}
                                onPress={() => setShowRestock(true)}
                            />
                            <ActionButton
                                iconName='options-outline'
                                iconType='Ionicons'
                                iconColor={Colors.primary}
                                mainText='Adjust Stock'
                                subText='Manually update quantity'
                                maincolor={Colors.primary}
                                subColor={Colors.textSecondary}
                                bgColor={Colors.surface}
                                borderColor={Colors.textSecondary}
                                borderWidth={0.3}
                                onPress={() => setShowAdjustStock(true)}
                            />
                        </View>
                     
                    </View>
                )
            }

        </SafeAreaView>
    );
};




export default ProductDetail;
