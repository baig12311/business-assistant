import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '../../../src/constants/colors';
import { sendPasswordResetEmail } from '../../../src/services/authService';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from '../../../src/components/common/Icon';
import Input from '../../../src/components/common/Input';
import Button from '../../../src/components/common/Button';
import Header from '../../../src/components/common/Header';
import styles from './ResetStyle';
import { z } from 'zod'
// schema
const forgotSchema = z.object({
    email: z.email('*Please enter valid email')
})
const ResetPassword = () => {
    const [password, setpassword] = useState('')
    const [confirmPassword, setConfirmePassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [emailError, setEmailError] = useState('')
   
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Forgot Password' onPress={() => router.back()} />
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Icon
                        name='lock'
                        type='SimpleLineIcons'
                        size={wp(7)}
                        color={Colors.primary}
                    />
                </View>
                <Text style={styles.title}>Create New Password</Text>

                <Text style={styles.description2}>
                    Choose a strong password to secure your account.
                </Text>
                <Input
                    title='Password'
                    placeholder='********'
                    iconName='lock'
                    iconType='SimpleLineIcons'
                    value={password}
                    //onChangeText={set}
                    error={emailError}
                />
                <Input
                    title='Confirm Password'
                    placeholder='********'
                    iconName='lock'
                    iconType='SimpleLineIcons'
                    value={confirmPassword}
                    //onChangeText={set}
                    error={emailError}
                />
                <View style={styles.button}>
                    <Button
                        title='Update Password'
                        disabled={!password || !confirmPassword}
                        //onPress={handleSend}
                        isLoading={loading}
                    />
                </View>

                

            </View>

        </SafeAreaView>
    );
};



export default ResetPassword;
