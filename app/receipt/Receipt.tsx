// import { useRef } from 'react';
// import { captureRef } from 'react-native-view-shot';
// import * as Sharing from 'expo-sharing';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { router } from 'expo-router';
// import { useUser } from '../../src/hooks/useUser';
// import { useBusiness } from '../../src/hooks/useBusiness';
// import { useOrderById } from '../../src/hooks/useOrderById';
// import { getInitials } from '../../src/services/getInitials';
// import { File, Paths } from 'expo-file-system';

// import * as Print from 'expo-print';
// import fonts, { fontSize } from '../../src/constants/typography';
// import ActionButton from '../../src/components/common/ActionButton';
// import Colors from '../../src/constants/colors';
// import styles from './ReceiptStyle';
// import Header from '../../src/components/common/Header';
// import InvoiceRow from '../../src/components/invoice/InvoiceRow';
// import { useLocalSearchParams } from 'expo-router';
// import { Image } from 'expo-image';
// const Receipt = () => {
//     const receiptRef = useRef<View | null>(null)
//     const { orderId, orderItems, totalAmount, discount,
//         amountPaid, remaining, customerName, subTotal } = useLocalSearchParams<{
//             orderId: string,
//             orderItems: string,
//             totalAmount: string,
//             discount: string,
//             amountPaid: string,
//             remaining: string,
//             customerName: string,
//             subTotal: string
//         }>()
//     const { data } = useUser()
//     const { data: business } = useBusiness(data?.id)
//     const businessLogo = business?.logo_url
//     const { data: order } = useOrderById(orderId)
//     const busineesInitials = getInitials(business?.name)
//     const orderItemsData = orderItems ? JSON.parse(orderItems) : []
//     console.log(orderItemsData);
//     // format date
//     const formattedDate = new Date(order?.created_at).toLocaleDateString(
//         'en-GB',
//         {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric',
//         }
//     );
//     // format time
//     const formattedTime = new Date(order?.created_at).toLocaleTimeString(
//         'en-US',
//         {
//             hour: '2-digit',
//             minute: '2-digit',
//             hour12: true,
//         }
//     );

//     // handle Share
//     const handleShare = async () => {
//         try {
//             if (!receiptRef.current) return;

//             const uri = await captureRef(receiptRef, {
//                 format: 'png',
//                 quality: 1,
//                 result: 'tmpfile',

//             });

//             if (!(await Sharing.isAvailableAsync())) {
//                 return;
//             }

//             await Sharing.shareAsync(uri, {
//                 mimeType: 'image/png',
//                 dialogTitle: 'Share Receipt',
//             });

//         } catch (error) {
//             console.log('Share receipt error:', error);
//         }
//     };

   
//     return (
//         <SafeAreaView style={styles.container}>
//             <Header title='Invoice' onPress={() => router.back()} />
//             <ScrollView

//                 contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
//                 showsVerticalScrollIndicator={false}>
//                 <View style={styles.invoiceContainer} ref={receiptRef} collapsable={false}>
//                     <View style={styles.invoice}>
//                         {
//                             businessLogo ? (
//                                 <Image
//                                     style={styles.logo}
//                                     source={{ uri: businessLogo }}

//                                 />
//                             ) : (
//                                 <View style={styles.logoAvatar}>
//                                     <Text style={styles.initial}>{busineesInitials}</Text>
//                                 </View>
//                             )
//                         }
//                         <Text style={[styles.invoiceNumber, styles.businessName]}>{business?.name}</Text>
//                         <Text style={styles.invoiceNumber}>Invoice# {order?.order_number}</Text>
//                         <Text style={styles.time}>{formattedDate}  {formattedTime}</Text>
//                         <Text style={styles.customer}>Customer: {customerName}</Text>
//                         <View style={styles.invoiceTable}>
//                             <InvoiceRow
//                                 name='Name'
//                                 quantity='Qty'
//                                 price='Price'
//                                 subTotal='Total'
//                                 isHeading={true}
//                             />
//                             {
//                                 orderItemsData.map((item: any, index: string) => {
//                                     const quantity = Number(item.quantity) || 0;
//                                     const unitPrice = Number(item.unit_price) || 0;
//                                     const subtotal = Number(quantity) * Number(unitPrice)

//                                     return (
//                                         <InvoiceRow
//                                             key={index}
//                                             name={item.name}
//                                             quantity={quantity}
//                                             price={unitPrice.toLocaleString()}
//                                             subTotal={subtotal.toLocaleString()}
//                                         />
//                                     )
//                                 })
//                             }

