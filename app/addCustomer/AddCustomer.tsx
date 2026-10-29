import { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator} from 'react-native';
import Colors from '../../src/constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../src/components/common/Header';
import { useCustomers, useCustomerById } from '../../src/hooks/useCustomer';
import { router, useLocalSearchParams } from 'expo-router';
import CustomEmptyComponent from '../../src/components/common/CustomEmptyComponent';
import { countries } from '../../src/services/data/countries';
import CustomBottomSheet from '../../src/components/common/CustomBottomSheet';
import { useToast } from '../../src/context/ToastContext';
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
    const { showToast } = useToast()
    const [showSheet, setShowSheet] = useState(false)
    const [sheetTitle, setSheetTitle] = useState('');
    const [sheetOptions, setSheetOptions] = useState<any[]>([]);
    const [sheetValue, setSheetValue] = useState('');
    const [selectedCountry, setSelectedCountry] = useState<selected>(countries[0])
    const sheetRef = useRef<BottomSheet>(null)
    const { customerId } = useLocalSearchParams<{
        customerId: string
    }>()
    const { data: user, isLoading: userLoading,error: userError, refetch: userRefetch} = useUser()
    const { data: business, isLoading: businessLoading,error: businessError, refetch: businessRefetch} = useBusiness(user?.id)
    const businessId = business?.id
    const { data: selectedCustomer, isLoading: customerLoading, error: customerError, refetch:customerRefetch } = useCustomerById(customerId)
    const {
        mutateAsync: addCustomerMutation,
        isPending,
    } = useAddCustomer(businessId);
    const {
        mutateAsync: updateCustomerMutation,
        isPending: pending,
    } = useUpdateCustomer(businessId);
    const isLoading = pending || isPending
    const isDataLoading = userLoading || businessLoading || customerLoading
    const isErrorFetching = userError || businessError || customerError
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
            setCustomer({
                name: '',
                phone: '',
                email: '',
                address: '',
                city: '',
            })
            showToast(
                'success',
                'Customer details updated',
                "Customer details have been updated successfully."
            )


            router.back()

        } catch (error) {
            showToast(
                'error',
                'Unable to update customer',
                "We couldn’t update customer details. Please try again."
            )
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
            setCustomer({
                name: '',
                phone: '',
                email: '',
                address: '',
                city: '',
            })
            showToast(
                'success',
                'Customer Added',
                "Customer has been added successfully."
            )


            router.back()


        } catch (error) {
            showToast(
                'error',
                'Unable to add customer',
                "We couldn’t add customer. Please try again."
            )
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
    const handleRetry=()=>{
        userRefetch()
        businessRefetch()
        customerRefetch()
    }
    if(isDataLoading)
    {
        return(
            <SafeAreaView style={styles.container}>
                <Header title={customerId ? 'Edit Customer' : 'Add Customer'} onPress={() => router.back()} />
                     <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size='large' color={Colors.primary}/>
                </View>
                    </SafeAreaView>
        )
    }

    if (isErrorFetching) {
        return (
            <SafeAreaView style={styles.container}>
                <Header title={customerId ? 'Edit Customer' : 'Add Customer'} onPress={() => router.back()} />
                    
                <CustomEmptyComponent 
                isError={true}
                mainText='Something Went Wrong'
                subText='Unable to load product data. Please try again.'
                onPress={handleRetry}
                />

            </SafeAreaView>
        )
    }
    return (
        <View style={{ flex: 1 }}>


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
                            placeholder='someone@example.com'
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
