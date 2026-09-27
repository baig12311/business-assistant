import { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './BusinessStyle';
import Input from '../../src/components/common/Input';
import SelectInput from '../../src/components/common/SelectInput';
import Button from '../../src/components/common/Button';
import { logout } from '../../src/services/authService';
import CustomBottomSheet from '../../src/components/common/CustomBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { currencies } from '../../src/services/data/currencies';
import { businessCategories } from '../../src/services/data/categories';
const BusinessSetup = () => {
    const [category, setCategory] = useState('')
    const [currency, setCurrency] = useState('')
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
    return (
        <View style={styles.container}>
            <Text>Business Informations</Text>
            <Input
                title='Business Name'
                placeholder='John Traders'
            />
            <SelectInput
                title='Category'
                placeholder='Select Category'
                value={category}
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
            />
            <SelectInput
                title='Currency'
                placeholder='Select Currency'
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
            
            <Button
                title='Log Out'
                onPress={logout}
            />

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

        </View>
    );
};

export default BusinessSetup;