//                         </View>
//                         <View style={styles.totalContainer}>
//                             <Row
//                                 title='Subtotal'
//                                 text={Number(subTotal).toLocaleString()}
//                                 color={Colors.textSecondary}
//                                 fontSize={fontSize.smallText}
//                                 font={fonts.medium}
//                             />
//                             <Row
//                                 title='Discount'
//                                 text={Number(discount).toLocaleString()}
//                                 color={Colors.textSecondary}
//                                 fontSize={fontSize.smallText}
//                                 font={fonts.medium}
//                             />
//                             <Row
//                                 title='Total'
//                                 text={Number(totalAmount).toLocaleString()}
//                                 color={Colors.text}
//                                 fontSize={fontSize.text}
//                                 font={fonts.bold}
//                             />
//                             <Row
//                                 title='Amount Paid'
//                                 text={Number(amountPaid).toLocaleString()}
//                                 color={Colors.textSecondary}
//                                 fontSize={fontSize.smallText}
//                                 font={fonts.medium}
//                             />
//                             <Row
//                                 title='Return Amount'
//                                 text={(Number(amountPaid) - Number(totalAmount)).toLocaleString()}
//                                 color={Colors.textSecondary}
//                                 fontSize={fontSize.smallText}
//                                 font={fonts.medium}
//                             />
//                         </View>
//                         <Text style={styles.txtThank}>Thank You!</Text>
//                         <Text style={styles.visit}>Visit Again</Text>

//                     </View>

//                 </View>
//             </ScrollView>

//             <View style={styles.actionRow}>
//                 <ActionButton
//                     title='Print'
//                     iconName='print-outline'
//                     iconType='Ionicons'
//                 />
//                 <ActionButton
//                     title='Share'
//                     iconName='share-social-outline'
//                     iconType='Ionicons'
//                     onPress={handleShare}
//                 />
//                 {/* <ActionButton
//                     title='Export'
//                     iconName='export'
//                     iconType='Entypo'
//                     onPress={handleExport}
//                 /> */}

//             </View>
//         </SafeAreaView>
//     );
// };


// const Row = ({ text, title, color, fontSize, font }:
//     { text: string | number, title: string, color: string, fontSize: number, font: string }
// ) => {
//     return (
//         <View style={styles.row}>
//             <Text style={[styles.textPrice, { color: color, fontSize: fontSize, fontFamily: font }]}>{title}</Text>
//             <Text style={[styles.textPrice, { color: color, fontSize: fontSize, fontFamily: font }]}>{text}</Text>
//         </View>
//     )
// }

// export default Receipt;





import { useRef } from 'react';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

import { useUser } from '../../src/hooks/useUser';
import { useBusiness } from '../../src/hooks/useBusiness';
import { useOrderById } from '../../src/hooks/useOrderById';

import { getInitials } from '../../src/services/getInitials';

import fonts, { fontSize } from '../../src/constants/typography';
import ActionButton from '../../src/components/common/ActionButton';
import Colors from '../../src/constants/colors';
import styles from './ReceiptStyle';
import Header from '../../src/components/common/Header';
import InvoiceRow from '../../src/components/invoice/InvoiceRow';

import { Image } from 'expo-image';

