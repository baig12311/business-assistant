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
import PaymentSkeleton from '../../src/components/skeleton/PaymentSkeleton';
const CustomerPayment = () => {
    const { businessId, customerId } = useLocalSearchParams<{
        businessId: string,
        customerId: string
    }>()
    const [searchText, setSearchText] = useState('')
    const { data: user, isLoading: userLoading } = useUser()
    const { data: business, isLoading: businessLoading } = useBusiness(user?.id)

    const { data: customerPayment, isLoading: paymentLoading } = useCustomerPayments(businessId, customerId)
    const isLoading = userLoading || businessLoading || paymentLoading

    const query = searchText.trim().toLowerCase();

    const filterPayments = (customerPayment ?? []).filter((payment: any) => {
        if (!query) return true;

        // date se match
        const dateText = String(formatDate(payment.created_at) ?? '').toLowerCase();
        if (dateText.includes(query)) return true;

        // order number se match
        return payment.customer_payment_allocations?.some((allocation: any) => {
            const order = Array.isArray(allocation.orders)
                ? allocation.orders[0]
                : allocation.orders;

            return String(order?.order_number ?? '').includes(query);
        });
    });
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


    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <Header title='Orders' onPress={() => router.back()} />
                <Input
                    placeholder='Search by order number or date...'
                    value={searchText}
                    onChangeText={setSearchText}
                    iconName='search-outline'
                    iconType='Ionicons'
                    keyboard='numeric'
                />
                <PaymentSkeleton />
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Customer Payments' onPress={() => router.back()} />
            <Input
                placeholder='Search by order number or date...'
                value={searchText}
                onChangeText={setSearchText}
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
