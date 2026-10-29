



import { useEffect } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../src/lib/supabase';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Colors from '../src/constants/colors';
import fonts, { fontSize } from '../src/constants/typography';
import AnimatedLoader from '../src/components/common/AnimatedLoader';
import { logout } from '../src/services/authService';
import { LinearGradient } from 'expo-linear-gradient';


const Index = () => {
    useEffect(() => {
        let isActive = true;

        const checkUser = async () => {
    try {
        const {
            data: { session },
            error: sessionError,
        } = await supabase.auth.getSession();

        if (!isActive) return;

        if (sessionError || !session) {
            router.replace('/OnBoard');
            return;
        }

        // Verify user with Supabase.
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (!isActive) return;

        if (userError || !user) {
            const message = userError?.message?.toLowerCase() ?? '';

            const isNetworkError =
                message.includes('network') ||
                message.includes('fetch') ||
                message.includes('timeout') ||
                message.includes('failed to connect');

            if (isNetworkError) {
                // Keep the saved session. Do not log the user out.
                console.log('Offline: keeping saved session');
                router.replace('/(tabs)/Home');
                return;
            }

            // Only call your existing logout for an actual auth failure.
            await logout();
            return;
        }

        // Fetch business only when the user is verified online.
        const {
            data: business,
            error: businessError,
        } = await supabase
            .from('businesses')
            .select('id')
            .eq('owner_id', user.id)
            .limit(1)
            .maybeSingle();

        if (!isActive) return;

        if (businessError) {
            // Network/database failure: do not log out.
            console.log('Business check error:', businessError.message);
            router.replace('/(tabs)/Home');
            return;
        }

        if (!business) {
            router.replace('/businessSetup/BusinessSetup');
            return;
        }

        router.replace('/(tabs)/Home');
    } catch (error) {
        console.log('Startup error:', error);

        // Unexpected/network errors should not force logout.
        if (isActive) {
            router.replace('/(tabs)/Home');
        }
    }
};

        checkUser();

        return () => {
            isActive = false;
        };
    }, []);

    return (
        <View
            style={styles.container}
        >
            <Image
                style={styles.logo}
                source={require('../assets/appAssets/logo.png')}
                resizeMode='contain'
            />
            <Text style={styles.text1}>Shop
                <Text style={{ color: Colors.success }}>Sphere</Text>
            </Text>

            <Text style={styles.textSecondary}>
                SALES  •  STOCK  •  ORDERS  •  CUSTOMERS  •  PAYMENTS
            </Text>

            <AnimatedLoader />


            {/* top */}
            <View style={[styles.outerContainer,
            { left: -150, top: -150, }
            ]}>
                <LinearGradient
                    colors={['#E5F5E8', '#A8D8B0', '#4DA96A']}
                    locations={[0, 0.55, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.innerContainer}
                />
                {/* <View style={[styles.innerContainer]}/> */}
            </View>

            {/* bottom */}
            <View style={[styles.outerContainer,
            { right: -150, bottom: -150, }
            ]}>
                <LinearGradient
                    colors={['#4DA96A', '#A8D8B0', '#E5F5E8']}
                    locations={[0, 0.55, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.innerContainer}
                />
                {/* <View style={[styles.innerContainer]}/> */}
            </View>
        </View>
    );
};

export default Index;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
        padding: wp(3)
    },
    text1: {
        marginTop: hp(1),
        fontFamily: fonts.extraBold,
        fontSize: wp(12),
        color: Colors.primaryDark,
        letterSpacing: -2,
        includeFontPadding: false,
        lineHeight: wp(16),
    },
    textSecondary: {
        fontFamily: fonts.semiBold,
        fontSize: fontSize.smallText,
        color: Colors.textSecondary,
        marginTop: hp(1)
    },
    innerContainer: {
        width: wp(70),
        height: wp(70),
        borderRadius: wp(100),
    },
    outerContainer: {
        width: wp(90),
        height: wp(90),
        borderRadius: wp(50),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },
    logo: {
        width: wp(30),
        height: wp(30),
    }
})
