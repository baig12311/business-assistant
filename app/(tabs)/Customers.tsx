
import { View, Text, StyleSheet } from 'react-native';


const Customers = () => {
    return (
        <View style={styles.container}>
            <Text>Customers</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Customers;
