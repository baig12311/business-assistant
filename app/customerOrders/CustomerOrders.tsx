import { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './OrderStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import Header from '../../src/components/common/Header';
import Input from '../../src/components/common/Input';
import OnlineOrderCard from '../../src/components/sales/OnlineOrderCard';
import CustomerOrderCard from '../../src/components/customers/CustomerOrderCard';
import { formatDate } from '../../src/services/formatDate';
import { useCustomerOrders } from '../../src/hooks/useCustomerOrders';
import { useBusiness } from '../../src/hooks/useBusiness';
import { useUser } from '../../src/hooks/useUser';
const CustomerPayment = () => {
    const { businessId, customerId } = useLocalSearchParams<{
        businessId: string,
        customerId: string
    }>()
    const [searchText, setSearchText] = useState('')
    const {data: user, isLoading: userLoading} = useUser()
    const { data: business, isLoading: businessLoading } = useBusiness(user?.id)
    const businessType = business?.business_type
    const { data: customerOrder, isLoading: orderLoading } = useCustomerOrders(businessId, customerId)

     //filter orders
    const filterOrders = customerOrder?.filter(item =>
        item.order_number.toString().
            includes(searchText.trim().toLocaleLowerCase())
    )
    const renderOrder = ({ item }: any) => {
        const date = formatDate(item?.created_at)
        if (item.order_source === 'online') {
            return (
                <OnlineOrderCard
                    orderNumber={item.order_number}
                    customer={item.customer?.name}
                    date={date}
                    status={item.status}
                    amount={item.total_amount}
                    paidAmount={item.paid_amount}
                    currency={business?.currency}
                    orderSource={businessType === 'both' && item?.order_source}
                    disabled={true}
                />
            )
        }
        if (item.order_source === 'physical') {
            return (
                <CustomerOrderCard
                    orderNumber={item.order_number}
                    customer={item.customer?.name}
                    date={date}
                    amount={item.total_amount}
                    paidAmount={item.paid_amount}
                    currency={business?.currency}
                    orderSource={businessType === 'both' && item?.order_source}
                    disabled={true}
                />
            )
        }
        return null

    }
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Customer Orders' onPress={() => router.back()} />
            <Input
                placeholder='Search by order number...'
                value={searchText}
                onChangeText={setSearchText}
                iconName='search-outline'
                iconType='Ionicons'
                keyboard='numeric'
            />
            <FlatList
                data={filterOrders ?? []}
                renderItem={renderOrder}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ flexGrow: 1, paddingVertical: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};


export default CustomerPayment;
