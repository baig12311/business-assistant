
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../src/constants/colors';
import { logout } from '../../src/services/authService';
import Button from '../../src/components/common/Button';
const Profile = () => {
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            <Button
            title='Log Out'
            onPress={logout}
            />
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
export default Profile;
