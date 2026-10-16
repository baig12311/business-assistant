import { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './paymentStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import Header from '../../src/components/common/Header';
import Input from '../../src/components/common/Input';
import PaymentCard from '../../src/components/customers/PaymentCard';
import { formatDate } from '../../src/services/formatDate';
import { useCustomerPayments } from '../../src/hooks/useCustomerPayment';
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
    
    const { data: customerPayment, isLoading: paymentLoading } = useCustomerPayments(businessId, customerId)
    // search payment
    const filterPayments = (customerPayment ?? []).filter(payment =>
  payment.customer_payment_allocations?.some(allocation =>
    allocation.orders?.order_number
      ?.toString()
      .includes(searchText.trim())
  )
);
    const renderPayment = ({ item }: any) => {
        
        return (
            <PaymentCard
                amount={item.amount}
                allocations={item.customer_payment_allocations}
                date={formatDate(item.created_at)}
                currency={business?.currency}
            />
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Customer Payments' onPress={() => router.back()} />
            <Input
                placeholder='Search payment by order number...'
                // value={searchText}
                // onChangeText={setSearchText}
                iconName='search-outline'
                iconType='Ionicons'
            />
            <FlatList
                data={filterPayments}
                renderItem={renderPayment}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ flexGrow: 1, paddingVertical: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};


export default CustomerPayment;
