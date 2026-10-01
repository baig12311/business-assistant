import { useState, useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../src/components/common/Header';
import { useCustomers, useCustomerById } from '../../src/hooks/useCustomer';
import { router, useLocalSearchParams } from 'expo-router';
import Button from '../../src/components/common/Button';
import styles from './AddCustomerStyle';
import Input from '../../src/components/common/Input';
import { customerSchema } from '../../src/services/schema/customerSchema';
import { useUser } from '../../src/hooks/useUser';
import { useBusiness } from '../../src/hooks/useBusiness';
import { useAddCustomer } from '../../src/hooks/useAddCustomer';
import { useUpdateCustomer } from '../../src/hooks/useUpdateCustomer';
const AddCustomer = () => {
    const { customerId } = useLocalSearchParams<{
        customerId: string
    }>()
    const { data: user } = useUser()
    const { data: business } = useBusiness(user?.id)
    const businessId = business?.id
    const { data: customers } = useCustomers(businessId)
    const { data: selectedCustomer, isLoading: loadingCustomer, error } = useCustomerById(customerId)
    const {
        mutateAsync: addCustomerMutation,
        isPending,
    } = useAddCustomer(businessId);
    const {
        mutateAsync: updateCustomerMutation,
        isPending: pending,
    } = useUpdateCustomer(businessId);
    const isLoading = pending || isPending
    const [customer, setCustomer] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: ''
    })
    const [errors, setErrors] = useState<{
        name?: string
        phone?: string
        email?: string
        address?: string
        city?: string
    }>({})

    // // check if customer exists
    // const selectedCustomer = customers?.find(
    //     (item: any) => item.id === customerId
    // )

    const setCustomerFields = () => {
        if (selectedCustomer) {
            setCustomer({
                name: selectedCustomer.name ?? '',
                phone: selectedCustomer.phone ?? '',
                email: selectedCustomer.email ?? '',
                address: selectedCustomer.address ?? '',
                city: selectedCustomer.city ?? ''
            })
        }
    }
    useEffect(() => {
        setCustomerFields()
    }, [selectedCustomer])

    // update Customer

    const updateCustomer = async () => {
        const result = customerSchema.safeParse(customer);

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;

            setErrors({
                name: fieldErrors.name?.[0],
                phone: fieldErrors.phone?.[0],
                email: fieldErrors.email?.[0],
                address: fieldErrors.address?.[0],
                city: fieldErrors.city?.[0],
            });

            return;
        }
        try {
            await updateCustomerMutation({
                customerId: customerId,
                name: customer.name.trim(),
                phone: customer.phone.trim(),
                email: customer.email.trim(),
                address: customer.address.trim(),
                city: customer.city.trim(),
            });

            router.back();

        } catch (error) {
            console.log('Update Customer Error:', error);
        }
    }

    // add customer

    const addCustomer = async () => {
        const result = customerSchema.safeParse(customer);

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;

            setErrors({
                name: fieldErrors.name?.[0],
                phone: fieldErrors.phone?.[0],
                email: fieldErrors.email?.[0],
                address: fieldErrors.address?.[0],
                city: fieldErrors.city?.[0],
            });

            return;
        }

        try {
            await addCustomerMutation({
                businessId,
                name: customer.name.trim(),
                phone: customer.phone.trim(),
                email: customer.email.trim(),
                address: customer.address.trim(),
                city: customer.city.trim(),
            });

            router.back();

        } catch (error) {
            console.log('Add Customer Error:', error);
        }
    }


    // handle Customer
    const handleCustomer = async () => {
        if (customerId) {
            await updateCustomer()
        }
        else (
            await addCustomer()
        )

    }
    return (
        <SafeAreaView style={styles.container}>
            <Header title={customerId ? 'Edit Customer' : 'Add Customer'} onPress={() => router.back()} />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {
                        !customerId && (
                            <Text style={styles.subHeading}>Add your customer's details to keep their information organized.</Text>

                        )
                    }
                    <Input
                        title='Name*'
                        placeholder='John Doe'
                        iconName='person-outline'
                        iconType='Ionicons'
                        value={customer.name}
                        onChangeText={(t: string) => {
                            setCustomer({
                                ...customer,
                                name: t
                            })
                            setErrors({
                                ...errors,
                                name: undefined,
                            });
                        }}
                        error={errors.name}
                    />
                    <Input
                        title='Phone*'
                        placeholder='+92XXXXXXXXXX'
                        iconName='call-outline'
                        iconType='Ionicons'
                        keyboard='phone-pad'
                        value={customer.phone}
                        onChangeText={(t: string) => {
                            setCustomer({
                                ...customer,
                                phone: t
                            })
                            setErrors({
                                ...errors,
                                phone: undefined,
                            });
                        }}
                        error={errors.phone}
                    />
                    <Input
                        title='Email (optional)'
                        placeholder='someone@gmail.com'
                        iconName='mail-outline'
                        iconType='Ionicons'
                        keyboard='email-address'
                        value={customer.email}
                        onChangeText={(t: string) => {
                            setCustomer({
                                ...customer,
                                email: t
                            })
                            setErrors({
                                ...errors,
                                email: undefined,
                            });
                        }}
                        error={errors.email}
                    />
                    <Input
                        title='Address (optional)'
                        placeholder='House # 0, Street X'
                        iconName='location-outline'
                        iconType='Ionicons'
                        value={customer.address}
                        onChangeText={(t: string) => {
                            setCustomer({
                                ...customer,
                                address: t
                            })
                            setErrors({
                                ...errors,
                                address: undefined,
                            });
                        }}
                        error={errors.address}
                    />
                    <Input
                        title='City (optional)'
                        placeholder='Lahore'
                        iconName='location-outline'
                        iconType='Ionicons'
                        value={customer.city}
                        onChangeText={(t: string) => {
                            setCustomer({
                                ...customer,
                                city: t
                            })
                            setErrors({
                                ...errors,
                                city: undefined,
                            });
                        }}
                        error={errors.city}
                    />
                    <View style={styles.button}>
                        <Button
                            title={customerId ? 'Edit Customer' : 'Add Customer'}
                            onPress={handleCustomer}
                            isLoading={isLoading}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
export default AddCustomer;
