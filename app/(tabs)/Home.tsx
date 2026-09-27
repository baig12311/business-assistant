
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../src/constants/colors';
const Home = () => {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
});

//make this component available to the app
export default Home;
