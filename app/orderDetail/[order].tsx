import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatDate } from '../../src/services/formatDate';
import Button from '../../src/components/common/Button';
import Header from '../../src/components/common/Header';
import OrderDetailCard from '../../src/components/orderDetail/OrderDetailCard';
import OrderItems from '../../src/components/orderDetail/OrderItems';
import PriceSummaryCard from '../../src/components/orderDetail/PriceSummary';
import OrderDetailSkeleton from '../../src/components/skeleton/OrderDetailSkeleton';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useOrderById } from '../../src/hooks/useOrderById';
import styles from './orderStyle';
const OrderDetail = () => {
    const { orderId } = useLocalSearchParams<{ orderId: string }>()
    const { data: order, isLoading } = useOrderById(orderId)
    const orderItems = order?.order_items ?? [];
    const paidAmount = order?.paid_amount
    const total = order?.total_amount
    // const paidAmount = 850
    // const totalAmount = 900
    const paymentStatus = paidAmount >= total ? 'Paid' : paidAmount < total ? total - paidAmount : 0

    // Subtotal
    const subTotal = orderItems.reduce((total: any, item: any) => {
        const quantity = Number(item.quantity) || 0;
        const unitPrice = Number(item.unit_price) || 0;

        return total + quantity * unitPrice;
    }, 0);

    // Order values
    const totalAmount = Number(order?.total_amount) || 0;
    const amountPaid = Number(order?.paid_amount) || 0;

    // Return amount
    const returnAmount = Math.max(amountPaid - totalAmount, 0);

    // Discount
    const discount = Math.max(subTotal - totalAmount, 0);

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <Header title='Order Detail' onPress={() => router.back()} />
                <OrderDetailSkeleton />
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Order Detail' onPress={() => router.back()} />
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
                <Text style={styles.sectionTitle}>Order #{order.order_number}</Text>
                <OrderDetailCard
                    cName={order?.customer.name}
                    phone={order?.customer.phone}
                    orderDate={formatDate(order?.created_at)}
                    pStatus={paymentStatus}

                />
                <Text style={styles.sectionTitle}>Order Items</Text>
                <OrderItems
                    orderItem={order?.order_items}
                />
                <Text style={styles.sectionTitle}>Price Summary</Text>
                <PriceSummaryCard
                    subTotal={subTotal}
                    total={totalAmount}
                    paid={amountPaid}
                    discount={discount}
                    change={returnAmount}
                />

            </ScrollView>
            <View style={styles.buttonContainer}>
                <Button
                    title='View Invoice'
                    onPress={() => router.push({
                        pathname: '/receipt/Receipt',
                        params: {
                            orderId: order.id
                        }
                    })}
                />
            </View>


        </SafeAreaView>
    );
};

export default OrderDetail;


