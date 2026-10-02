import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import fonts, { fontSize } from '../../constants/typography';
import Colors from '../../constants/colors';
import Icon from './Icon';
interface Props {
    modalVisible?: boolean,
    onPressCancel?: () => void,
    onPressDelete?: () => void,
    msg?: string,
    txtButton?: string,
    title?: string
}
const ConfirmationDialog: React.FC<Props> = ({ title, modalVisible, onPressCancel, onPressDelete, msg, txtButton }) => {
    return (
        <Modal visible={modalVisible} transparent={true} animationType='fade'>
            <View style={styles.modalView}>
                <View style={styles.modalContentView}>
                    <View style={styles.icon}>
                        <Icon
                            name='trash-outline'
                            type='Ionicons'
                            size={wp(6)}
                            color={Colors.error}
                        />
                    </View>
                    <Text style={styles.txtAtten}>{title}</Text>
                    <Text style={styles.msg}>{msg}</Text>
                    <View style={styles.buttonContianer}>
                        <TouchableOpacity
                            onPress={onPressCancel}
                            activeOpacity={0.7}
                            style={styles.cancelButton}
                        >
                            <Text style={[styles.txt, styles.txtCancel]}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onPressDelete}
                            activeOpacity={0.7}
                            style={styles.dltButton}

                        >
                            <Text style={[styles.txt, {
                                color: Colors.surface
                            }]}>
                                {txtButton}</Text>
                        </TouchableOpacity>
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
        //backgroundColor: 'white',
        backgroundColor: 'white',
        width: wp(90),
        alignSelf: 'center',
        borderRadius: wp(2),
        padding: wp(4),
        justifyContent: 'center',
    },
    buttonContianer: {

        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    txtAtten: {
        fontSize: fontSize.subHeading,
        color: Colors.text,
        fontFamily: fonts.bold,
        textAlign: 'center'
        //marginBottom: hp(0)
    },
    msg: {
        fontSize: fontSize.text,
        color: Colors.textSecondary,
        fontFamily: fonts.medium,
        textAlign: 'center',
        marginBottom: hp(2)
    },
    txt: {
        fontSize: fontSize.text,
        fontFamily: fonts.medium,
        //borderWidth:0.3,
        //borderRadius:wp(2),
        paddingHorizontal: wp(6),
        paddingVertical: hp(1)
    },
    txtDlt: {
        color: Colors.error,
    },
    txtCancel: {
        color: Colors.textSecondary,
    },
    icon: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(6),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.errorLight,
        alignSelf: 'center',
        marginBottom: hp(1)
    },
    dltButton: {
        backgroundColor: Colors.error,
        borderRadius: wp(2)
    },
    cancelButton: {

        backgroundColor: Colors.textMuted,
        borderRadius: wp(2)

    }

});

//make this component available to the app
export default ConfirmationDialog;
