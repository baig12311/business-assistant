



import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../src/lib/supabase';
import { Image } from 'expo-image';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Colors from '../src/constants/colors';
import fonts, { fontSize } from '../src/constants/typography';
import AnimatedLoader from '../src/components/common/AnimatedLoader';
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

                if (sessionError) {
                    throw sessionError;
                }

                if (!session) {
                    if (isActive) {
                        router.replace('/OnBoard');
                    }
                    return;
                }

                // Verify that the session's user is still valid.
                const {
                    data: { user },
                    error: userError,
                } = await supabase.auth.getUser();

                if (userError || !user) {
                    await supabase.auth.signOut({ scope: 'local' });

                    if (isActive) {
                        router.replace('/OnBoard');
                    }
                    return;
                }


                const { data: business, error: businessError } =
                    await supabase
                        .from('businesses')
                        .select('id')
                        .eq('owner_id', user.id)
                        .limit(1)
                        .maybeSingle();



                if (businessError) {
                    console.log(
                        'Business check error:',
                        businessError.message
                    );
                    return;
                }

                if (!isActive) return;

                if (!business) {
                    router.replace('/businessSetup/BusinessSetup');
                    return;
                }

                router.replace('/(tabs)/Home');
            } catch (error) {
                console.log('Startup auth error:', error);

                if (isActive) {
                    router.replace('/OnBoard');
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
        width: wp(40),
        height: wp(40),
    }
})
