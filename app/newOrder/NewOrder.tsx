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
import CustomToast from '../../src/components/common/CustomToast';
import { useUser } from '../../src/hooks/useUser';
import { useBusiness } from '../../src/hooks/useBusiness';
import { useCustomers } from '../../src/hooks/useCustomer';
import { useProducts } from '../../src/hooks/useProducts';
import { useCreateOrder } from '../../src/hooks/useCreateOrder';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import CustomBottomSheet from '../../src/components/common/CustomBottomSheet';
import Button from '../../src/components/common/Button';
import ItemCard from '../../src/components/order/ItemCard';
import BottomSheet from '@gorhom/bottom-sheet';

const NewOrder = () => {
    const { data: user } = useUser()
    const { data: business } = useBusiness(user?.id)
    const { data: customers } = useCustomers(business?.id)
    const { data: products } = useProducts(business?.id)
    const [emptyMessage, setEmptyMessage] = useState('')
    const [emptyTitle, setEmptyTitle] = useState('')
    const {
        mutateAsync: createOrderMutation,
        isPending,
    } = useCreateOrder(business?.id);
    const [toastTitle, setToastTitle] = useState('')
    const [toastMessage, setToastMessage] = useState('')
    const [showToast, setShowToast] = useState(false)
    const [toastType, setToastType] = useState<'success' | 'error'>('error')
    const sheetRef = useRef<BottomSheet>(null)
    const [orderItems, setOrderItems] = useState<any>([])
    const [discount, setDiscount] = useState('')
    const [amountPaid, setAmountPaid] = useState('')
    const [displayKeys, setDisplayKeys] = useState<string[]>([])
    const [placeholder, setPlaceholder] = useState('')
    const [remainingAmount, setRemainingAmount] = useState('')
    const [selectedCustomer, setSelectedCustomer] = useState('')
    const [selectedCustomerData, setSelectedCustomerData] = useState<any>(null)
    const [selectedProduct, setSelectedProduct] = useState()
    const [showSheet, setShowSheet] = useState(false);
    const [sheetTitle, setSheetTitle] = useState('');
    const [sheetOptions, setSheetOptions] = useState<any[]>([]);
    const [sheetValue, setSheetValue] = useState('');

    const subtotal = orderItems.reduce(
        (sum: any, item: any) => sum + item.price * item.quantity,
        0
    );
    const totalAmount = subtotal - Number(discount);
    const remaining = totalAmount - Number(amountPaid);
    const customerNames = customers?.map(
        (item: any) => item.name
    ) ?? []
    const productNames = products?.map(
        (item: any) => item.name
    ) ?? []

    // handle customer select
    const handleCustomerSelect = (selectedCustomer: string) => {
        const selectedCustomerData = customers?.find(
            item => item.name === selectedCustomer
        )
        if (!selectedCustomerData) return;
        setSelectedCustomerData(selectedCustomerData)

    }
    // handle product select
    const handleProductSelect = (selectedProduct: any) => {
        // const selectedProductData = products?.find(
        //     item => item.name === selectedName
        // );

        // if (!selectedProductData) return;

        const alreadyExist = orderItems?.find(
            (item: any) => item.product_id === selectedProduct?.id
        )
        if (selectedProduct.stock_quantity <= 0) {
            setToastType('error')
            setToastTitle('Out of stock')
            setToastMessage('This item is out of stock. This cannot be added')
            setShowToast(true)
            return;
        }

        if (!alreadyExist) {
            setOrderItems([
                ...orderItems,
                {
                    // ...selectedProductData,
                    // quantity: 1

                    // Supabase ke liye
                    product_id: selectedProduct.id,
                    quantity: 1,
                    unit_price: selectedProduct.price,
                    subtotal: selectedProduct.price,

                    // UI ke liye
                    name: selectedProduct.name,
                    price: selectedProduct.price,

                    image_url: selectedProduct.image_url,
                    stock_quantity: selectedProduct.stock_quantity,
                }

            ])
        }

    };
    // Open Sheet
    const openSheet = (
        title: string,
        options: any[],
        value: any,
        displayKeys: string[],
        placeholder: string,
        empTit: string,
        empMes: string,


    ) => {
        setSheetTitle(title);
        setSheetOptions(options);
        setSheetValue(value);
        setDisplayKeys(displayKeys)
        setPlaceholder(placeholder)
        setEmptyTitle(empTit)
        setEmptyMessage(empMes)

        sheetRef.current?.snapToIndex(0);
    };


    // Select Value Handler
    const handleSelect = (value: any) => {
        if (sheetTitle === 'Select Customer') {
            setSelectedCustomer(value);
            handleCustomerSelect(value)
        }
        if (sheetTitle === 'Select Product') {
            setSelectedProduct(value);
            handleProductSelect(value)
        }
        sheetRef.current?.close();
        setShowSheet(false);
    };

    const increaseQuantity = (productId: string) => {
        setOrderItems((prev: any) =>
            prev.map((item: any) => {
                if (item.product_id !== productId) return item;

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

    const decreaseQuantity = (productId: string) => {
        setOrderItems((prev: any) =>
            prev.map((item: any) => {
                if (item.product_id !== productId) return item;

                return {
                    ...item,
                    quantity: Math.max(item.quantity - 1, 1),
                };
            })
        );
    };

    // Creat order

    const createOrder = async () => {
        try {
            const result = await createOrderMutation({
                businessId: business.id,
                customerId: selectedCustomerData?.id ?? null,
                totalAmount,
                paidAmount: Number(amountPaid),
                items: orderItems,
            });
            console.log('creatd', result);
            setToastType('success')
            setToastTitle('Order Processed')
            setToastMessage('Order Deatails processed successfully.')
            setShowToast(true)
            setTimeout(() => {
                router.push({
                    pathname: '/receipt/Receipt',
                    params: {
                        orderId: result,
                        orderItems: JSON.stringify(orderItems),
                        totalAmount: String(totalAmount),
                        subTotal: String(subtotal),
                        discount: String(discount),
                        amountPaid: String(amountPaid),
                        remaining: String(remainingAmount),
                        customerName: selectedCustomer
                    }
                })
            }, 3100)

        }
        catch (error: any) {
            console.log(error?.message)
            setToastType('error')
            setToastTitle('Unable to create order')
            setToastMessage('Order details could not be processed at the moment.')
            setShowToast(true)
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <CustomToast
                    messageTitle={toastTitle}
                    messageDescription={toastMessage}
                    type={toastType}
                    visible={showToast}
                    onHide={() => setShowToast(false)}
                />
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
                                    selectedCustomer,
                                    [],
                                    'customers',
                                    'No Customers Yet',
                                    'Add customers first to create order'
                                )
                            }}
                        />
                        <AddRow
                            text='Add Customer'
                            onPress={() => router.push('/addCustomer/AddCustomer')}
                        />
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
                                    products ?? [],
                                    selectedProduct,
                                    ['name', 'price', 'stock_quantity'],
                                    'products',
                                    'No Products Yet',
                                    'Add products first to create order'
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
                                <Text style={styles.titleText}>Order Items</Text>
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
                                                onIcrease={() => increaseQuantity(item.product_id)}
                                                onDecrease={() => decreaseQuantity(item.product_id)}
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
                                <Text style={styles.titleText}>Price Summary
                                    <Text style={styles.titleTextCurrency}> ({business?.currency})</Text>
                                </Text>
                                <View style={styles.summaryContainer}>
                                    <View style={styles.summaryRow}>
                                        <Text style={styles.summaryText}>Subtotal</Text>
                                        <Text style={styles.summaryText}>{subtotal.toLocaleString()}</Text>
                                    </View>
                                    <InputRow
                                        title='Discount'
                                        value={discount}
                                        borderWidth={0.3}
                                        //currency={business?.currency}
                                        onChangeText={(text: string) => {
                                            const value = Number(text);

                                            if (text === '' || value <= subtotal) {
                                                setDiscount(text);
                                            }
                                        }}
                                    />
                                    <View style={styles.summaryRow}>
                                        <Text style={styles.totalText}>Total</Text>
                                        <Text style={styles.totalText}>{totalAmount.toLocaleString()}</Text>
                                    </View>

                                </View>
                            </View>

                        )

                    }

                    {
                        orderItems.length > 0 && (
                            <View>
                                <Text style={styles.titleText}>Amount Summary
                                    <Text style={styles.titleTextCurrency}> ({business?.currency})</Text>
                                </Text>
                                <View style={styles.summaryContainer}>

                                    <InputRow
                                        title='Amount Paid'
                                        value={amountPaid}
                                        //currency={business?.currency}
                                        onChangeText={(text: string) => setAmountPaid(text)}
                                    />
                                    {
                                        (amountPaid !== '' && Number(amountPaid) > Number(totalAmount)) && (
                                            <View style={styles.summaryRow}>
                                                <Text style={styles.totalText}>Change to return</Text>
                                                <Text style={styles.totalText}>{remaining.toLocaleString()}</Text>
                                            </View>
                                        )



                                    }
                                    {
                                        (amountPaid !== '' && Number(amountPaid) < Number(totalAmount)) && (
                                            <View style={styles.summaryRow}>
                                                <Text style={styles.totalText}>Remaining Credit (udhar)</Text>
                                                <Text style={styles.totalText}>{remaining.toLocaleString()}</Text>
                                            </View>
                                        )



                                    }


                                </View>
                            </View>

                        )

                    }

                </ScrollView>
                <View style={styles.button}>
                    <Button
                        title='Create order & continue'
                        onPress={createOrder}
                        isLoading={isPending}
                        disabled={orderItems.length === 0 || !selectedCustomer || !totalAmount}
                    />
                </View>
            </SafeAreaView>
            {
                showSheet && (
                    <CustomBottomSheet
                        searchable={true}
                        bottomSheetRef={sheetRef}
                        searchPlaceholder={placeholder}
                        options={sheetOptions}
                        title={sheetTitle}
                        onSelect={handleSelect}
                        displayKeys={displayKeys}
                        currency={business?.currency}
                        emptyMessage={emptyMessage}
                        emptyTitle={emptyTitle}
                    //value=
                    />
                )

            }
        </View>

    );
};


const AddRow = ({ text, onPress }: { text: string, onPress: () => void }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={styles.addButton}
            onPress={onPress}
        >
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
