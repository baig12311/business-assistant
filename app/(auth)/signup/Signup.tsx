import { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { supabase } from '../../../src/lib/supabase';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './SignupStyle';
import { router } from 'expo-router';
import { signupSchema } from '../../../src/services/schema/signupSchema';
import Input from '../../../src/components/common/Input';
import Button from '../../../src/components/common/Button';
const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        password?: string;
        confirmPassword?: string
    }>({});
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
            console.log(fieldErrors);
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
            console.log('Sign Up Error:', error.message);
            return;
        }
        router.push('/businessSetup/BusinessSetup')
        setLoading(false)
        console.log('Sign Up Success:', data);
    }
    return (
        <SafeAreaView style={styles.container}>
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
                        title='Full Name'
                        placeholder='John Doe'
                        value={name}
                        onChangeText={setName}
                        error={errors.name}
                        iconName='person-outline'
                        iconType='Ionicons'
                    />
                    <Input
                        title='Email'
                        placeholder='someone@gmail.com'
                        value={email}
                        onChangeText={setEmail}
                        error={errors.email}
                        iconName='mail-outline'
                        iconType='Ionicons'
                        keyboard='email-address'
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
                    <Input
                        title='Confirm Password'
                        placeholder='********'
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        error={errors.confirmPassword}
                        iconName='lock'
                        iconType='SimpleLineIcons'
                    />
                    <View style={styles.button}>
                        <Button
                            title='Sign Up'
                            onPress={handleSignup}
                            isLoading={loading}
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
