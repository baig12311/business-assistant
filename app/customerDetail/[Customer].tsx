import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './CustomerStyle';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useUser } from '../../src/hooks/useUser';
import { useBusiness } from '../../src/hooks/useBusiness';
import { useCustomerById } from '../../src/hooks/useCustomer';
import { useCustomerOrders } from '../../src/hooks/useCustomerOrders';
import Header from '../../src/components/common/Header';
import Row from '../../src/components/customers/Row';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardCard from '../../src/components/home/DashboardCard';
import CustomerOrderCard from '../../src/components/customers/CustomerOrderCard';
import Icon from '../../src/components/common/Icon';
import Colors from '../../src/constants/colors';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
const CustomerDetail = () => {
    const [showMenu, setShowMenu] = useState(false)
    const { customerId } = useLocalSearchParams<{ customerId: string }>()
    console.log(customerId);
    const { data: userData } = useUser();
    const { data: businessData } = useBusiness(userData?.id)
    const { data: customer, isLoading } = useCustomerById(customerId)
    const { data: customerOrder } = useCustomerOrders(businessData?.id, customerId)
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

    if (isLoading) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View>
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
                    (customerOrder && customerOrder?.length > 0) && (
                        <>
                            <View style={styles.dashboard}>
                                <DashboardCard
                                    title='Total Orders'
                                    info={customerOrder?.length}
                                    bgColor={Colors.surface}
                                    iconColor={Colors.primary}
                                    iconBg={Colors.successLight}
                                    iconName='receipt-outline'
                                    iconType='Ionicons'
                                />
                                <DashboardCard
                                    title='Total Spent'
                                    info={totalOrdersAmount.toLocaleString()}
                                    bgColor={Colors.surface}
                                    iconName='cash-outline'
                                    iconType='Ionicons'
                                    iconColor={Colors.primary}
                                    iconBg={Colors.successLight}
                                />
                            </View>

                            {
                                customerOrder?.map((order, index) => (
                                    <CustomerOrderCard
                                        key={index}
                                        orderNumber={order.order_number}
                                        amount={`${businessData.currency} ${order.total_amount.toLocaleString()}`}
                                        date={order.created_at}
                                    />
                                ))
                            }
                        </>
                    )
                }


            </ScrollView>
        </SafeAreaView>
    );
};


export default CustomerDetail;