const Receipt = () => {
    const receiptRef = useRef<View | null>(null);

    const { orderId } = useLocalSearchParams<{
        orderId: string;
    }>();

    const { data } = useUser();
    const { data: business } = useBusiness(data?.id);
    const { data: order } = useOrderById(orderId);

    const businessLogo = business?.logo_url;
    const busineesInitials = getInitials(business?.name);

    // Order items
    const orderItems = order?.order_items ?? [];

    // Subtotal
    const subTotal = orderItems.reduce((total:any, item:any) => {
        const quantity = Number(item.quantity) || 0;
        const unitPrice = Number(item.unit_price) || 0;

        return total + quantity * unitPrice;
    }, 0);

    // Order values
    const totalAmount = Number(order?.total_amount) || 0;
    const amountPaid = Number(order?.paid_amount) || 0;

    // Return amount
    const returnAmount = Math.max(amountPaid - totalAmount, 0);

    // Discount
    const discount = Math.max(subTotal - totalAmount, 0);

    // Format date
    const formattedDate = order?.created_at
        ? new Date(order.created_at).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
        : '';

    // Format time
    const formattedTime = order?.created_at
        ? new Date(order.created_at).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        })
        : '';

    // Handle Share
    const handleShare = async () => {
        try {
            if (!receiptRef.current) return;

            const uri = await captureRef(receiptRef, {
                format: 'png',
                quality: 1,
                result: 'tmpfile',
            });

            if (!(await Sharing.isAvailableAsync())) {
                return;
            }

            await Sharing.shareAsync(uri, {
                mimeType: 'image/png',
                dialogTitle: 'Share Receipt',
            });

        } catch (error) {
            console.log('Share receipt error:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title='Invoice'
                onPress={() => router.back()}
            />

            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: 20
                }}
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={styles.invoiceContainer}
                    ref={receiptRef}
                    collapsable={false}
                >
                    <View style={styles.invoice}>

                        {
                            businessLogo ? (
                                <Image
                                    style={styles.logo}
                                    source={{ uri: businessLogo }}
                                />
                            ) : (
                                <View style={styles.logoAvatar}>
                                    <Text style={styles.initial}>
                                        {busineesInitials}
                                    </Text>
                                </View>
                            )
                        }

                        <Text
                            style={[
                                styles.invoiceNumber,
                                styles.businessName
                            ]}
                        >
                            {business?.name}
                        </Text>

                        <Text style={styles.invoiceNumber}>
                            Invoice# {order?.order_number}
                        </Text>

                        <Text style={styles.time}>
                            {formattedDate} {formattedTime}
                        </Text>

                        <Text style={styles.customer}>
                            Customer: {order?.customer?.name ?? 'Walk-in Customer'}
                        </Text>

                        {
                            order?.customer?.phone && (
                                <Text style={styles.customer}>
                                    Phone: {order.customer.phone}
                                </Text>
                            )
                        }

                        <View style={styles.invoiceTable}>

                            <InvoiceRow
                                name='Name'
                                quantity='Qty'
                                price='Price'
                                subTotal='Total'
                                isHeading={true}
                            />

                            {
                                orderItems.map((item: any) => {
                                    const quantity =
                                        Number(item.quantity) || 0;

                                    const unitPrice =
                                        Number(item.unit_price) || 0;

                                    const subtotal =
                                        quantity * unitPrice;

                                    return (
                                        <InvoiceRow
                                            key={item.id}
                                            name={item.product?.name}
                                            quantity={quantity}
                                            price={unitPrice.toLocaleString()}
                                            subTotal={subtotal.toLocaleString()}
                                        />
                                    );
                                })
                            }

                        </View>

                        <View style={styles.totalContainer}>

                            <Row
                                title='Subtotal'
                                text={subTotal.toLocaleString()}
                                color={Colors.textSecondary}
                                fontSize={fontSize.smallText}
                                font={fonts.medium}
                            />

                            <Row
                                title='Discount'
                                text={discount.toLocaleString()}
                                color={Colors.textSecondary}
                                fontSize={fontSize.smallText}
                                font={fonts.medium}
                            />

                            <Row
                                title='Total'
                                text={totalAmount.toLocaleString()}
                                color={Colors.text}
                                fontSize={fontSize.text}
                                font={fonts.bold}
                            />

                            <Row
                                title='Amount Paid'
                                text={amountPaid.toLocaleString()}
                                color={Colors.textSecondary}
                                fontSize={fontSize.smallText}
                                font={fonts.medium}
                            />

                            <Row
                                title='Return Amount'
                                text={returnAmount.toLocaleString()}
                                color={Colors.textSecondary}
                                fontSize={fontSize.smallText}
                                font={fonts.medium}
                            />

                        </View>

                        <Text style={styles.txtThank}>
                            Thank You!
                        </Text>

                        <Text style={styles.visit}>
                            Visit Again
                        </Text>

                    </View>
                </View>
            </ScrollView>

            <View style={styles.actionRow}>

                <ActionButton
                    title='Print'
                    iconName='print-outline'
                    iconType='Ionicons'
                />

                <ActionButton
                    title='Share'
                    iconName='share-social-outline'
                    iconType='Ionicons'
                    onPress={handleShare}
                />

            </View>

        </SafeAreaView>
    );
};


const Row = ({
    text,
    title,
    color,
    fontSize,
    font
}: {
    text: string | number;
    title: string;
    color: string;
    fontSize: number;
    font: string;
}) => {
    return (
        <View style={styles.row}>
            <Text
                style={[
                    styles.textPrice,
                    {
                        color: color,
                        fontSize: fontSize,
                        fontFamily: font
                    }
                ]}
            >
                {title}
            </Text>

            <Text
                style={[
                    styles.textPrice,
                    {
                        color: color,
                        fontSize: fontSize,
                        fontFamily: font
                    }
                ]}
            >
                {text}
            </Text>
        </View>
    );
};

export default Receipt;
