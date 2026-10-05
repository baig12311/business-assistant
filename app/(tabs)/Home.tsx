import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '../../src/constants/colors';
import { useUser } from '../../src/hooks/useUser';
import { LineChart } from 'react-native-gifted-charts'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import fonts, { fontSize } from '../../src/constants/typography';
import Header from '../../src/components/home/Header';
import { useBusiness } from '../../src/hooks/useBusiness';
import { useCustomers } from '../../src/hooks/useCustomer';
import { currencies } from '../../src/services/data/currencies';
import Icon from '../../src/components/common/Icon';
import { quickActions } from '../../src/services/data/quickActions';
import { useProducts } from '../../src/hooks/useProducts';
import { useOrders } from '../../src/hooks/useOrders';
import ActionCard from '../../src/components/home/ActionCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardCard from '../../src/components/home/DashboardCard';
const Home = () => {
 
    const { data, error, isLoading } = useUser()
    const userId = data?.id
    const { data: business, error: bError, isLoading: bLoading } = useBusiness(userId)
       
    const userName = data?.user_metadata?.name
    const{data: orders} = useOrders(business?.id)
    const { data: products } = useProducts(business?.id)
    const { data: customers } = useCustomers(business?.id)
    // const salesData = [
    //     { value: 4500, label: 'Mon' },
    //     { value: 7200, label: 'Tue' },
    //     { value: 5800, label: 'Wed' },
    //     { value: 9100, label: 'Thu' },
    //     { value: 12500, label: 'Fri' },
    //     { value: 8300, label: 'Sat' },
    //     { value: 15550, label: 'Sun' },
    // ];
    const salesData = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    const currentDay = date.getDay(); // Sunday = 0
    const diff = currentDay === 0 ? -6 : 1 - currentDay;

    date.setDate(date.getDate() + diff + index);

    const daySales =
        orders?.reduce((sum: number, order: any) => {
            const orderDate = new Date(order.created_at);

            const sameDay =
                orderDate.getFullYear() === date.getFullYear() &&
                orderDate.getMonth() === date.getMonth() &&
                orderDate.getDate() === date.getDate();

            return sameDay
                ? sum + Number(order.total_amount)
                : sum;
        }, 0) ?? 0;

    return {
        value: daySales,
        label: date.toLocaleDateString('en-US', {
            weekday: 'short',
        }),
    };
});
     const totalSales = orders?.reduce(
        (sum: number, order: any) => sum + Number(order.total_amount),
        0
    ) ?? 0;
    return (
        <SafeAreaView style={styles.container}>
            <Header
                userName={userName}
                business={business?.name}
                imageurl={business?.logo_url}
            />
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.timeSelector}
                >

                    <Icon
                        name='calendar-outline'
                        type='Ionicons'
                        size={wp(4)}
                        color={Colors.textSecondary}
                    />
                    <Text style={styles.timeText}>This week</Text>
                    <Icon
                        name='chevron-small-down'
                        type='Entypo'
                        size={wp(5)}
                        color={Colors.textSecondary}
                    />
                </TouchableOpacity>
                <View style={styles.infoContainer}>
                    <DashboardCard
                        title="Products"
                        info={products?.length}
                        iconName='cube'
                        iconType='Ionicons'
                        bgColor='#EFF6FF'
                        iconColor='#2563EB'
                        iconBg='#DBEAFE'
                    />
                    <DashboardCard
                        title="Customers"
                        info={customers?.length}
                        iconName='people'
                        iconType='Ionicons'
                        bgColor='#FAF5FF'
                        iconColor='#9333EA'
                        iconBg='#F3E8FF'
                    />
                    <DashboardCard
                        title="Orders"
                        info={orders?.length}
                        iconName='receipt'
                        iconType='Ionicons'
                        bgColor='#FFF7ED'
                        iconColor='#D97706'
                        iconBg='#FEF3C7'
                    />
                    <DashboardCard
                        title="Today's Sales"
                        info={totalSales.toLocaleString()}
                        iconName='cash'
                        iconType='Ionicons'
                        bgColor='#F0FDF4'
                        iconColor='#16A34A'
                        iconBg='#DCFCE7'
                        currency={business?.currency}
                    />
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.actionRow}>
                        {
                            quickActions.map((action, index) => (
                                <ActionCard
                                    key={index}
                                    iconName={action.name}
                                    iconType={action.type}
                                    title={action.title}
                                    onPress={action.onPress}
                                />
                            ))
                        }
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Sales Overview{' '}
                        <Text style={styles.currency}>
                            ({business?.currency})
                        </Text>
                    </Text>
                    <View style={styles.chartContainer}>
                        <LineChart
                            data={salesData}
                            height={hp(22)}
                            thickness={1.5}
                            hideDataPoints={false}
                            curved
                            color={Colors.primary}
                            xAxisColor={Colors.border}
                            yAxisColor={Colors.border}
                            startFillColor1={Colors.primary}
                            endFillColor1={Colors.primaryLight}
                            dataPointsColor={Colors.primaryDark}
                            startOpacity={0.5}
                            endOpacity={0.1}
                            hideRules
                            isAnimated={true}
                            noOfSections={4}
                            spacing={wp(10)}
                            areaChart
                            yAxisLabelWidth={wp(12)}
                            xAxisLabelTextStyle={styles.axisLabelText}
                            yAxisTextStyle={styles.axisLabelText}
                        />

                    </View>

                </View>
            </ScrollView>



        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        padding: wp(3),
        flex: 1
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    section: {
        marginBottom: hp(2)
    },
    sectionTitle: {
        fontFamily: fonts.bold,
        fontSize: fontSize.subHeading,
        marginBottom: hp(1),
        color: Colors.text
    },
    infoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: hp(2)

    },
    timeSelector: {
        borderWidth: 0.5,
        borderRadius: wp(2),
        alignSelf: 'flex-end',
        padding: wp(2),
        borderColor: Colors.textMuted,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        elevation: 1,
        marginBottom: hp(2)

    },
    timeText: {
        fontFamily: fonts.regular,
        fontSize: fontSize.smallText,
        color: Colors.textSecondary,
        marginHorizontal: wp(2),
    },
    scrollContainer: {
        paddingBottom: hp(4),
        paddingTop:hp(0.5),
        flexGrow: 1
    },
    axisLabelText: {
        fontFamily: fonts.medium,
        fontSize: fontSize.smallText,
        color: Colors.textSecondary
    },
    currency:{
        fontSize: fontSize.smallText,
        fontFamily: fonts.medium,
        color:Colors.textSecondary
    },
    chartContainer:{
        backgroundColor:Colors.surface,
        elevation:1,
        borderRadius:wp(2),
        paddingVertical:hp(2)
    }
});

export default Home;
