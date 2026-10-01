import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Header from '../../src/components/common/Header';
import { widthPercentageToDP as wp,
    heightPercentageToDP as hp
 } from 'react-native-responsive-screen';
import Colors from '../../src/constants/colors';
const Orders = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Orders' onPress={()=>router.back()}/>
            <Text>Orders</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp(3),
        backgroundColor: Colors.background,
    },
});

//make this component available to the app
export default Orders;
