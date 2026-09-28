import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../src/components/common/Header';
import { router } from 'expo-router';
import styles from './AddCustomerStyle';
import Input from '../../src/components/common/Input';
const AddCustomer = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Add Customer' onPress={()=>router.back()}/>
            <Text>Add Customer</Text>
            <Input
            title='Customer Name'
            placeholder='John Doe'
            />
            <Input
            title='Customer '
            placeholder='John Doe'
            />
            <Input
            title='Customer Name'
            placeholder='John Doe'
            />
        </SafeAreaView>
    );
};
export default AddCustomer;
