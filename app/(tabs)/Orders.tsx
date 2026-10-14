import { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useUser } from '../../src/hooks/useUser';
import { useBusiness } from '../../src/hooks/useBusiness';
import { useOrders } from '../../src/hooks/useOrders';
import OrderSkeleton from '../../src/components/skeleton/OrderSkeleton';
import Header from '../../src/components/common/Header';
import CustomEmptyComponent from '../../src/components/common/CustomEmptyComponent';
import CustomerOrderCard from '../../src/components/customers/CustomerOrderCard';
import Input from '../../src/components/common/Input';
import OnlineOrderCard from '../../src/components/sales/OnlineOrderCard';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { formatDate } from '../../src/services/formatDate';
import Colors from '../../src/constants/colors';
import { orderStatus } from '../../src/services/data/orderStatus';
import Status from '../../src/components/sales/Status';
import OrderCard from '../../src/components/sales/OrderCard';
const Orders = () => {
    const { data, isLoading: userLoading, error: userError } = useUser()
    const userId = data?.id
    const { data: business, isLoading: businessLoading, error: businessError } = useBusiness(userId)
    const businessId = business?.id
    const businessType = business?.business_type
    const { data: orders, isLoading: ordersLoading } = useOrders(businessId)
    const [selectedStatus, setSelectedStatus] = useState('All')
    const isLoading = userLoading || businessLoading || ordersLoading
    const [searchText, setSearchText] = useState('')
    const filterOrders = orders?.filter(item =>
        item.order_number.toString().
            includes(searchText.trim().toLocaleLowerCase())
    )
    // render order
    const renderOrder = ({ item }: any) => {
        const date = formatDate(item?.created_at)
        return (
            // <OrderCard
            // orderNumber={item.order_number}
            // customerName={item.customer?.name}
            // date={date}
            // amount={item.total_amount}
            // currency={business?.currency}
            // onPress={()=>router.push({
            //     pathname:'/orderDetail/[order]',
            //     params:{
            //         orderId: item.id
            //     }
            // })}
            // />
            <CustomerOrderCard
                orderNumber={item.order_number}
                customer={item.customer?.name}
                date={date}
                amount={item.total_amount}
                paidAmount={item.paid_amount}
                currency={business?.currency}
                onPress={() => router.push({
                    pathname: '/orderDetail/[order]',
                    params: {
                        orderId: item.id
                    }
                })}
            />
        )
    }

    // render online order
    const renderOnlineOrder = ({ item }: any) => {
        const date = formatDate(item?.created_at)
        return (
            
            <OnlineOrderCard
                orderNumber={item.order_number}
                customer={item.customer?.name}
                date={date}
                status={item.status}
                // amount={item.total_amount}
                // paidAmount={item.paid_amount}
                // currency={business?.currency}
                onPress={() => router.push({
                    pathname: '/orderDetail/[order]',
                    params: {
                        orderId: item.id
                    }
                })}
            />
        )
    }

    

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <Header title='Orders' onPress={() => router.back()} />
                <Input
                    placeholder='Search order by number...'
                    value={searchText}
                    onChangeText={setSearchText}
                    iconName='search-outline'
                    iconType='Ionicons'
                    keyboard='numeric'
                />
                <OrderSkeleton />
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Orders' onPress={() => router.back()} />
            <Input
                placeholder='Search order by number...'
                value={searchText}
                onChangeText={setSearchText}
                iconName='search-outline'
                iconType='Ionicons'
                keyboard='numeric'
            />
            {
                businessType === 'online' ? (
                    <View>
                        <View style={styles.statusContainer}>
                            {
                                orderStatus.map((status, index) => {
                                    const selected = selectedStatus === status
                                    return (
                                        <Status
                                            key={index}
                                            title={status}
                                            isSelected={selected}
                                            onPress={() => setSelectedStatus(status)}
                                        />
                                    )
                                })
                            }
                        </View>
                        <FlatList
                            data={filterOrders ?? []}
                            renderItem={renderOnlineOrder}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(6) }}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={
                                searchText.trim() !== '' ? (
                                    <CustomEmptyComponent
                                        mainText={`No orders found.`}
                                        subText='Try another order number.'
                                    />
                                ) : (
                                    <CustomEmptyComponent
                                        illustration={require('../../assets/illustrations/noproduct.png')}
                                        mainText='No Order or Sales yet'
                                        subText='Your Order or Sales will appear here.'
                                    />
                                )
                            }
                        />
                    </View>


                ) : businessType === 'physical' ? (
                    <FlatList
                        data={filterOrders ?? []}
                        renderItem={renderOrder}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(6) }}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            searchText.trim() !== '' ? (
                                <CustomEmptyComponent
                                    mainText={`No orders found.`}
                                    subText='Try another order number.'
                                />
                            ) : (
                                <CustomEmptyComponent
                                    illustration={require('../../assets/illustrations/noproduct.png')}
                                    mainText='No Order or Sales yet'
                                    subText='Your Order or Sales will appear here.'
                                />
                            )
                        }
                    />
                ) : (null)
            }




        </SafeAreaView>
    );
};

// const PhysicalBusiness=()=>{
//     return (
//         <View style={{flex:1}}>
//             <FlatList
//             data={filterOrders ?? []}
//             renderItem={renderOrder}
//             keyExtractor={(item)=>item.id}
//             showsVerticalScrollIndicator={false}

//             />
//         </View>
//     )
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp(3),
        backgroundColor: Colors.background,
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(2)
    }
});

//make this component available to the app
export default Orders;
