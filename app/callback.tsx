
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { supabase } from '../src/lib/supabase';
import Colors from '../src/constants/colors';
import Icon from '../src/components/common/Icon';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import fonts, { fontSize } from '../src/constants/typography';
const AuthCallback = () => {
    const { code, error, error_description, flow, email } =
        useLocalSearchParams<{
            code?: string;
            error?: string;
            error_description?: string;
            flow?: string,
            email?: string
        }>();

    console.log('AUTH CALLBACK PARAMS:', {
        code,
        error,
        error_description,
        flow,
    });

    const [message, setMessage] = useState('Verifying your email...');
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        let isActive = true;

        const verifyEmail = async () => {
            if (error) {
                if (isActive) {
                    setHasError(true);

                    if (error === 'access_denied') {
                        setMessage(
                            'We couldn’t verify your email. Your link may have expired or already been used. Please request a new verification email.'
                        );
                    } else {
                        setMessage(
                            'Something went wrong while verifying your email. Please try again.'
                        );
                    }
                }

                return;
            }

            if (!code) {
                if (isActive) {
                    setHasError(true);
                    setMessage(
                        flow === 'recovery'
                            ? 'Your password reset link is invalid or has expired. Please request a new one.'
                            : 'Your verification link is invalid or has expired. Please request a new verification email.'
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

            if (flow === 'recovery') {
                router.replace('(auth)/resetPassword/ResetPassword');
            } else {
                router.replace('/businessSetup/BusinessSetup');
            }

            // if (isActive) {
            //     router.replace('/businessSetup/BusinessSetup');
            // }
        };

        verifyEmail();

        return () => {
            isActive = false;
        };
    }, [code, error, error_description, flow]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {hasError ? (
                    <Icon
                        name='alert-circle'
                        type='Ionicons'
                        size={wp(15)}
                        color={Colors.error}
                    />
                ) : (
                    <ActivityIndicator size="large" color={Colors.primary} />
                )}

                <Text style={styles.title}>
                    {hasError ? 'Verification Failed' : 'Verifying your email'}
                </Text>

                <Text style={styles.description}>{message}</Text>

                {hasError && (
                    <Text
                        style={styles.link}
                        onPress={() =>
                            router.replace({
                                pathname: '/verifyEmail/VerifyEmail',
                                params: {
                                    ...(email ? { email } : {}),
                                    ...(flow ? { flow } : {}),
                                },
                            })
                        }
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
        backgroundColor: Colors.background,
        padding: wp(3),
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //paddingHorizontal: 28,
    },
    title: {
        fontSize: fontSize.largeHeading,
        fontFamily: fonts.extraBold,
        textAlign: 'center',
        color: Colors.text,
        marginVertical: hp(1)
    },
    description: {
        fontFamily: fonts.medium,
        fontSize: fontSize.text,
        color: Colors.textSecondary,
        marginBottom: hp(3),
        textAlign: 'center'
    },
    link: {
        color: Colors.primary,
        fontSize: fontSize.text,
        fontFamily: fonts.semiBold,
        //marginTop: 24,
    },
});