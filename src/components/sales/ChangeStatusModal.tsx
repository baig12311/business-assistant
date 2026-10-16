
import { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
} from 'react-native';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import fonts, { fontSize } from '../../constants/typography';
import Colors from '../../constants/colors';
import Icon from '../common/Icon';
import Button from '../common/Button';

export type OrderStatusType =
    | 'Pending'
    | 'Confirmed'
    | 'Shipped'
    | 'Cancelled';

interface Props {
    modalVisible: boolean;
    currentStatus: OrderStatusType;
    onPressCancel: () => void;
    onPressUpdate: (status: OrderStatusType) => void;
    loading?: boolean;
}

const statuses: OrderStatusType[] = [
    'Pending',
    'Confirmed',
    'Shipped',
];

const OrderStatusModal: React.FC<Props> = ({
    modalVisible,
    currentStatus,
    onPressCancel,
    onPressUpdate,
    loading = false,
}) => {
    const [selectedStatus, setSelectedStatus] =
        useState<OrderStatusType>(currentStatus);

    const progress = useSharedValue(0);

    useEffect(() => {
        if (modalVisible) {
            setSelectedStatus(currentStatus);
        }
    }, [modalVisible, currentStatus]);

    const selectedIndex = statuses.indexOf(selectedStatus);

    useEffect(() => {
        progress.value = withTiming(
            Math.max(selectedIndex, 0),
            { duration: 500 }
        );
    }, [selectedIndex]);

    const animatedProgress = useAnimatedStyle(() => ({
        width: `${(progress.value / 2) * 65}%`,
    }));

    const isCancelled = selectedStatus === 'Cancelled';

    const handleUpdate = () => {
        if (selectedStatus === currentStatus || loading) return;
        onPressUpdate(selectedStatus);
    };

    return (
        <Modal
            visible={modalVisible}
            transparent
            animationType="fade"
            onRequestClose={onPressCancel}
        >
            <View style={styles.modalView}>
                <View style={styles.modalContentView}>

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.heading}>
                            Update Order Status
                        </Text>

                        <TouchableOpacity
                            onPress={onPressCancel}
                            style={styles.closeButton}
                            disabled={loading}
                        >
                            <Icon
                                name="cross"
                                type="Entypo"
                                size={wp(5)}
                                color={Colors.text}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Current Status */}
                    <View style={styles.currentStatusContainer}>
                        <View style={styles.statusIcon}>
                            <Icon
                                name="clipboard-outline"
                                type="Ionicons"
                                size={wp(6)}
                                color={Colors.primary}
                            />
                        </View>

                        <View style={styles.currentStatusText}>
                            <Text style={styles.textHeading}>
                                Current Status
                            </Text>

                            <Text style={styles.textDes}>
                                {currentStatus}
                            </Text>
                        </View>
                    </View>

                    {/* Status Progress */}
                    <Text style={styles.sectionTitle}>
                        Select New Status
                    </Text>

                    <View style={styles.progressContainer}>
                        <View style={styles.baseLine} />

                        <Animated.View
                            style={[
                                styles.activeLine,
                                animatedProgress,
                            ]}
                        />

                        {statuses.map((status, index) => {
                            const isSelected =
                                selectedStatus === status;

                            const isCompleted =
                                selectedIndex >= 0 &&
                                index <= selectedIndex;

                            return (
                                <TouchableOpacity
                                    key={status}
                                    style={styles.stepContainer}
                                    activeOpacity={0.7}
                                    disabled={loading}
                                    onPress={() =>
                                        setSelectedStatus(status)
                                    }
                                >
                                    <View
                                        style={[
                                            styles.circle,
                                            isCompleted &&
                                                styles.activeCircle,
                                            isSelected &&
                                                styles.selectedCircle,
                                        ]}
                                    >
                                        {isCompleted && (
                                            <Icon
                                                name={
                                                    isSelected
                                                        ? 'checkmark'
                                                        : 'checkmark'
                                                }
                                                type="Ionicons"
                                                size={wp(3.5)}
                                                color={Colors.background}
                                            />
                                        )}
                                    </View>

                                    <Text
                                        style={[
                                            styles.statusLabel,
                                            isSelected &&
                                                styles.selectedLabel,
                                        ]}
                                    >
                                        {status}
                                    </Text>

                                    {isSelected && (
                                        <Text
                                            style={styles.selectedHint}
                                        >
                                            Selected
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Cancellation Option */}
                    <TouchableOpacity
                        style={[
                            styles.cancelOrderOption,
                            isCancelled &&
                                styles.cancelOrderSelected,
                        ]}
                        activeOpacity={0.7}
                        disabled={loading}
                        onPress={() =>
                            setSelectedStatus('Cancelled')
                        }
                    >
                        <Icon
                            name="close-circle-outline"
                            type="Ionicons"
                            size={wp(5.5)}
                            color="#C0392B"
                        />

                        <View style={styles.cancelOrderText}>
                            <Text style={styles.cancelOrderTitle}>
                                Cancel Order
                            </Text>

                            <Text style={styles.cancelOrderDescription}>
                                Mark this order as cancelled
                            </Text>
                        </View>

                        <Icon
                            name={
                                isCancelled
                                    ? 'radio-button-on'
                                    : 'radio-button-off'
                            }
                            type="Ionicons"
                            size={wp(5)}
                            color="#C0392B"
                        />
                    </TouchableOpacity>

                    {/* Actions */}
                    <View style={styles.buttonContainer}>
                       

                        <View style={styles.updateButton}>
                            <Button
                                title={
                                    isCancelled
                                        ? 'Cancel Order'
                                        : 'Update Status'
                                }
                                onPress={handleUpdate}
                                isLoading={loading}
                                disabled={
                                    loading ||
                                    selectedStatus === currentStatus
                                }
                            />
                        </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: hp(2),
    },

    modalContentView: {
        backgroundColor: Colors.background,
        width: wp(90),
        alignSelf: 'center',
        borderRadius: wp(3),
        padding: wp(5),
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(2.5),
    },

    heading: {
        flex: 1,
        fontSize: fontSize.subHeading,
        fontFamily: fonts.bold,
        color: Colors.text,
    },

    closeButton: {
        width: wp(8),
        height: wp(8),
        borderRadius: wp(4),
        backgroundColor: Colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: wp(2),
    },

    currentStatusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        padding: wp(3),
        borderRadius: wp(2),
        borderColor: Colors.border,
        marginBottom: hp(3),
    },

    statusIcon: {
        width: wp(11),
        height: wp(11),
        borderRadius: wp(6),
        backgroundColor: Colors.successLight,
        justifyContent: 'center',
        alignItems: 'center',
    },

    currentStatusText: {
        flex: 1,
        marginLeft: wp(3),
    },

    textHeading: {
        fontSize: fontSize.smallText,
        fontFamily: fonts.medium,
        color: Colors.textSecondary,
    },

    textDes: {
        fontSize: fontSize.text,
        fontFamily: fonts.semiBold,
        color: Colors.text,
        marginTop: hp(0.3),
    },

    sectionTitle: {
        fontSize: fontSize.text,
        fontFamily: fonts.semiBold,
        color: Colors.text,
        marginBottom: hp(3),
    },

    progressContainer: {
        flexDirection: 'row',
        position: 'relative',
        marginBottom: hp(3),
    },

    baseLine: {
        position: 'absolute',
        height: 2,
        backgroundColor: Colors.border,
        left: '16.66%',
        right: '16.66%',
        top: wp(2.5),
    },

    activeLine: {
        position: 'absolute',
        height: 2,
        backgroundColor: Colors.primary,
        left: '16.66%',
        top: wp(2.5),
        maxWidth: '66.68%',
    },

    stepContainer: {
        flex: 1,
        alignItems: 'center',
    },

    circle: {
        width: wp(5),
        height: wp(5),
        borderRadius: wp(3),
        backgroundColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        borderWidth: 1.5,
        borderColor: Colors.border,
    },

    activeCircle: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },

    selectedCircle: {
        borderColor: Colors.primary,
    },

    statusLabel: {
        fontFamily: fonts.medium,
        fontSize: wp(3.1),
        color: Colors.textSecondary,
        marginTop: hp(1),
    },

    selectedLabel: {
        color: Colors.primary,
        fontFamily: fonts.semiBold,
    },

    selectedHint: {
        fontFamily: fonts.medium,
        fontSize: wp(2.6),
        color: Colors.primary,
        marginTop: hp(0.3),
    },

    cancelOrderOption: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: wp(2),
        padding: wp(3),
        marginBottom: hp(3),
    },

    cancelOrderSelected: {
        borderColor: '#C0392B',
        backgroundColor: '#FFF6F5',
    },

    cancelOrderText: {
        flex: 1,
        marginLeft: wp(2.5),
    },

    cancelOrderTitle: {
        fontFamily: fonts.semiBold,
        fontSize: fontSize.text,
        color: '#C0392B',
    },

    cancelOrderDescription: {
        fontFamily: fonts.regular,
        fontSize: fontSize.smallText,
        color: Colors.textSecondary,
        marginTop: hp(0.3),
    },

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(3),
    },

    backButton: {
        height: hp(5.5),
        paddingHorizontal: wp(5),
        borderRadius: wp(2),
        borderWidth: 1,
        borderColor: Colors.border,
        justifyContent: 'center',
        alignItems: 'center',
    },

    backButtonText: {
        fontFamily: fonts.semiBold,
        fontSize: fontSize.text,
        color: Colors.text,
    },

    updateButton: {
        flex: 1,
    },
});

export default OrderStatusModal;
