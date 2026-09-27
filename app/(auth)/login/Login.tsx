import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './LoginStyle';
import { router } from 'expo-router';
import { supabase } from '../../../src/lib/supabase';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../../../src/components/common/Input';
import { loginSchema } from '../../../src/services/schema/loginSchema';
import Button from '../../../src/components/common/Button';
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
    }>({});
    // Login
    const handleSignin = async () => {
        const result = loginSchema.safeParse({
            email,
            password,
        });

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors({
                email: fieldErrors.email?.[0],
                password: fieldErrors.password?.[0],
            })
            console.log(fieldErrors);
            return;
        }
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            console.log('Sign In Error:', error.message);
            return;
        }
        console.log('Sign In Success:', data);
        const { data: business, error: businessError } = await supabase
            .from('businesses')
            .select('id')
            .eq('owner_id', data.user.id)
            .maybeSingle();

        if (businessError) {
            console.log(businessError.message);
            return;
        }

        if (!business) {
            router.replace('/businessSetup/BusinessSetup');
            return;
        }

        router.replace('/(tabs)/Home');

    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Welcome Back</Text>
            <Text style={styles.subHeading}>Login to your Business Assistant account</Text>
            <Input
                title='Email'
                placeholder='someone@gmail.com'
                value={email}
                onChangeText={setEmail}
                error={errors.email}
                iconName='mail-outline'
                iconType='Ionicons'
            />
            <Input
                title='Password'
                placeholder='********'
                value={password}
                onChangeText={setPassword}
                error={errors.password}
                iconName='lock'
                iconType='SimpleLineIcons'
            />
            <Text style={styles.forgotText}>Forgot password?</Text>
            <Button
                title='Log in'
                onPress={handleSignin}
            />
            <Text style={styles.newText}>Don't have an account?{'  '}
                <Text style={styles.sign} onPress={() => router.push('/signup/Signup')}>Signup</Text>
            </Text>
        </SafeAreaView>
    );
};

export default Login;
