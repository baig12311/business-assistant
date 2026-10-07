import { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import fonts, { fontSize } from '../../constants/typography';
import Colors from '../../constants/colors';
import Icon from '../common/Icon';
import Input from '../common/Input';
import Button from '../common/Button';
import DropdownInput from './DropdownInput';
interface Props {
    modalVisible?: boolean,
    heading?:string
    subHeading?:string
    inputTitle?:string
    stockTitle?:string
    buttonTitle:string
    onPressCancel?: () => void,
    onPressSave?: () => void,
    stock: number
    value: string
    onChangeText?: any
    error?:string
    loader?: boolean
    open?:boolean
    onPressDrop?:()=>void
    onCloseDrop?: () => void;
}
const RestockModal: React.FC<Props> = ({onCloseDrop, onPressDrop, open, loader, modalVisible, onPressCancel, onPressSave, 
    stock, value, onChangeText, error, heading, subHeading, inputTitle, stockTitle, buttonTitle}) => {
    const enteredStock = Number(value)
    //const newStock = enteredStock + stock
    const [reason, setReason] = useState('')
    return (
        <Modal visible={modalVisible} transparent={true} animationType='fade'>
            <View style={styles.modalView}>
                <View style={styles.modalContentView}>
                    <View style={styles.header}>
                        <Text style={styles.heading}>{heading}</Text>
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
                    <Text style={styles.subHeading}>{subHeading}</Text>
                    <Text style={styles.stock}>Current Stock: {stock} units</Text>

                    <Input
                        title={inputTitle}
                        placeholder='0'
                        value={value}
                        onChangeText={onChangeText}
                        keyboard='numeric'
                        error={error}
                    />
                    {value !== '' && (
                        <Text style={styles.stock}>
                            {stockTitle}: {enteredStock + stock} units
                        </Text>
                    )}

                    {
                        heading === 'Adjust Stock' && (
                            <DropdownInput
                            value={reason}
                            open={open}
                            onPress={onPressDrop}
                            onChange={(value)=>{
                                setReason(value)
                                onCloseDrop?.()
                            }}
                            />
                        )
                    }
                    <View style={styles.button}>
                        <Button
                        title={buttonTitle}
                        onPress={onPressSave}
                        isLoading={loader}
                        disabled={!value}
                        />
                    </View>
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
    subHeading: {
        fontSize: fontSize.text,
        fontFamily: fonts.medium,
        color: Colors.textSecondary,
        marginBottom: hp(3)
    },
    stock: {
        fontSize: fontSize.text,
        fontFamily: fonts.medium,
        color: Colors.text,
        marginBottom: hp(2),
        borderWidth: 0.3,
        paddingLeft: wp(3),
        //textAlign: 'center',
        //alignSelf: 'center',
        width: wp(50),
        paddingVertical: wp(2),
        borderRadius: wp(2),
        borderColor: Colors.textSecondary
    },
    button:{
        marginTop: hp(1)
    }
});


export default RestockModal;
