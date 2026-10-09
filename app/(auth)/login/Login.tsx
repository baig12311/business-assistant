import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './LoginStyle';
import { router } from 'expo-router';
import { supabase } from '../../../src/lib/supabase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getBusiness } from '../../../src/services/business';
import { useBusiness } from '../../../src/hooks/useBusiness';
import Input from '../../../src/components/common/Input';
import { loginSchema } from '../../../src/services/schema/loginSchema';
import CustomToast from '../../../src/components/common/CustomToast';
import Button from '../../../src/components/common/Button';
import { tr } from 'zod/v4/locales';
const Login = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [toastMessage, setToastMessage] = useState('')
    const [showToast, setShowToast] = useState(false)
    const [toastType, setToastType] = useState<'success' | 'error'>('error')
    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
    }>({});
    // Login
    const handleSignin = async () => {
        setLoading(true)
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
            setLoading(false)
            return;
        }
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            setShowToast(true)
            setToastType('error')
            setToastMessage(error?.message.includes('Invalid') ? error.message:'Something went wrong. Try again')
            setLoading(false)
            setPassword('')
            return;
        }
        const business = await getBusiness(data.user.id)

        if (!business) {
            router.replace('/businessSetup/BusinessSetup');
            return;
        }
        
        setToastType('success')
        setToastMessage('You are now logged in to your account.')
        setLoading(false)
        setEmail('')
        setPassword('')
        setShowToast(true)
        setTimeout(()=>{
             router.replace('/(tabs)/Home');
        }, 3100)
       

    }

    return (
        <SafeAreaView style={styles.container}>
            {
                showToast && (
                    <CustomToast
                        type={toastType}
                        messageTitle={toastType === 'success' ? 'Login Successful' : 'Login Failed'}
                        messageDescription={toastMessage}
                        visible={showToast}
                        onHide={() => setShowToast(false)}
                    />
                )
            }
            <Text style={styles.heading}>Welcome Back</Text>
            <Text style={styles.subHeading}>Login to your Business Assistant account</Text>
            <Input
                title='Email*'
                placeholder='someone@gmail.com'
                value={email}
                onChangeText={(text: string) => {
                    setEmail(text),
                        setErrors({
                            ...errors,
                            email: undefined
                        })
                }}
                error={errors.email}
                iconName='mail-outline'
                iconType='Ionicons'
                keyboard='email-address'
            />
            <Input
                title='Password*'
                placeholder='********'
                value={password}
                onChangeText={(text: string) => {
                    setPassword(text),
                        setErrors({
                            ...errors,
                            password: undefined
                        })
                }}
                error={errors.password}
                iconName='lock'
                iconType='SimpleLineIcons'
            />
            <Text style={styles.forgotText}>Forgot password?</Text>
            <Button
                title='Log in'
                onPress={handleSignin}
                isLoading={loading}
                disabled={!email || !password}
            />
            <Text style={styles.newText}>Don't have an account?{'  '}
                <Text style={styles.sign} onPress={() => router.push('/signup/Signup')}>
                    Create Account
                </Text>
            </Text>
        </SafeAreaView>
    );
};

export default Login;
