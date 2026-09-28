import { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import styles from './BusinessStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../../src/components/common/Input';
import SelectInput from '../../src/components/common/SelectInput';
import Button from '../../src/components/common/Button';
import { supabase } from '../../src/lib/supabase';
import { router } from 'expo-router';
import { useUser } from '../../src/hooks/useUser';
import CustomBottomSheet from '../../src/components/common/CustomBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { currencies } from '../../src/services/data/currencies';
import { businessCategories } from '../../src/services/data/categories';
const BusinessSetup = () => {
    const {data:user, isLoading, error} = useUser()
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState('')
    const [currency, setCurrency] = useState('')
    const [businessName, setBusinessName] = useState('')
    const [number, setNumber] = useState('')
    const [showSheet, setShowSheet] = useState(false)
    const [sheetTitle, setSheetTitle] = useState('');
    const [sheetOptions, setSheetOptions] = useState<string[]>([]);
    const [sheetValue, setSheetValue] = useState('');
    const sheetRef = useRef<BottomSheet>(null)

    // Open Sheet
    const openSheet = (
        title: string,
        options: string[],
        value: string
    ) => {
        setSheetTitle(title);
        setSheetOptions(options);
        setSheetValue(value);

        sheetRef.current?.snapToIndex(0);
    };

    // Select Value Handler
    const handleSelect = (value: string) => {
        if (sheetTitle === 'Select Category') {
            setCategory(value);
        }
        if (sheetTitle === 'Select Currency') {
            setCurrency(value);
        }
        sheetRef.current?.close();
        setShowSheet(false);
    };

    // Hande Create Business
    const createBusiness = async () => {
        setLoading(true)
        if (!user) {
            console.log('No authenticated user');
            return;
        }
        const { data, error } = await supabase
            .from('businesses')
            .insert({
                owner_id: user.id,
                name: businessName,
                category: category,
                currency: currency,
                whatsapp_number: number
            })
            .select()
            .single();
        if (error) {
            console.log('Create Business Error:', error.message);
            return;
        }
        router.replace('/Home')
        setLoading(false)
        console.log('Business Created:', data);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.heading}>Business Information</Text>

                    <Input
                        title='Business Name'
                        placeholder='John Traders'
                        iconName='storefront-outline'
                        iconType='Ionicons'
                        value={businessName}
                        onChangeText={setBusinessName}
                    />
                    <SelectInput
                        title='Category'
                        placeholder='Select Category'
                        value={category}
                        iconName='apps-outline'
                        iconType='Ionicons'
                        onPress={() => {
                            setShowSheet(true)
                            openSheet(
                                'Select Category',
                                businessCategories,
                                category

                            )
                        }}
                    />
                    <Input
                        title='Whatsapp number'
                        placeholder='+92 XXXXXXXXXX'
                        iconName='call-outline'
                        iconType='Ionicons'
                        keyboard='phone-pad'
                        value={number}
                        onChangeText={setNumber}
                    />
                    <SelectInput
                        title='Currency'
                        placeholder='Select Currency'
                        iconName='currency-usd'
                        iconType='MaterialDesignIcons'
                        value={currency}
                        onPress={() => {
                            setShowSheet(true)
                            openSheet(
                                'Select Currency',
                                currencies,
                                currency

                            )
                        }}
                    />
                    <View style={styles.button}>
                        <Button
                            title='Create Business'
                            onPress={createBusiness}
                            isLoading={loading}
                        />
                    </View>


                    {
                        showSheet && (
                            <CustomBottomSheet
                                bottomSheetRef={sheetRef}
                                options={sheetOptions}
                                title={sheetTitle}
                                onSelect={handleSelect}
                            //value=
                            />
                        )
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default BusinessSetup;
