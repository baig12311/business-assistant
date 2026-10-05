import { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../src/components/common/Header';
import { useCustomers, useCustomerById } from '../../src/hooks/useCustomer';
import { router, useLocalSearchParams } from 'expo-router';
import { countries } from '../../src/services/data/countries';
import CustomBottomSheet from '../../src/components/common/CustomBottomSheet';
import CustomToast from '../../src/components/common/CustomToast';
import { customerSchema } from '../../src/services/schema/customerSchema';
import { useUser } from '../../src/hooks/useUser';
import { useBusiness } from '../../src/hooks/useBusiness';
import { useAddCustomer } from '../../src/hooks/useAddCustomer';
import { useUpdateCustomer } from '../../src/hooks/useUpdateCustomer';
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';
import Button from '../../src/components/common/Button';
import styles from './AddCustomerStyle';
import Input from '../../src/components/common/Input';
import BottomSheet from '@gorhom/bottom-sheet';
import PhoneInput from '../../src/components/common/PhoneInput';
import { number } from 'zod';
type selected = {
    name: string,
    flag: string,
    dialCode: string
    code: CountryCode
}
const AddCustomer = () => {
    const [showSheet, setShowSheet] = useState(false)
    const [sheetTitle, setSheetTitle] = useState('');
    const [toastMessage, setToastMessage] = useState('')
    const [toastTitle, setToastTitle] = useState('')
    const [showToast, setShowToast] = useState(false)
    const [toastType, setToastType] = useState<'success' | 'error'>('error')
    const [sheetOptions, setSheetOptions] = useState<any[]>([]);
    const [sheetValue, setSheetValue] = useState('');
    const [selectedCountry, setSelectedCountry] = useState<selected>(countries[0])
    const sheetRef = useRef<BottomSheet>(null)
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
    useEffect(() => {
        if (!customer) return;

        const phoneNumber = parsePhoneNumberFromString(
            customer.phone ?? ''
        );

        if (phoneNumber) {
            const selectedCountry = countries.find(
                item => item.code === phoneNumber.country
            );

            if (selectedCountry) {
                setSelectedCountry(selectedCountry);
            }

            setCustomer({
                ...customer,
                phone: phoneNumber.nationalNumber
            });
        }
    }, [customer]);
    const isDiabled = !customer.name || !customer.phone
    const countryCodes = countries.map(
        item => item.dialCode
    )
    // open sheet
    const openSheet = (
        title: string,
        options: any[],
        value: any
    ) => {
        setSheetTitle(title);
        setSheetOptions(options);
        setSheetValue(value);

        sheetRef.current?.snapToIndex(0);
    };

    // set fields
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

    // validate customer
    const validateCustomer = () => {
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

            return false;
        }
        setErrors({})
        return true
    }

    // update Customer

    const updateCustomer = async () => {
        if (!validateCustomer()) {
            return
        }
        const phoneNumber = parsePhoneNumberFromString(
            customer.phone,
            selectedCountry.code
        );

        if (!phoneNumber?.isValid()) {
            setErrors({
                ...errors,
                phone: '*Please enter a valid phone number',
            });

            return;
        }

        const formattedPhone = phoneNumber.number;
        try {
            await updateCustomerMutation({
                customerId: customerId,
                name: customer.name.trim(),
                phone: formattedPhone,
                email: customer.email.trim(),
                address: customer.address.trim(),
                city: customer.city.trim(),
            });
            setToastType('success')
            setToastTitle('Updated Successfully')
            setToastMessage('Customer details have been updated successfully')
            setShowToast(true)
            setCustomer({
                name: '',
                phone: '',
                email: '',
                address: '',
                city: '',
            })
            setTimeout(() => {
                router.back()
            }, 3100)

        } catch (error) {
            setToastType('error')
            setToastTitle('Unable to update customer')

            setToastMessage("We couldn’t update this customer data. Please try again.")
            setShowToast(true)
        }
    }

    // add customer

    const addCustomer = async () => {
        if (!validateCustomer()) {
            return
        }
        const phoneNumber = parsePhoneNumberFromString(
            customer.phone,
            selectedCountry.code
        );

        if (!phoneNumber?.isValid()) {
            setErrors({
                ...errors,
                phone: '*Please enter a valid phone number',
            });

            return;
        }

        const formattedPhone = phoneNumber.number;

        //console.log('DB Phone:', formattedPhone);


        try {
            await addCustomerMutation({
                businessId,
                name: customer.name.trim(),
                phone: formattedPhone,
                email: customer.email.trim(),
                address: customer.address.trim(),
                city: customer.city.trim(),
            });

            setToastType('success')
            setToastTitle('Addedd Successfully')
            setToastMessage('Customer details have been added successfully')
            setShowToast(true)
            setCustomer({
                name: '',
                phone: '',
                email: '',
                address: '',
                city: '',
            })
            setTimeout(() => {
                router.back()
            }, 3100)

        } catch (error) {
            setToastType('error')
            setToastTitle('Unable to add customer')

            setToastMessage("We couldn’t add this customer data. Please try again.")
            setShowToast(true)
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
        <View style={{ flex: 1 }}>


            <SafeAreaView style={styles.container}>
                <CustomToast
                    visible={showToast}
                    onHide={() => setShowToast(false)}
                    type={toastType}
                    messageTitle={toastTitle}
                    messageDescription={toastMessage}
                />
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
                        {/* <Input
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
                    /> */}
                        <PhoneInput
                            onChangeCode={() => {
                                setShowSheet(true),
                                    openSheet(
                                        'Select Country Code',
                                        countries,
                                        selectedCountry

                                    )
                            }}
                            valueCode={selectedCountry?.dialCode}
                            flag={selectedCountry?.flag}
                            valueNumber={customer.phone}
                            onChangeNumber={(t: string) => {
                                setCustomer({
                                    ...customer,
                                    phone: t
                                })
                                setErrors({
                                    ...errors,
                                    phone: undefined,
                                });
                            }}
                            errorMessage={errors.phone}
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
                                disabled={isDiabled}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
            {
                showSheet && (
                    <CustomBottomSheet
                        bottomSheetRef={sheetRef}
                        options={sheetOptions}
                        title={sheetTitle}
                        searchable={true}
                        displayKeys={['flag', 'name', 'dialCode']}
                        searchPlaceholder='by Country'
                        onSelect={(value: any) => {
                            setSelectedCountry(value),
                                console.log(value);

                            sheetRef.current?.close();
                            setShowSheet(false);
                        }
                        }
                    //value=
                    />
                )

            }
        </View>
    );
};
export default AddCustomer;
