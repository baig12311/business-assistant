
import { View, Text, StyleSheet } from 'react-native';
import styles from '../businessSetup/BusinessStyle';
import Header from '../../src/components/common/Header';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
const NewOrder = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header title='New Order' onPress={()=>router.back()}/>
            <Text>Create New Order</Text>
        </SafeAreaView>
    );
};


//make this component available to the app
export default NewOrder;
