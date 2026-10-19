
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { supabase } from '../../src/lib/supabase';
import Colors from '../../src/constants/colors';
const AuthCallback = () => {
    const { code, error, error_description } =
        useLocalSearchParams<{
            code?: string;
            error?: string;
            error_description?: string;
        }>();

    const [message, setMessage] = useState('Verifying your email...');
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        let isActive = true;

        const verifyEmail = async () => {
            if (error) {
                if (isActive) {
                    setHasError(true);
                    setMessage(
                        error_description ?? 'Email verification failed. Please try again.'
                    );
                }
                return;
            }

            if (!code) {
                if (isActive) {
                    setHasError(true);
                    setMessage(
                        'Verification code not found. Please open the latest verification email.'
                    );
                }
                return;
            }

            const { error: sessionError } =
                await supabase.auth.exchangeCodeForSession(code);

            if (sessionError) {
                if (isActive) {
                    setHasError(true);
                    setMessage(sessionError.message);
                }
                return;
            }

            if (isActive) {
                router.replace('/businessSetup/BusinessSetup');
            }
        };

        verifyEmail();

        return () => {
            isActive = false;
        };
    }, [code, error, error_description]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {hasError ? (
                    <Text style={styles.errorIcon}>!</Text>
                ) : (
                    <ActivityIndicator size="large" color={Colors.primary} />
                )}

                <Text style={styles.title}>
                    {hasError ? 'Verification failed' : 'Verifying your email'}
                </Text>

                <Text style={styles.description}>{message}</Text>

                {hasError && (
                    <Text
                        style={styles.link}
                        onPress={() => router.replace('/verifyEmail/VerifyEmail')}
                    >
                        Return to verification screen
                    </Text>
                )}
            </View>
        </SafeAreaView>
    );
};

export default AuthCallback;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF9F6',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 28,
    },
    errorIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FCE8E6',
        color: '#D92D20',
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center',
        lineHeight: 48,
        overflow: 'hidden',
        marginBottom: 20,
    },
    title: {
        fontSize: 23,
        fontWeight: '700',
        color: '#17231B',
        textAlign: 'center',
        marginTop: 22,
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        lineHeight: 21,
        color: '#68736B',
        textAlign: 'center',
    },
    link: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: '600',
        marginTop: 24,
    },
});