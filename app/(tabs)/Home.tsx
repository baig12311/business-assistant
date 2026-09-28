import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import Colors from '../../src/constants/colors';
import { useUser } from '../../src/hooks/useUser';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import fonts, { fontSize } from '../../src/constants/typography';
import Header from '../../src/components/home/Header';
import { useBusiness } from '../../src/hooks/useBusiness';
import Icon from '../../src/components/common/Icon';
import { quickActions } from '../../src/services/data/quickActions';
import { useProducts } from '../../src/hooks/useProducts';
import ActionCard from '../../src/components/home/ActionCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardCard from '../../src/components/home/DashboardCard';
const Home = () => {
    const {data, error, isLoading} =useUser()
    const userId=data?.id
    const {data:business, error:bError, isLoading:bLoading} =useBusiness(userId)
    console.log(business)
    const userName=data?.user_metadata?.name
    const productData = useProducts(business?.id)
    console.log('Products: ', productData);
    
    return (
        <SafeAreaView style={styles.container}>
            <Header userName={userName} business={business?.name}/>
            <TouchableOpacity 
            activeOpacity={0.7}
            style={styles.timeSelector}
            >
                
                <Icon
                name='calendar-outline'
                type='Ionicons'
                size={wp(4)}
                color={Colors.textSecondary}
            />
                <Text style={styles.timeText}>This week</Text>
                <Icon
                name='chevron-small-down'
                type='Entypo'
                size={wp(5)}
                color={Colors.textSecondary}
            />
            </TouchableOpacity>
            <View style={styles.infoContainer}>
                <DashboardCard
                title="Today's Sales"
                info='PKR 12,870'
                />
                <DashboardCard
                title="Total's Ordes"
                info='7'
                />
                <DashboardCard
                title="Pending"
                info='2'
                />
                <DashboardCard
                title="Delivered"
                info='5'
                />
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.actionRow}>
                    {
                        quickActions.map((action, index) => (
                            <ActionCard
                                key={index}
                                iconName={action.name}
                                iconType={action.type}
                                title={action.title}
                                onPress={action.onPress}
                            />
                        ))
                    }
                </View>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        padding: wp(3),
        flex:1
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    section: {
        marginBottom: hp(2)
    },
    sectionTitle: {
        fontFamily: fonts.bold,
        fontSize: fontSize.subHeading,
        marginBottom: hp(0.5),
        color: Colors.text
    },
    infoContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: hp(2)

    },
    timeSelector:{
        borderWidth:0.5,
        borderRadius: wp(2),
        alignSelf: 'flex-end',
        padding:wp(2),
        borderColor: Colors.textMuted,
        alignItems:'center',
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        elevation:1,
        marginBottom: hp(2)

    },
    timeText:{
        fontFamily: fonts.regular,
        fontSize:fontSize.smallText,
        color:Colors.textSecondary,
        marginHorizontal: wp(2),
    }
});

export default Home;
