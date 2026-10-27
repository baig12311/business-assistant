
import { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Logo from '../../../src/components/common/Logo';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { z } from 'zod';

import styles from './DeleteStyle';
import DeleteRow from '../../../src/components/profile/DeleteRow';
import { supabase } from '../../../src/lib/supabase';
import Input from '../../../src/components/common/Input';
import Button from '../../../src/components/common/Button';
import Header from '../../../src/components/common/Header';
import CustomToast from '../../../src/components/common/CustomToast';

const deleteAccountSchema = z.object({
    currentPassword: z
        .string()
        .min(1, 'Enter your current password'),
});

const DeleteAccount = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [updating, setUpdating] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const [toastVisible, setToastVisible] = useState(false);
    const [toastTitle, setToastTitle] = useState('');
    const [toastDescription, setToastDescription] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>(
        'success'
    );

    const isDisabled = !currentPassword.trim() || updating;

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

    const handleDeleteAccount = async () => {
        if (updating) return;

        setPasswordError('');

        const validation = deleteAccountSchema.safeParse({
            currentPassword,
        });

        if (!validation.success) {
            setPasswordError(
                validation.error.flatten().fieldErrors.currentPassword?.[0] ??
                    'Enter your current password'
            );
            return;
        }

        setUpdating(true);

        try {
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError || !user) {
                showToast(
                    'Session Expired',
                    'Please sign in again before deleting your account.',
                    'error'
                );
                return;
            }

            if (!user.email) {
                showToast(
                    'Unable to Verify',
                    'This account does not have an email address for password verification.',
                    'error'
                );
                return;
            }

            // Verify the current password.
            const { error: passwordVerificationError } =
                await supabase.auth.signInWithPassword({
                    email: user.email,
                    password: currentPassword,
                });

            if (passwordVerificationError) {
                setPasswordError(
                    '*Incorrect password. Please try again.'
                );
                return;
            }

            // Permanently delete the account on the server.
            const { data, error: deleteError } =
                await supabase.functions.invoke('delete-account');

            if (deleteError) {
                console.log(
                    'DELETE ACCOUNT ERROR:',
                    deleteError.message
                );

                if (
                    'context' in deleteError &&
                    deleteError.context
                ) {
                    const response = deleteError.context as Response;

                    console.log('HTTP STATUS:', response.status);

                    try {
                        console.log(
                            'EDGE FUNCTION RESPONSE:',
                            await response.clone().text()
                        );
                    } catch {
                        console.log(
                            'Could not read the error response.'
                        );
                    }
                }

                showToast(
                    'Deletion Failed',
                    'Your account could not be deleted. Please try again.',
                    'error'
                );
                return;
            }

            if (data?.success !== true) {
                showToast(
                    'Deletion Failed',
                    data?.error ??
                        'The server did not confirm account deletion.',
                    'error'
                );
                return;
            }

            // Clear the local authentication session.
            await supabase.auth.signOut({ scope: 'local' });

            setCurrentPassword('');

            // Navigate to the root route after successful deletion.
            router.replace('/');
        } catch (error) {
            console.log('DELETE ACCOUNT EXCEPTION:', error);

            showToast(
                'Something Went Wrong',
                'Unable to delete your account. Please try again.',
                'error'
            );
        } finally {
            setUpdating(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title="Delete Account"
                onPress={() => router.back()}
            />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.heading}>
                        Delete your account?
                    </Text>

                    <Text style={styles.subHeading}>
                        We're sorry to see you go. Please review what happens
                        when you delete your account.
                    </Text>

                    <View style={styles.section}>
                        <DeleteRow
                            mainText="Business Information"
                            subText="Your business profile and settings may be permanently deleted"
                            iconName="storefront-outline"
                            iconType="Ionicons"
                            paddingVertical={hp(1)}
                            borderBottomWidth={0.3}
                        />

                        <DeleteRow
                            mainText="Products, Orders and Customers"
                            subText="Associated records may be deleted according to the app's data policy"
                            iconName="cube-outline"
                            iconType="Ionicons"
                            paddingVertical={hp(1)}
                            borderBottomWidth={0.3}
                        />

                        <DeleteRow
                            mainText="Permanent Action"
                            subText="You may not be able to recover your account or data"
                            iconName="alert-circle-outline"
                            iconType="Ionicons"
                            paddingVertical={hp(1)}
                        />
                    </View>

                    <Text style={styles.heading}>
                        Verify your account
                    </Text>

                    <Text style={styles.subHeading}>
                        Enter your current password to continue.
                    </Text>

                    <Input
                        title="Current Password"
                        placeholder="********"
                        value={currentPassword}
                        onChangeText={(value: string) => {
                            setCurrentPassword(value);

                            if (passwordError) {
                                setPasswordError('');
                            }
                        }}
                        secure
                        error={passwordError}
                    />
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={styles.buttonContainer}>
                <Button
                    title="Permanently Delete Account"
                    onPress={handleDeleteAccount}
                    disabled={isDisabled}
                    isLoading={updating}
                    isDelete={true}
                />
            </View>

            <CustomToast
                visible={toastVisible}
                messageTitle={toastTitle}
                messageDescription={toastDescription}
                type={toastType}
                onHide={() => setToastVisible(false)}
            />
        </SafeAreaView>
    );
};

export default DeleteAccount;
