import { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import fonts, { fontSize } from '../../constants/typography';
import Colors from '../../constants/colors';
import LottieView from 'lottie-react-native';
import Icon from '../common/Icon';
import Input from '../common/Input';
import Button from '../common/Button';

interface Props {
    onPressCancel?: () => void
    modalVisible?: boolean
    name: string
    due: string | number
    value: string
    onChangeText: any
    currency?: string
    error?: string
    loading?: boolean
    onPressReceive?: () => void
    done?:boolean,
    onPressDone?:()=>void
    prev?:number | string
    newBalance?:number | string
    amount?:number | string
}
const PaymentModal: React.FC<Props> = ({
    modalVisible, onPressCancel, name, due, value, onChangeText, currency,
    error, onPressReceive, loading, done, onPressDone, prev, newBalance, amount
}) => {

    //const newStock = enteredStock + stock
    //const [reason, setReason] = useState('')
    const remainingBalance = Number(due) - Number(value)
    const received = value
    return (
        <Modal visible={modalVisible} transparent={true} animationType='fade'>
            <View style={styles.modalView}>
                {
                    done ? (
                        <PaymentDone
                    due={prev}
                    customer={name}
                    received={amount}
                    newBalance={newBalance}
                    //newBalance={remainingBalance}
                    currency={currency}
                    onPress={onPressDone}
                    />
                    ) : (
                        <View style={styles.modalContentView}>
                    
                    <View style={styles.header}>
                        <Text style={styles.heading}>Receive Payment</Text>
                        <TouchableOpacity
                            onPress={onPressCancel}
                            style={styles.icon}
                        >
                            <Icon
                                name='cross'
                                type='Entypo'
                                size={wp(6)}
                                color={Colors.text}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.iconInfo}>
                            <Icon
                                name='clipboard-outline'
                                type='Ionicons'
                                size={wp(6)}
                                color={Colors.primary}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <View>
                                <Text style={styles.textHeading}>Customer Name</Text>
                                <Text style={styles.textDes}>{name}</Text>
                            </View>
                            <View>
                                <Text style={styles.textHeading}>Customer Due</Text>
                                <Text style={styles.textDes}>{currency} {due.toLocaleString()}</Text>
                            </View>
                        </View>
                    </View>
                    <Input
                        title='Payment Amount'
                        placeholder='PKR 0'
                        value={value}
                        onChangeText={onChangeText}
                        keyboard='numeric'
                        error={error}
                    />
                    {
                        (value !== '') && (
                            <>
                                {/* <Text style={styles.textDes}>
                                    Remaining Balance: {due} - {value}
                                </Text> */}
                                <Text style={[styles.textDes, { marginBottom: hp(2) }]}>
                                    Remaining Balance after payment: {remainingBalance.toLocaleString()}
                                </Text>
                            </>

                        )
                    }

                    <Button
                        title='Receive Payment'
                        onPress={onPressReceive}
                        isLoading={loading}
                        disabled={!value}
                    />
                    
                </View>


                    )
                }
                
            </View>
        </Modal>


    );
};
interface payProps{
    received?:number | string
    due?:number | string
    newBalance?:string | number
    customer?:string
    currency?:string
    onPress?:()=>void
}
const PaymentDone:React.FC<payProps> = ({received, due, newBalance, customer, currency, onPress}) => {
    return (
        
        <View style={styles.modalContentView}>
        <View>
            <LottieView
            source={require('../../../assets/animations/Success.json')}
            style={styles.animation}
            autoPlay
            loop={false}
            // colorFilters={[
            //     {
            //         keypath: 'Background',
            //         color: Colors.primary
            //     }
            // ]}
            />
            <Text style={styles.paymentText}>Payment Received!</Text>
            <Text style={styles.recText}>{currency} {received} received from {customer}.</Text> 
            <View style={styles.textView}>
                <View style={[styles.textRow, {borderBottomWidth: 0.3}]}>
                    <Text style={styles.textPaid}>
                        Previous Due
                    </Text>
                    <Text style={styles.textPaid}>
                        {currency} {due?.toLocaleString()}
                    </Text>
                </View>
                <View style={styles.textRow} >
                    <Text style={styles.textPaid}> 
                        New Balance
                    </Text>
                    <Text style={styles.textPaid}>
                        {currency} {newBalance?.toLocaleString()}
                    </Text>
                </View>
            </View>
            <Button
                        title='Done'
                        onPress={onPress}
                    />
        </View>
        </View>
    )
}
const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContentView: {

        elevation: 3,
        backgroundColor: Colors.background,
        width: wp(90),
        alignSelf: 'center',
        borderRadius: wp(2),
        padding: wp(5),
        //justifyContent: 'center',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(3)
    },
    icon: {
        width: wp(8),
        height: wp(8),
        borderRadius: wp(4),
        backgroundColor: Colors.surface,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: fontSize.subHeading,
        fontFamily: fonts.bold,
        color: Colors.text,
    },
    infoContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        padding: wp(3),
        borderRadius: wp(2),
        borderColor: Colors.border,
        marginBottom: hp(2)
    },
    textContainer: {
        flex: 1,
        marginLeft: wp(3),
        gap: 10
    },
    iconInfo: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        backgroundColor: Colors.successLight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textHeading: {
        fontSize: fontSize.smallText,
        fontFamily: fonts.medium,
        color: Colors.textSecondary
    },
    textDes: {
        fontSize: fontSize.text,
        fontFamily: fonts.semiBold,
        color: Colors.text
    },
    animation:{
        width: wp(50),
        height: wp(28),
        alignSelf: 'center',
        marginTop: hp(4)
    },
    paymentText:{
        fontFamily: fonts.extraBold,
        fontSize: fontSize.heading,
        color: Colors.text,
        textAlign: 'center',
        marginBottom: hp(0.5)
    },
    recText:{
        fontFamily: fonts.medium,
        fontSize: fontSize.text,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: hp(3)
    },
    textView:{
        borderRadius: wp(2),
        padding: wp(3),
        backgroundColor: Colors.border,
        marginBottom:hp(3)
    },
    textRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: hp(1)
    },
    textPaid:{
        fontFamily: fonts.semiBold,
        fontSize: fontSize.text,
        color: Colors.text
    }
});


export default PaymentModal;





