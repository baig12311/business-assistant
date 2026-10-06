import { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { supabase } from '../../../src/lib/supabase';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './SignupStyle';
import CustomToast from '../../../src/components/common/CustomToast';
import { router } from 'expo-router';
import PasswordRequirements from '../../../src/components/auth/PasswrodCheck';
import { signupSchema } from '../../../src/services/schema/signupSchema';
import Input from '../../../src/components/common/Input';
import Button from '../../../src/components/common/Button';
const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [toastMessage, setToastMessage] = useState('')
    const [showToast, setShowToast] = useState(false)
    const [toastType, setToastType] = useState<'success' | 'error'>('error')
    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        password?: string;
        confirmPassword?: string
    }>({});
    
    const isDisabled = !name || !email || !password || !confirmPassword
    // SignUp
    const handleSignup = async () => {
        setLoading(true)
        const result = signupSchema.safeParse({
            name,
            email,
            password,
            confirmPassword,
        });

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors({
                name: fieldErrors.name?.[0],
                email: fieldErrors.email?.[0],
                password: fieldErrors.password?.[0],
                confirmPassword: fieldErrors.confirmPassword?.[0]
            })
            setLoading(false)
            return;
        }
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name
                }
            }
        });
        if (error) {
            setShowToast(true)
            setToastType('error')
            setToastMessage(error?.message)
            setLoading(false)
            return;
        }

        setTimeout(() => {
            router.push({
                pathname: '/businessSetup/BusinessSetup',
                params: {
                    userId: data.user?.id,
                },
            });
        }, 3100)



        setToastType('success')
        setToastMessage('Your account has been created succesfully. Now set up your business')
        setShowToast(true)
        setLoading(false)
        setName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }
    return (
        <SafeAreaView style={styles.container}>
            {
                showToast && (
                    <CustomToast
                        type={toastType}
                        messageTitle={toastType === 'success' ? 'Account created' : 'Unable to create account'}
                        messageDescription={toastMessage}
                        visible={showToast}
                        onHide={() => setShowToast(false)}
                    />
                )
            }
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.heading}>Create your account</Text>
                    <Text style={styles.subHeading}>Join business assistant and grow your business</Text>
                    <Input
                        title='Full Name*'
                        placeholder='John Doe'
                        value={name}
                        onChangeText={(text: string) => {
                            setName(text),
                                setErrors({
                                    ...errors,
                                    name: undefined
                                })
                        }}
                        error={errors.name}
                        iconName='person-outline'
                        iconType='Ionicons'
                    />
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
                    <PasswordRequirements password={password}/>
                    <Input
                        title='Confirm Password*'
                        placeholder='********'
                        value={confirmPassword}
                        onChangeText={(text: string) => {
                            setConfirmPassword(text),
                                setErrors({
                                    ...errors,
                                    confirmPassword: undefined
                                })
                        }}
                        error={errors.confirmPassword}
                        iconName='lock'
                        iconType='SimpleLineIcons'
                    />
                    <View style={styles.button}>
                        <Button
                            title='Create Account'
                            onPress={handleSignup}
                            isLoading={loading}
                            disabled={isDisabled}
                        />
                    </View>

                    <Text style={styles.newText}>Already have an account?{'  '}
                        <Text style={styles.sign} onPress={() => router.push('/login/Login')}>Log in</Text>
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>

        </SafeAreaView>
    );
};

export default Signup;
