import { useEffect } from 'react';
import { ActivityIndicator, View, Text} from 'react-native';
import Colors from '../src/constants/colors';
import fonts, {fontSize} from '../src/constants/typography';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { supabase } from '../src/lib/supabase';
import AnimatedLoader from '../src/components/common/AnimatedLoader';
const Index = () => {

    useEffect(() => {
        const checkUser = async () => {

            // 1. Check existing session
            const {
                data: { session },
            } = await supabase.auth.getSession();

            // No session
            if (!session) {
                router.replace('/OnBoard');
                return;
            }

            // 2. Check user's business
            const { data: business, error } = await supabase
                .from('businesses')
                .select('id')
                .eq('owner_id', session.user.id)
                .limit(1)
                .maybeSingle();

            if (error) {
                console.log('Business check error:', error.message);
                return;
            }

            // 3. No business
            if (!business) {
                router.replace('/businessSetup/BusinessSetup');
                return;
            }

            // 4. Business exists
            router.replace('/(tabs)/Home');
        };

        checkUser();
    }, []);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text style={{
                fontFamily:fonts.bold,
                fontSize: fontSize.heading,
                color:Colors.primary,
                marginTop:hp(2)

            }}>
                Business Assistant
                </Text>
            <AnimatedLoader/>
        </View>
    );
};

export default Index;