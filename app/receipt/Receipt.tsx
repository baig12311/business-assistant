
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './ReceiptStyle';

const Receipt = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Receipt</Text>
        </SafeAreaView>
    );
};




export default Receipt;
