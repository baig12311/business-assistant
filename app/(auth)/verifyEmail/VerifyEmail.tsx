
import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import * as Linking from 'expo-linking';
import { supabase } from '../../../src/lib/supabase';
import Colors from '../../../src/constants/colors';


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
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Text style={styles.emailIcon}>✉</Text>
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

                <TouchableOpacity
                    style={[
                        styles.button,
                        loading && styles.buttonDisabled,
                    ]}
                    onPress={handleResendEmail}
                    disabled={loading}
                    activeOpacity={0.8}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.buttonText}>Resend verification email</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.replace('/auth/SignIn')}
                    activeOpacity={0.7}
                >
                    <Text style={styles.backButtonText}>
                        Back to Sign In
                    </Text>
                </TouchableOpacity>

                <Text style={styles.footer}>
                    Can't find the email? Check your spam or junk folder.
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default VerifyEmail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF9F6',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    iconContainer: {
        width: 76,
        height: 76,
        borderRadius: 24,
        backgroundColor: '#E8F3EC',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 28,
    },
    emailIcon: {
        fontSize: 36,
        color: Colors.primary,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#17231B',
        textAlign: 'center',
        marginBottom: 12,
    },
    description: {
        fontSize: 15,
        lineHeight: 23,
        color: '#68736B',
        textAlign: 'center',
        marginBottom: 28,
    },
    emailCard: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E4E9E5',
        borderRadius: 16,
        padding: 18,
        marginBottom: 20,
    },
    emailLabel: {
        fontSize: 12,
        color: '#7A857D',
        marginBottom: 7,
    },
    emailText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#17231B',
    },
    message: {
        fontSize: 13,
        lineHeight: 19,
        marginBottom: 16,
    },
    button: {
        minHeight: 54,
        backgroundColor: Colors.primary,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    backButton: {
        alignItems: 'center',
        paddingVertical: 18,
    },
    backButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.primary,
    },
    footer: {
        fontSize: 12,
        lineHeight: 18,
        color: '#89928B',
        textAlign: 'center',
        marginTop: 12,
    },
});
