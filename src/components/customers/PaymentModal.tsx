import { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import fonts, { fontSize } from '../../constants/typography';
import Colors from '../../constants/colors';
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
    error?:string
    loading?:boolean
    onPressReceive?:()=>void
    // heading?: string
    // subHeading?: string
    // inputTitle?: string
    // stockTitle?: string
    // buttonTitle: string

    // onPressSave?: () => void,
    // stock: number
    // value: string
    // onChangeText?: any
    // error?: string
    // loader?: boolean
    // open?: boolean
    // onPressDrop?: () => void
    // onCloseDrop?: () => void;
    // onChangeReason?: (value: string) => void
    // reason?: string
    // reasonError?: string
}
const PaymentModal: React.FC<Props> = ({
    // onChangeReason, reasonError, reason, onCloseDrop, onPressDrop, open, loader, modalVisible, onPressCancel, onPressSave,
    // stock, value, onChangeText, error, heading, subHeading, inputTitle, stockTitle, buttonTitle 
    modalVisible, onPressCancel, name, due, value, onChangeText, currency,
    error, onPressReceive, loading
}) => {

    //const newStock = enteredStock + stock
    //const [reason, setReason] = useState('')
    return (
        <Modal visible={modalVisible} transparent={true} animationType='fade'>
            <View style={styles.modalView}>
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
                                    Remaining Balance after payment: {(Number(due) - Number(value)).toLocaleString()}
                                </Text>
                            </>

                        )
                    }

                    <Button
                        title='Record Payment'
                        onPress={onPressReceive}
                        isLoading={loading}
                        disabled={!value}
                    />
                </View>


            </View>
        </Modal>


    );
};


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
    }
});


export default PaymentModal;
