import { Tabs } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import Icon from "../../src/components/common/Icon";
import Colors from "../../src/constants/colors";
import fonts, {fontSize} from "../../src/constants/typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
const TabLayout = () => {
    const insets = useSafeAreaInsets();
    return (
        <Tabs
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.textSecondary,

                // Style the native tab bar container
                tabBarStyle: {
                    height: hp(7) + insets.bottom,
                    // paddingBottom: insets.bottom > 0 ? insets.bottom : hp(1),
                    // paddingTop: hp(1),
                    //borderColor: Colors.secondaryColor,
                    //paddingBottom: hp(1),
                },

                // Style the native label directly
                tabBarLabelStyle: {
                    fontSize: wp(3.5),
                    fontWeight: '400',
                    fontFamily: 'Poppins_500Medium'
                    //fontFamily:  'Poppins_600SemiBold'
                    //paddingBottom: hp(1)
                },

                // Render custom icon per route
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = '', type = '';

                    if (route.name === 'Home') {
                        iconName = focused ? 'home-sharp' : 'home-outline';
                        type = 'Ionicons';
                    } else if (route.name === 'Orders') {
                        iconName = focused ? 'cart' : 'cart-outline';
                        type = 'Ionicons';
                    } 
                    // else if (route.name === 'categories') {
                    //     iconName = focused ? 'grid' : 'grid-outline';
                    //     type = 'Ionicons';
                    // } 
                    else if (route.name === 'Profile') {
                        iconName = focused ? 'account' : 'account-outline';
                        type = 'MaterialCommunityIcons';
                    }


                    return (
                        <Icon 
                            name={iconName} 
                            color={color} 
                            size={size} 
                            type={type} 
                        />
                    );
                    

                    
                },
            })}
        >
            <Tabs.Screen
                name="Home"
                options={{ tabBarLabel: 'Home' }}
            />
            <Tabs.Screen
                name="Orders"
                options={{ tabBarLabel: 'Orders' }}
            />
            {/* <Tabs.Screen 
                name="wishlist" 
                options={{ tabBarLabel: 'Wishlist' }} 
            /> */}
            <Tabs.Screen
                name="cat"
                options={{ tabBarLabel: 'Categories' }}
            />
            <Tabs.Screen
                name="profile"
                options={{ tabBarLabel: 'Profile' }}
            />
        </Tabs>
    );
};

export default TabLayout;