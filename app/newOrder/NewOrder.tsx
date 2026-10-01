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
import InputRow from '../../src/components/order/InputRow';
import { useUser } from '../../src/hooks/useUser';
import { useBusiness } from '../../src/hooks/useBusiness';
import { useCustomers } from '../../src/hooks/useCustomer';
import { useProducts } from '../../src/hooks/useProducts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
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
    const [discount, setDiscount] = useState('')
    const [amountPaid, setAmountPaid] = useState('')
    const [remainingAmount, setRemainingAmount] = useState('')
    const [selectedCustomer, setSelectedCustomer] = useState('')
    const [selectedProduct, setSelectedProduct] = useState('')
    const [showSheet, setShowSheet] = useState(false);
    const [sheetTitle, setSheetTitle] = useState('');
    const [sheetOptions, setSheetOptions] = useState<string[]>([]);
    const [sheetValue, setSheetValue] = useState('');
    const subtotal = orderItems.reduce(
        (sum: any, item: any) => sum + item.price * item.quantity,
        0
    );
    const customerNames = customers?.map(
        (item: any) => item.name
    ) ?? []
    const productNames = products?.map(
        (item: any) => item.name
    ) ?? []

    // handle product select
    const handleProductSelect = (selectedName: string) => {
        const selectedProductData = products?.find(
            item => item.name === selectedName
        );

        if (!selectedProductData) return;

        const alreadyExist = orderItems?.find(
            (item: any) => item.id === selectedProductData?.id
        )
        if (!alreadyExist) {
            setOrderItems([
                ...orderItems,
                {
                    ...selectedProductData,
                    quantity: 1
                }

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

    const increaseQuantity = (id: string) => {
        setOrderItems((prev: any) =>
            prev.map((item: any) => {
                if (item.id !== id) return item;

                return {
                    ...item,
                    quantity: Math.min(
                        item.quantity + 1,
                        item.stock_quantity
                    ),
                };
            })
        );
    };

    const decreaseQuantity = (id: string) => {
        setOrderItems((prev: any) =>
            prev.map((item: any) => {
                if (item.id !== id) return item;

                return {
                    ...item,
                    quantity: Math.max(item.quantity - 1, 1),
                };
            })
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <Header title='Create Order' onPress={() => router.back()} />
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
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
                    <View style={styles.searchRow}>
                        <View style={{ flex: 1 }}>
                            <Input
                                placeholder='Search products...'
                                title='Add Products'
                                isOrderInput={true}
                                // value={searchText}
                                // onChangeText={setSearchText}
                                iconName='search-outline'
                                iconType='Ionicons'
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.buttonAdd}
                            activeOpacity={0.7}
                            onPress={() => {
                                setShowSheet(true)
                                openSheet(
                                    'Select Product',
                                    productNames,
                                    selectedProduct
                                )
                            }}
                        >
                            <Icon
                                name='plus'
                                type='Entypo'
                                size={wp(6)}
                                color={Colors.surface}
                            />
                        </TouchableOpacity>
                    </View>




                    {
                        orderItems.length > 0 && (
                            <View>
                                <Text style={styles.titleText}>Price Summary</Text>
                                <View style={styles.summaryContainer}>
                                    {
                                        orderItems.map((item: any, index: number) => (
                                            <ItemCard
                                                key={index}
                                                name={item.name}
                                                price={item.price}
                                                currency={business?.currency}
                                                imageurl={item.image_url}
                                                stock={item.stock_quantity}
                                                quantity={item.quantity}
                                                onIcrease={() => increaseQuantity(item.id)}
                                                onDecrease={() => decreaseQuantity(item.id)}
                                                isLast={index === orderItems.length - 1}
                                            />
                                        ))
                                    }
                                </View>
                            </View>
                        )
                    }


                    {/* total overview */}

                    {
                        orderItems.length > 0 && (
                            <View>
                                <Text style={styles.titleText}>Price Summary</Text>
                                <View style={styles.summaryContainer}>
                                    <View style={styles.summaryRow}>
                                        <Text style={styles.summaryText}>Subtotal</Text>
                                        <Text style={styles.summaryText}>PKR {subtotal}</Text>
                                    </View>
                                    <InputRow
                                        title='Discount'
                                        value={discount}
                                        borderWidth={0.3}
                                        currency={business?.currency}
                                        onChangeText={(text: string) => {
                                            const value = Number(text);

                                            if (text === '' || value <= subtotal) {
                                                setDiscount(text);
                                            }
                                        }}
                                    />
                                    <View style={styles.summaryRow}>
                                        <Text style={styles.totalText}>Total</Text>
                                        <Text style={styles.totalText}>PKR {subtotal - Number(discount)}</Text>
                                    </View>
                                    <InputRow
                                        title='Amount Paid'
                                        value={amountPaid}
                                        //currency={business?.currency}
                                        onChangeText={(text:string)=>setAmountPaid(text)}
                                    />
                                </View>
                            </View>

                        )

                    }

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
