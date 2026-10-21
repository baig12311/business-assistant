
import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../../../src/constants/colors';
import styles from './verifyStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import * as Linking from 'expo-linking';
import Button from '../../../src/components/common/Button';
import { supabase } from '../../../src/lib/supabase';

import Icon from '../../../src/components/common/Icon';


const VerifyEmail = () => {
    const { email } = useLocalSearchParams<{ email: string }>();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleResendEmail = async () => {
        if (!email || loading) return;

        setLoading(true);
        setMessage('');

        const { error } = await supabase.auth.resend({
            type: 'signup',
            email,
            options: {
                emailRedirectTo: Linking.createURL('auth/callback'),
            },
        });

        if (error) {
            setIsError(true);
            setMessage(error.message);
        } else {
            setIsError(false);
            setMessage('Verification email sent. Please check your inbox.');
        }

        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
           
                <View style={styles.iconContainer}>
                    <Icon
                    name='mail-outline'
                    type='Ionicons'
                    size={wp(8)}
                    color={Colors.primary}
                    />
                </View>

                <Text style={styles.title}>Verify your email</Text>

                <Text style={styles.description}>
                    We've sent a verification link to your email address.
                    Please verify your email to continue setting up your business.
                </Text>

                <View style={styles.emailCard}>
                    <Text style={styles.emailLabel}>Verification email sent to</Text>
                    <Text style={styles.emailText}>{email || 'Your email address'}</Text>
                </View>

                {message ? (
                    <Text
                        style={[
                            styles.message,
                            { color: isError ? '#D92D20' : Colors.primary },
                        ]}
                    >
                        {message}
                    </Text>
                ) : null}
                <View style={styles.button}>
                     <Button
                title='Resend verification email'
                disabled={loading}
                onPress={handleResendEmail}
                />
                </View>
               

               

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.replace('/(auth)/login/Login')}
                    activeOpacity={0.7}
                >
                    <Text style={styles.backButtonText}>
                        Back to Sign In
                    </Text>
                </TouchableOpacity>

                <Text style={styles.footer}>
                    Can't find the email? Check your spam or junk folder.
                </Text>
           
        </SafeAreaView>
    );
};

export default VerifyEmail;

