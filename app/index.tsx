



import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../src/lib/supabase';
import Colors from '../src/constants/colors';
import fonts, { fontSize } from '../src/constants/typography';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AnimatedLoader from '../src/components/common/AnimatedLoader';

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
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text
                style={{
                    fontFamily: fonts.bold,
                    fontSize: fontSize.heading,
                    color: Colors.primary,
                    marginTop: hp(2),
                }}
            >
                Business Assistant
            </Text>

            <AnimatedLoader />
        </View>
    );
};

export default Index;
