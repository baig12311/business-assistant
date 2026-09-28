import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../src/constants/colors';
import { useUser } from '../../src/hooks/useUser';
import { useBusiness } from '../../src/hooks/useBusiness';
const Home = () => {
    const {data, error, isLoading} =useUser()
    const userId=data?.id
    const {data:business, error:bError, isLoading:bLoading} =useBusiness(userId)
    console.log(business)
    const userName=data?.user_metadata?.name
    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <Text>{userName}</Text>
            <Text>{userId}</Text>
            <Text>{JSON.stringify(business, null, 2)}</Text>
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
