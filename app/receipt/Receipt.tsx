
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useUser } from '../../src/hooks/useUser';
import { useBusiness } from '../../src/hooks/useBusiness';
import { useOrderById } from '../../src/hooks/useOrderById';
import Colors from '../../src/constants/colors';
import styles from './ReceiptStyle';
import Header from '../../src/components/common/Header';
import InvoiceRow from '../../src/components/invoice/InvoiceRow';
import { useLocalSearchParams } from 'expo-router';
const Receipt = () => {
    const { orderId, orderItems, totalAmount, discount, amountPaid, remaining } = useLocalSearchParams<{
        orderId: string,
        orderItems: string,
        totalAmount: string,
        discount: string,
        amountPaid: string,
        remaining: string
    }>()
    console.log(totalAmount, discount, amountPaid, remaining);

    const { data } = useUser()
    const { data: business } = useBusiness(data?.id)
    const { data: order } = useOrderById(orderId)
    const orderItemsData = orderItems ? JSON.parse(orderItems) : []
    console.log(orderItemsData);
    
    const formattedDate = new Date(order?.created_at).toLocaleDateString(
        'en-GB',
        {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }
    );

    const formattedTime = new Date(order?.created_at).toLocaleTimeString(
        'en-US',
        {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }
    );
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Invoice' onPress={() => router.back()} />
            <View style={styles.invoiceContainer}>
                <View style={styles.invoice}>
                    <Text style={[styles.invoiceNumber, styles.businessName]}>{business?.name}</Text>
                    <Text style={styles.invoiceNumber}>Invoice# {order?.order_number}</Text>
                    <Text style={styles.time}>{formattedDate}  {formattedTime}</Text>
                    <View style={styles.invoiceTable}>
                        <InvoiceRow
                            name='Name'
                            quantity='Qty'
                            price='Price'
                            subTotal='Total'
                            isHeading={true}
                        />
                        {
                            orderItemsData.map((item: any, index: string) => {
                                const quantity = Number(item.quantity) || 0;
                                const unitPrice = Number(item.unit_price) || 0;
                                const subtotal = Number(quantity) * Number(unitPrice)
                                
                                return (
                                    <InvoiceRow
                                        name={item.name}
                                        quantity={quantity}
                                        price={unitPrice.toLocaleString()}
                                        subTotal={subtotal.toLocaleString()}
                                    />
                                )
                            })
                        }

                    </View>
                    <View style={styles.totalContainer}>
                        <Row
                            title='Total'
                            text={Number(totalAmount).toLocaleString()}
                            color={Colors.text}
                        />
                        <Row
                            title='Amount Paid'
                            text={Number(amountPaid).toLocaleString()}
                            color={Colors.textSecondary}
                        />
                        <Row
                            title='Return Amount'
                            text={(Number(amountPaid) - Number(totalAmount)).toLocaleString()}
                            color={Colors.textSecondary}
                        />
                    </View>
                    <Text style={styles.txtThank}>Thank You!</Text>
                    <Text style={styles.visit}>Visit Again</Text>

                </View>

            </View>

        </SafeAreaView>
    );
};


const Row = ({ text, title, color }: { text: string | number, title: string, color: string }) => {
    return (
        <View style={styles.row}>
            <Text style={[styles.textPrice, { color: color }]}>{title}</Text>
            <Text style={[styles.textPrice, { color: color }]}>{text}</Text>
        </View>
    )
}

export default Receipt;
