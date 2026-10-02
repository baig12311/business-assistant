import { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '../../src/constants/colors';
import fonts, { fontSize } from '../../src/constants/typography';
import CustomerSkeleton from '../../src/components/skeleton/CustomerSkeleton';
import CustomerCard from '../../src/components/customers/CustomerCard';
import CustomEmptyComponent from '../../src/components/common/CustomEmptyComponent';
import { useUser } from '../../src/hooks/useUser';
import { useCustomerOrders } from '../../src/hooks/useCustomerOrders';
import { useBusiness } from '../../src/hooks/useBusiness';
import { useCustomers } from '../../src/hooks/useCustomer';
import Header from '../../src/components/common/Header';
import Input from '../../src/components/common/Input';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { json } from 'zod';
import { is } from 'zod/v4/locales';
const Customers = () => {
    const [searchText, setSearchText] = useState('')
    const [orderLoading, setOrderLoading] = useState(false)
    const { data, isLoading: userLoading, error: userError } = useUser()
    const userId = data?.id
    const { data: business, isLoading: businessLoading } = useBusiness(userId)
    const { data: customers, isLoading: customersLoading } = useCustomers(business?.id)
    
    // search customer
    const filterCustomers = customers?.filter(item =>
        item.name.toLowerCase().
            includes(searchText.trim().toLocaleLowerCase())
    )

    // render customer
    const CustomerItem = ({ item }: any) => {
        const { data: customerOrder, isLoading} = useCustomerOrders(business?.id, item?.id);
        setOrderLoading(isLoading)
        return (
            <CustomerCard
                name={item.name}
                phone={item.phone}
                order={customerOrder?.length ?? 0}
                onPress={() =>
                    router.push({
                        pathname: '/customerDetail/[Customer]',
                        params: {
                            customerId: item.id,
                        },
                    })
                }
            />
        );
    };
    const isLoading = userLoading || businessLoading || customersLoading
    || orderLoading
    const renderCustomer = ({ item }: any) => {
        return <CustomerItem item={item} />;
    };
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Customers' onPress={() => router.back()} />
            <Input
                placeholder='Search customers...'
                value={searchText}
                onChangeText={setSearchText}
                iconName='search-outline'
                iconType='Ionicons'
            />
            {
                isLoading ? <CustomerSkeleton /> :(
                    <FlatList
                contentContainerStyle={{ flexGrow: 1, marginBottom: hp(6) }}
                data={filterCustomers ?? []}
                renderItem={renderCustomer}
                keyExtractor={(item: any) => item.id}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    searchText.trim() !== '' ? (
                        <CustomEmptyComponent
                            mainText='No customer found'
                            subText='Try searching with a different name.'
                        />
                    ) : (
                        <CustomEmptyComponent
                            mainText='No customers yet'
                            subText='Add your first customer to start managing their details and orders.'
                        />
                    )
                }
            />
                )
            }
            
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        padding: wp(3),
        backgroundColor: Colors.background,
        flex: 1
    },
});

//make this component available to the app
export default Customers;
