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
                    height: hp(7.5) + insets.bottom,
                },

                // Style the native label directly
                tabBarLabelStyle: {
                    fontSize: wp(3.2),
                    fontFamily:fonts.medium,
                    //fontSize:fontSize.extraSmallText
                },

                // Render custom icon per route
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = '', type = '';
                    if (route.name === 'Home') {
                        iconName = focused ? 'home-fill' : 'home';
                        type = 'Octicons';
                    } else if (route.name === 'Orders') {
                        iconName = focused ? 'receipt' : 'receipt-outline';
                        type = 'Ionicons';
                    }
                    else if (route.name === 'Products') {
                        iconName = focused ? 'cube' : 'cube-outline';
                        type = 'Ionicons';
                    } 
                    else if(route.name === 'Customers')
                    {
                        iconName = focused ? 'people' : 'people-outline';
                        type = 'Ionicons';
                    }
                    else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                        type = 'Ionicons';
                    }
                    
                    


                    return (
                        <Icon 
                            name={iconName} 
                            color={color} 
                            size={wp(6)} 
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
                name="Products"
                options={{ tabBarLabel: 'Products' }}
            />
            <Tabs.Screen
                name="Customers"
                options={{ tabBarLabel: 'Customers' }}
            />
            <Tabs.Screen
                name="Profile"
                options={{ tabBarLabel: 'Profile' }}
            />
        </Tabs>
    );
};

export default TabLayout;