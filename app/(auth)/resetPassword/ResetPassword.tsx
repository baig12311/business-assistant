
import { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { z } from 'zod';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import Colors from '../../../src/constants/colors';
import { supabase } from '../../../src/lib/supabase';
import PasswordRequirements from '../../../src/components/auth/PasswrodCheck';
import Icon from '../../../src/components/common/Icon';
import Input from '../../../src/components/common/Input';
import Button from '../../../src/components/common/Button';
import Header from '../../../src/components/common/Header';
import CustomToast from '../../../src/components/common/CustomToast';
import styles from './ResetStyle';

const passwordSchema = z
    .object({
        password: z
            .string()
            .min(8, '*Password must be at least 8 characters'),
        confirmPassword: z
            .string()
            .min(1, '*Please confirm your password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [loading, setLoading] = useState(false);

    const [toastVisible, setToastVisible] = useState(false);
    const [toastTitle, setToastTitle] = useState('');
    const [toastDescription, setToastDescription] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    const showToast = (
        title: string,
        description: string,
        type: 'success' | 'error'
    ) => {
        setToastTitle(title);
        setToastDescription(description);
        setToastType(type);
        setToastVisible(true);
    };

    const handleUpdatePassword = async () => {
        if (loading) return;

        setPasswordError('');
        setConfirmPasswordError('');

        const result = passwordSchema.safeParse({
            password,
            confirmPassword,
        });

        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;

            setPasswordError(errors.password?.[0] ?? '');
            setConfirmPasswordError(
                errors.confirmPassword?.[0] ?? ''
            );
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({
                password,
            });

            if (error) {
                showToast(
                    'Password Update Failed',
                    error.message,
                    'error'
                );
                return;
            }

            showToast(
                'Password Updated',
                'Your password has been changed successfully.',
                'success'
            );
        } catch {
            showToast(
                'Something Went Wrong',
                'Unable to update your password. Please try again.',
                'error'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleToastHide = () => {
        setToastVisible(false);

        if (toastType === 'success') {
            router.replace('/(auth)/login/Login');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title="Create Password"
                onPress={() => router.back()}
            />

            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Icon
                        name="lock"
                        type="SimpleLineIcons"
                        size={wp(7)}
                        color={Colors.primary}
                    />
                </View>

                <Text style={styles.title}>
                    Create New Password
                </Text>

                <Text style={styles.description2}>
                    Choose a strong password to secure your account.
                </Text>

                <Input
                    title="Password"
                    placeholder="********"
                    iconName="lock"
                    iconType="SimpleLineIcons"
                    value={password}
                    onChangeText={(value: string) => {
                        setPassword(value);
                        setPasswordError('');
                    }}
                    error={passwordError}
                    secure
                />

                <PasswordRequirements password={password} />

                <Input
                    title="Confirm Password"
                    placeholder="********"
                    iconName="lock"
                    iconType="SimpleLineIcons"
                    value={confirmPassword}
                    onChangeText={(value: string) => {
                        setConfirmPassword(value);
                        setConfirmPasswordError('');
                    }}
                    error={confirmPasswordError}
                    secure
                />

                <View style={styles.button}>
                    <Button
                        title="Reset Password"
                        onPress={handleUpdatePassword}
                        disabled={
                            !password ||
                            !confirmPassword ||
                            loading
                        }
                        isLoading={loading}
                    />
                </View>
            </View>

            <CustomToast
                visible={toastVisible}
                messageTitle={toastTitle}
                messageDescription={toastDescription}
                type={toastType}
                onHide={handleToastHide}
            />
        </SafeAreaView>
    );
};

export default ResetPassword;
