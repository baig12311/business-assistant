import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './CustomerStyle';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useCustomerById } from '../../src/hooks/useCustomer';
import Header from '../../src/components/common/Header';
import Row from '../../src/components/customers/Row';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../src/components/common/Icon';
import Colors from '../../src/constants/colors';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
const CustomerDetail = () => {
    const [showMenu, setShowMenu] = useState(false)
    const { customerId } = useLocalSearchParams<{customerId:string}>()
    console.log(customerId);
    
    const {data:customer, isLoading} = useCustomerById(customerId)
    
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

    if(isLoading)
    {
        return(
            <View>
                <Text>Loading</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
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
                                color={Colors.success}
                            />
                            <Text style={[styles.rowText, { color: Colors.success }]}>Edit Customer</Text>

                        </TouchableOpacity>

                    </View>
                )
            }

            <ScrollView contentContainerStyle={styles.scrollContainer}>
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

            </ScrollView>
        </SafeAreaView>
    );
};


export default CustomerDetail;
