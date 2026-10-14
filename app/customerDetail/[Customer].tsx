import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './CustomerStyle';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useUser } from '../../src/hooks/useUser';
import { useBusiness } from '../../src/hooks/useBusiness';
import { useCustomerById } from '../../src/hooks/useCustomer';
import { useCustomerOrders } from '../../src/hooks/useCustomerOrders';
import CustomerDetailSkeleton from '../../src/components/skeleton/CustomerDetailSkeleton';
import Header from '../../src/components/common/Header';
import Row from '../../src/components/customers/Row';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardCard from '../../src/components/home/DashboardCard';
import CustomerOrderCard from '../../src/components/customers/CustomerOrderCard';
import Icon from '../../src/components/common/Icon';
import PaymentModal from '../../src/components/customers/PaymentModal';
import Colors from '../../src/constants/colors';
import { formatAmount } from '../../src/utils/formatAmount';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PendingCard from '../../src/components/customers/PendingCard';
import { formatDate } from '../../src/services/formatDate';
import { useReceiveCustomerPayment } from '../../src/hooks/useReceiveCustmerPayment';
const CustomerDetail = () => {
    const [showMenu, setShowMenu] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [previousDue, setPreviousDue] = useState(0);
    const [receivedAmount, setReceivedAmount] = useState(0);
    const [newBalance, setNewBalance] = useState(0);
    const [inputError, setInputError] = useState('')
    const { customerId } = useLocalSearchParams<{ customerId: string }>()
    const [rePaid, setRePaid] = useState('')
    const [showModal, setShowModal] = useState(false)
    const { data: userData, isLoading: userLoading } = useUser();
    const { data: businessData, isLoading: businessLoading } = useBusiness(userData?.id)
    const { data: customer, isLoading: customerLoading } = useCustomerById(customerId)
    const { data: customerOrder, isLoading: orderLoading } = useCustomerOrders(businessData?.id, customerId)
    const { mutateAsync: receivePaymentMutation, isPending, error } = useReceiveCustomerPayment()
    const isLoading = userLoading || businessLoading || customerLoading || orderLoading
    const totalOrdersAmount = customerOrder?.reduce(
        (sum: number, order: any) => sum + Number(order.total_amount),
        0
    ) ?? 0;
    const initials = customer?.name
        ?.trim()
        .split(' ')
        .map((word: string) => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    // handleEdit
    const handlePressEdit = () => {
        router.push({
            pathname: '/addCustomer/AddCustomer',
            params: {
                customerId: customer?.id
            }
        })
        setShowMenu(false)
    }

    // values
    const totalPurchases = customerOrder?.reduce(
        (sum: number, order: any) =>
            sum + Number(order.total_amount ?? 0),
        0
    );

    const outstandingBalance = customerOrder?.reduce(
        (sum: number, order: any) => {
            const due =
                Number(order.total_amount ?? 0) -
                Number(order.paid_amount ?? 0);

            return sum + Math.max(0, due);
        },
        0
    );

    // receive Payment 
    const handleReceivePayment = async () => {
        const amount = Number(rePaid);

        if (!rePaid.trim() || !Number.isFinite(amount) || amount <= 0) {
            setInputError('Please enter a valid payment amount.');
            return;
        }

        if (!Number.isInteger(amount * 100)) {
            setInputError('Enter an amount with at most 2 decimal places.');
            return;
        }

        if (amount > outstandingBalance) {
            setInputError(
                'Payment cannot exceed the customer’s outstanding balance.'
            );
            return;
        }

        // if (!businessData?.id || !customer?.id) {
        //     setInputError('Business or customer details are unavailable.');
        //     return;
        // }

        try {
            const currentDue = outstandingBalance;
            await receivePaymentMutation({
                businessId: businessData.id,
                customerId: customer.id,
                amount,
            });
            setPreviousDue(currentDue ?? 0);
            setReceivedAmount(amount);
            setNewBalance(currentDue - amount);
            //setShowModal(false);
            setShowSuccess(true)
            setRePaid('');

            //Alert.alert('Payment Recorded', 'Customer payment has been recorded successfully.');
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Unable to record payment. Please try again.';

            //Alert.alert('Payment Failed', message);
        }
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <Header title='Customer Detail'
                    isMenu={true}
                    onPressMenu={() => setShowMenu(!showMenu)}
                    onPress={() => router.back()} />
                <CustomerDetailSkeleton />

            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View>
                {
                    showModal && (
                        <PaymentModal
                            onPressCancel={() => {
                                setShowModal(false),
                                setRePaid(''),
                                setInputError('')
                            }}
                            value={rePaid}
                            onChangeText={(t: string) => {
                                setRePaid(t),
                                    setInputError('')
                            }}
                            name={customer?.name}
                            due={outstandingBalance}
                            prev={previousDue}
                            amount={receivedAmount}
                            newBalance={newBalance}
                            currency={businessData?.currency}
                            onPressReceive={handleReceivePayment}
                            error={inputError}
                            loading={isPending}
                            done={showSuccess}
                            onPressDone={() => {
                                setShowModal(false),
                                setShowSuccess(false)
                            }}
                        />
                    )
                }
                <Header title='Customer Detail'
                    isMenu={true}
                    onPressMenu={() => setShowMenu(!showMenu)}
                    onPress={() => router.back()} />
                {
                    showMenu && (
                        <View style={styles.menu}>
                            <TouchableOpacity
                                style={styles.row}
                                activeOpacity={0.7}
                                onPress={handlePressEdit}
                            >
                                <Icon
                                    name='edit'
                                    type='Feather'
                                    size={wp(5)}
                                    color={Colors.primary}
                                />
                                <Text style={[styles.rowText, { color: Colors.primary }]}>Edit Customer</Text>

                            </TouchableOpacity>

                        </View>
                    )
                }
            </View>



            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

                <View style={styles.infoContainer}>
                    <View style={styles.avatar}>
                        <Text style={styles.initials}>{initials}</Text>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.nameText}>{customer.name}</Text>
                        {customer.phone && (
                            <Row
                                iconName="call-outline"
                                iconType="Ionicons"
                                rowTitle={customer.phone}
                            />
                        )}

                        {customer.email && (
                            <Row
                                iconName="mail-outline"
                                iconType="Ionicons"
                                rowTitle={customer.email}
                            />
                        )}

                        {customer.address && (
                            <Row
                                iconName="location-outline"
                                iconType="Ionicons"
                                rowTitle={customer.address}
                            />
                        )}

                        {customer.city && (
                            <Row
                                iconName="location-outline"
                                iconType="Ionicons"
                                rowTitle={customer.city}
                            />
                        )}


                    </View>

                </View>
                {
                    customerOrder && (customerOrder?.length > 0) ? (
                        <>
                            <View style={styles.dashboard}>
                                <DashboardCard
                                    title='Total Orders'
                                    info={customerOrder?.length}
                                    bgColor={Colors.blueExtraLight}
                                    iconColor={Colors.blue}
                                    iconBg={Colors.blueLight}
                                    iconName='receipt-outline'
                                    iconType='Ionicons'
                                />
                                <DashboardCard
                                    title='Total Purchase'
                                    currency={businessData?.currency}
                                    info={formatAmount(totalOrdersAmount)}
                                    bgColor={Colors.purpleExtraLight}
                                    iconName='cash-outline'
                                    iconType='Ionicons'
                                    iconColor={Colors.purple}
                                    iconBg={Colors.purpleLight}
                                />
                                {/* <DashboardCard
                                    title='Total Paid'
                                    currency={businessData?.currency}
                                    info={totalOrdersAmount-outstandingBalance}
                                    bgColor={Colors.succesExtraLight}
                                    iconName='cash-outline'
                                    iconType='Ionicons'
                                    iconColor={Colors.primary}
                                    iconBg={Colors.successLight}
                                /> */}
                            </View>
                            {
                                outstandingBalance && (outstandingBalance > 0) && (
                                    <PendingCard
                                        pending={`${businessData?.currency} ${outstandingBalance?.toLocaleString()}`}
                                        onPress={() => setShowModal(true)}
                                    />

                                )
                            }

                            {
                                customerOrder?.map((order, index) => {
                                    // const credit = order.paid_amount - order.total_amount
                                    // const pending = credit.toLocaleString()
                                    const date = formatDate(order.created_at)
                                    return (
                                        <CustomerOrderCard
                                            key={index}
                                            orderNumber={order.order_number}
                                            amount={order.total_amount}
                                            date={date}
                                            paidAmount={order.paid_amount}
                                            currency={businessData?.currency}
                                            disabled={true}

                                        />
                                    )
                                })
                            }
                        </>
                    ): (<View style={styles.new}>
                        <Text style={styles.newHead}>Customer Overview</Text>
                        <Text style={styles.newSub}>Your customer summary will appear here once their first order is created.</Text>
                    </View>)
                }


            </ScrollView>
        </SafeAreaView>
    );
};


export default CustomerDetail;
