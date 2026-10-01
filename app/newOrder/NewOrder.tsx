import { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styles from './NewOrderStyle';
import Header from '../../src/components/common/Header';
import { router } from 'expo-router';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../../src/constants/colors';
import Icon from '../../src/components/common/Icon';
import SelectInput from '../../src/components/common/SelectInput';
import Input from '../../src/components/common/Input';
import { useUser } from '../../src/hooks/useUser';
import { useBusiness } from '../../src/hooks/useBusiness';
import { useCustomers } from '../../src/hooks/useCustomer';
import { useProducts } from '../../src/hooks/useProducts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import CustomBottomSheet from '../../src/components/common/CustomBottomSheet';
import ItemCard from '../../src/components/order/ItemCard';
import BottomSheet from '@gorhom/bottom-sheet';

const NewOrder = () => {
    const { data: user } = useUser()
    const { data: business } = useBusiness(user?.id)
    const { data: customers } = useCustomers(business?.id)
    const { data: products } = useProducts(business?.id)
    const sheetRef = useRef<BottomSheet>(null)
    const [orderItems, setOrderItems] = useState<any>([])
    const [selectedCustomer, setSelectedCustomer] = useState('')
    const [selectedProduct, setSelectedProduct] = useState('')
    const [showSheet, setShowSheet] = useState(false);
    const [sheetTitle, setSheetTitle] = useState('');
    const [sheetOptions, setSheetOptions] = useState<string[]>([]);
    const [sheetValue, setSheetValue] = useState('');
    const customerNames = customers?.map(
        (item: any) => item.name
    ) ?? []
    const productNames = products?.map(
        (item: any) => item.name
    ) ?? []

    const handleProductSelect = (selectedName: string) => {
        const selectedProductData = products?.find(
            item => item.name === selectedName
        );

        if (!selectedProductData) return;

        const alreadyExist = orderItems?.find(
            (item: any) => item.name === selectedName
        )
        if (!alreadyExist) {
            setOrderItems([
                ...orderItems,
                selectedProductData
            ])
        }

    };
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
        if (sheetTitle === 'Select Customer') {
            setSelectedCustomer(value);
        }
        if (sheetTitle === 'Select Product') {
            setSelectedProduct(value);
            handleProductSelect(value)
        }
        sheetRef.current?.close();
        setShowSheet(false);
    };


    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <Header title='Create Order' onPress={() => router.back()} />
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.slectCustomer}>
                        <SelectInput
                            title='Customer'
                            placeholder='Select customer'
                            iconName='person-outline'
                            iconType='Ionicons'
                            value={selectedCustomer}
                            onPress={() => {
                                setShowSheet(true)
                                openSheet(
                                    'Select Customer',
                                    customerNames,
                                    selectedCustomer
                                )
                            }}
                        />
                        <AddRow text='Add Customer' />
                    </View>
                    {/* <View style={styles.slectCustomer}> */}
                        <SelectInput
                            title='Products'
                            placeholder='Select Products'
                            iconName='cube-outline'
                            iconType='Ionicons'
                            value={selectedProduct}
                            onPress={() => {
                                setShowSheet(true)
                                openSheet(
                                    'Select Product',
                                    productNames,
                                    selectedProduct
                                )
                            }}
                        />
                        <Input
                            placeholder='Search products...'
                            // value={searchText}
                            // onChangeText={setSearchText}
                            iconName='search-outline'
                            iconType='Ionicons'
                        />
                        {
                            orderItems.map((item: any, index: number) => (
                                <ItemCard
                                key={index}
                                    name={item.name}
                                    price={item.price}
                                    currency={business?.currency}
                                    imageurl={item.image_url}
                                    stock={item.stock_quantity}
                                />
                            ))
                        }
                    {/* </View> */}
                </ScrollView>
            </SafeAreaView>
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


const AddRow = ({ text }: { text: string }) => {
    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.addButton}>
            <Icon
                name='plus'
                type='Entypo'
                size={wp(5)}
                color={Colors.primary}
            />
            <Text style={styles.textButton}>{text}</Text>
        </TouchableOpacity>
    )
}
export default NewOrder;
