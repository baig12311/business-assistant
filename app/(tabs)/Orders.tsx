import { useState } from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useUser } from '../../src/hooks/useUser';
import { useBusiness } from '../../src/hooks/useBusiness';
import { useOrders } from '../../src/hooks/useOrders';
import OrderSkeleton from '../../src/components/skeleton/OrderSkeleton';
import Header from '../../src/components/common/Header';
import Input from '../../src/components/common/Input';
import { widthPercentageToDP as wp,
    heightPercentageToDP as hp
 } from 'react-native-responsive-screen';
 import { formatDate } from '../../src/services/formatDate';
import Colors from '../../src/constants/colors';
import OrderCard from '../../src/components/sales/OrderCard';
const Orders = () => {
    const { data, isLoading:userLoading, error:userError} = useUser()
    const userId = data?.id
    const { data: business, isLoading:businessLoading, error:businessError } = useBusiness(userId)
    const businessId=business?.id
    const{data: orders, isLoading:ordersLoading} = useOrders(businessId)
    const isLoading = userLoading || businessLoading || ordersLoading
     const [searchText, setSearchText] = useState('')
    const filterOrders = orders?.filter(item =>
        item.order_number.toString().
            includes(searchText.trim().toLocaleLowerCase())
    )
    // render order
    const renderOrder=({item}: any)=>{
        const date=formatDate(item?.created_at)
        return(
            <OrderCard
            orderNumber={item.order_number}
            customerName={item.customer?.name}
            date={date}
            amount={item.total_amount}
            currency={business?.currency}
            onPress={()=>router.push({
                pathname:'/orderDetail/[order]',
                params:{
                    orderId: item.id
                }
            })}
            />
        )
    }

    if(isLoading)
    {
        return(
             <SafeAreaView style={styles.container}>
                <Header title='Orders' onPress={()=>router.back()}/>
                <Input
                placeholder='Search order by number...'
                value={searchText}
                onChangeText={setSearchText}
                iconName='search-outline'
                iconType='Ionicons'
                keyboard='numeric'
            />
            <OrderSkeleton/>
             </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Orders' onPress={()=>router.back()}/>
                <Input
                placeholder='Search order by number...'
                value={searchText}
                onChangeText={setSearchText}
                iconName='search-outline'
                iconType='Ionicons'
                keyboard='numeric'
            />
            <FlatList
            data={filterOrders ?? []}
            renderItem={renderOrder}
            keyExtractor={(item)=>item.id}
            showsVerticalScrollIndicator={false}
            />
           
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp(3),
        backgroundColor: Colors.background,
    },
});

//make this component available to the app
export default Orders;
