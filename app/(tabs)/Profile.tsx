
// import { View, Text, StyleSheet } from 'react-native';
// import Colors from '../../src/constants/colors';
// import { logout } from '../../src/services/authService';
// import Button from '../../src/components/common/Button';
// const Profile = () => {
//     return (
//         <View style={styles.container}>
//             <Text>Profile</Text>
//             <Button
//             title='Log Out'
//             onPress={logout}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: Colors.background,
//     },
// });

// //make this component available to the app
// export default Profile;




import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';

import Colors from '../../src/constants/colors';
import fonts, { fontSize } from '../../src/constants/typography';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Icon from '../../src/components/common/Icon';
import ProfileMenuItem from '../../src/components/profile/ProfileMenuItems';

import { useUser } from '../../src/hooks/useUser';
import { useBusiness } from '../../src/hooks/useBusiness';
import { useProducts } from '../../src/hooks/useProducts';
import { useCustomers } from '../../src/hooks/useCustomer';

import { supabase } from '../../src/lib/supabase';

const Profile = () => {
    const queryClient = useQueryClient();

    const { data: user, isLoading: userLoading } = useUser();

    const {
        data: business,
        isLoading: businessLoading,
    } = useBusiness(user?.id);

    const { data: products, isLoading: productsLoading } =
        useProducts(business?.id);

    const { data: customers, isLoading: customersLoading } =
        useCustomers(business?.id);

    const [loggingOut, setLoggingOut] = useState(false);

    const isLoading =
        userLoading ||
        businessLoading ||
        productsLoading ||
        customersLoading;

    const userName =
        user?.user_metadata?.name ||
        user?.email?.split('@')[0] ||
        'Business Owner';

    const businessName = business?.name || 'Your Business';

    const email = user?.email || 'No email available';

    const getInitials = (name: string) => {
        return name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((word) => word[0]?.toUpperCase() || '')
            .join('');
    };

    const handleLogout = () => {
        Alert.alert(
            'Log out',
            'Are you sure you want to log out of your account?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Log Out',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            setLoggingOut(true);

                            const { error } =
                                await supabase.auth.signOut();

                            if (error) {
                                throw error;
                            }

                            queryClient.clear();

                            router.replace('/sign-in' as any);
                        } catch (error) {
                            Alert.alert(
                                'Unable to log out',
                                error instanceof Error
                                    ? error.message
                                    : 'Something went wrong. Please try again.'
                            );
                        } finally {
                            setLoggingOut(false);
                        }
                    },
                },
            ]
        );
    };

    const handleNavigation = (path: string) => {
        router.push(path as any);
    };

    return (
        <SafeAreaView
            style={styles.safeArea}
            edges={['top']}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>
                            Profile
                        </Text>

                        <Text style={styles.headerSubtitle}>
                            Manage your account and business
                        </Text>
                    </View>

                    <View style={styles.headerIcon}>
                        <Icon
                            name="settings-outline"
                            type="Ionicons"
                            size={wp(5.5)}
                            color={Colors.primary}
                        />
                    </View>
                </View>

                {/* User profile card */}
                <View style={styles.profileCard}>
                    <View style={styles.profileTop}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>
                                {getInitials(userName)}
                            </Text>
                        </View>

                        <View style={styles.profileInfo}>
                            <Text
                                style={styles.userName}
                                numberOfLines={1}
                            >
                                {userName}
                            </Text>

                            <Text
                                style={styles.userEmail}
                                numberOfLines={2}
                            >
                                {email}
                            </Text>

                            <View style={styles.accountBadge}>
                                <View style={styles.statusDot} />

                                <Text style={styles.accountBadgeText}>
                                    Account active
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.editButton}
                            activeOpacity={0.75}
                            onPress={() =>
                                handleNavigation('/personal-information')
                            }
                        >
                            <Icon
                                name="create-outline"
                                type="Ionicons"
                                size={wp(5)}
                                color={Colors.primary}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.cardDivider} />

                    <TouchableOpacity
                        style={styles.businessRow}
                        activeOpacity={0.75}
                        onPress={() =>
                            handleNavigation('/business-information')
                        }
                    >
                        <View style={styles.businessIcon}>
                            <Icon
                                name="storefront-outline"
                                type="Ionicons"
                                size={wp(6)}
                                color={Colors.primary}
                            />
                        </View>

                        <View style={styles.businessInfo}>
                            <Text style={styles.businessLabel}>
                                YOUR BUSINESS
                            </Text>

                            <Text
                                style={styles.businessName}
                                numberOfLines={1}
                            >
                                {businessName}
                            </Text>

                            <Text style={styles.businessCategory}>
                                {business?.category ||
                                    'Manage business details'}
                            </Text>
                        </View>

                        <Icon
                            name="chevron-forward"
                            type="Ionicons"
                            size={wp(5)}
                            color={Colors.textMuted}
                        />
                    </TouchableOpacity>
                </View>

                {/* Business overview */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Business overview
                    </Text>

                    <View style={styles.statsContainer}>
                        <View style={styles.statCard}>
                            <View style={styles.statTop}>
                                <View style={styles.statIcon}>
                                    <Icon
                                        name="cube-outline"
                                        type="Ionicons"
                                        size={wp(5.5)}
                                        color={Colors.primary}
                                    />
                                </View>

                                <Icon
                                    name="trending-up-outline"
                                    type="Ionicons"
                                    size={wp(4.5)}
                                    color={Colors.success}
                                />
                            </View>

                            {isLoading ? (
                                <ActivityIndicator
                                    size="small"
                                    color={Colors.primary}
                                />
                            ) : (
                                <Text style={styles.statValue}>
                                    {products?.length ?? 0}
                                </Text>
                            )}

                            <Text style={styles.statLabel}>
                                Products
                            </Text>
                        </View>

                        <View style={styles.statCard}>
                            <View style={styles.statTop}>
                                <View style={styles.statIcon}>
                                    <Icon
                                        name="people-outline"
                                        type="Ionicons"
                                        size={wp(5.5)}
                                        color={Colors.primary}
                                    />
                                </View>

                                <Icon
                                    name="people-outline"
                                    type="Ionicons"
                                    size={wp(4.5)}
                                    color={Colors.textMuted}
                                />
                            </View>

                            {isLoading ? (
                                <ActivityIndicator
                                    size="small"
                                    color={Colors.primary}
                                />
                            ) : (
                                <Text style={styles.statValue}>
                                    {customers?.length ?? 0}
                                </Text>
                            )}

                            <Text style={styles.statLabel}>
                                Customers
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Business management */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Business management
                    </Text>

                    <View style={styles.menuCard}>
                        <ProfileMenuItem
                            title="Business information"
                            subtitle="Name, category and contact details"
                            icon="storefront-outline"
                            onPress={() =>
                                handleNavigation('/business-information')
                            }
                        />

                        <ProfileMenuItem
                            title="Currency & invoices"
                            subtitle="Currency and receipt preferences"
                            icon="receipt-outline"
                            onPress={() =>
                                handleNavigation('/invoice-settings')
                            }
                        />

                        <ProfileMenuItem
                            title="Business preferences"
                            subtitle="Customize your business settings"
                            icon="options-outline"
                            onPress={() =>
                                handleNavigation('/business-settings')
                            }
                            showDivider={false}
                        />
                    </View>
                </View>

                {/* Account settings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Account settings
                    </Text>

                    <View style={styles.menuCard}>
                        <ProfileMenuItem
                            title="Personal information"
                            subtitle="Your name and account details"
                            icon="person-outline"
                            onPress={() =>
                                handleNavigation('/personal-information')
                            }
                        />

                        <ProfileMenuItem
                            title="Security"
                            subtitle="Password and account security"
                            icon="shield-checkmark-outline"
                            onPress={() =>
                                handleNavigation('/security')
                            }
                            showDivider={false}
                        />
                    </View>
                </View>

                {/* Support */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Support
                    </Text>

                    <View style={styles.menuCard}>
                        <ProfileMenuItem
                            title="Language"
                            subtitle="Choose your preferred language"
                            icon="language-outline"
                            onPress={() =>
                                handleNavigation('/language')
                            }
                        />

                        <ProfileMenuItem
                            title="Help & support"
                            subtitle="Get help using the app"
                            icon="help-circle-outline"
                            onPress={() =>
                                handleNavigation('/support')
                            }
                        />

                        <ProfileMenuItem
                            title="About app"
                            subtitle="App version and legal information"
                            icon="information-circle-outline"
                            onPress={() =>
                                handleNavigation('/about')
                            }
                            showDivider={false}
                        />
                    </View>
                </View>

                {/* Logout */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    activeOpacity={0.75}
                    disabled={loggingOut}
                    onPress={handleLogout}
                >
                    {loggingOut ? (
                        <ActivityIndicator
                            size="small"
                            color={Colors.error}
                        />
                    ) : (
                        <Icon
                            name="log-out-outline"
                            type="Ionicons"
                            size={wp(5.5)}
                            color={Colors.error}
                        />
                    )}

                    <Text style={styles.logoutText}>
                        {loggingOut ? 'Logging out...' : 'Log out'}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.versionText}>
                    Business Assistant
                </Text>

                <Text style={styles.versionSubtext}>
                    Manage smarter. Grow better.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    scrollContent: {
        paddingHorizontal: wp(4.5),
        paddingTop: hp(1.5),
        paddingBottom: hp(4),
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: hp(2.5),
    },

    headerTitle: {
        fontFamily: fonts.bold,
        fontSize: wp(6.5),
        color: Colors.text,
    },

    headerSubtitle: {
        fontFamily: fonts.regular,
        fontSize: fontSize.smallText,
        color: Colors.textSecondary,
        marginTop: hp(0.4),
    },

    headerIcon: {
        width: wp(11),
        height: wp(11),
        borderRadius: wp(3.5),
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },

    profileCard: {
        backgroundColor: Colors.surface,
        borderRadius: wp(4.5),
        padding: wp(4),
        borderWidth: 1,
        borderColor: Colors.border,
        marginBottom: hp(2.8),
    },

    profileTop: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    avatar: {
        width: wp(15),
        height: wp(15),
        borderRadius: wp(4.5),
        backgroundColor: Colors.successLight,
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarText: {
        fontFamily: fonts.bold,
        fontSize: wp(5),
        color: Colors.primaryDark,
    },

    profileInfo: {
        flex: 1,
        marginLeft: wp(3.5),
        marginRight: wp(2),
    },

    userName: {
        fontFamily: fonts.semiBold,
        fontSize: fontSize.subHeading,
        color: Colors.text,
    },

    userEmail: {
        fontFamily: fonts.regular,
        fontSize: fontSize.smallText,
        color: Colors.textSecondary,
        marginTop: hp(0.4),
    },

    accountBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop: hp(0.8),
        backgroundColor: Colors.successLight,
        borderRadius: wp(5),
        paddingHorizontal: wp(2.2),
        paddingVertical: hp(0.45),
    },

    statusDot: {
        width: wp(1.5),
        height: wp(1.5),
        borderRadius: wp(1),
        backgroundColor: Colors.success,
        marginRight: wp(1.5),
    },

    accountBadgeText: {
        fontFamily: fonts.medium,
        fontSize: wp(2.8),
        color: Colors.success,
    },

    editButton: {
        width: wp(9),
        height: wp(9),
        borderRadius: wp(3),
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardDivider: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: hp(2),
    },

    businessRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    businessIcon: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(3.5),
        backgroundColor: Colors.successLight,
        alignItems: 'center',
        justifyContent: 'center',
    },

    businessInfo: {
        flex: 1,
        marginLeft: wp(3),
        marginRight: wp(2),
    },

    businessLabel: {
        fontFamily: fonts.medium,
        fontSize: wp(2.8),
        color: Colors.textMuted,
        letterSpacing: 0.8,
    },

    businessName: {
        fontFamily: fonts.semiBold,
        fontSize: fontSize.text,
        color: Colors.text,
        marginTop: hp(0.3),
    },

    businessCategory: {
        fontFamily: fonts.regular,
        fontSize: fontSize.smallText,
        color: Colors.textSecondary,
        marginTop: hp(0.3),
    },

    section: {
        marginBottom: hp(2.6),
    },

    sectionTitle: {
        fontFamily: fonts.semiBold,
        fontSize: fontSize.subHeading,
        color: Colors.text,
        marginBottom: hp(1.2),
    },

    statsContainer: {
        flexDirection: 'row',
        gap: wp(3),
    },

    statCard: {
        flex: 1,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: wp(4),
        padding: wp(3.5),
        minHeight: hp(14),
        justifyContent: 'space-between',
    },

    statTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    statIcon: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(3),
        backgroundColor: Colors.successLight,
        alignItems: 'center',
        justifyContent: 'center',
    },

    statValue: {
        fontFamily: fonts.bold,
        fontSize: wp(6),
        color: Colors.text,
        marginTop: hp(1),
    },

    statLabel: {
        fontFamily: fonts.medium,
        fontSize: fontSize.smallText,
        color: Colors.textSecondary,
        marginTop: hp(0.3),
    },

    menuCard: {
        backgroundColor: Colors.surface,
        borderRadius: wp(4),
        borderWidth: 1,
        borderColor: Colors.border,
        paddingHorizontal: wp(3.5),
    },

    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: wp(2.5),
        minHeight: hp(6.5),
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: wp(4),
        marginTop: hp(0.5),
    },

    logoutText: {
        fontFamily: fonts.semiBold,
        fontSize: fontSize.text,
        color: Colors.error,
    },

    versionText: {
        fontFamily: fonts.medium,
        fontSize: fontSize.smallText,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginTop: hp(2.5),
    },

    versionSubtext: {
        fontFamily: fonts.regular,
        fontSize: wp(3),
        color: Colors.textMuted,
        textAlign: 'center',
        marginTop: hp(0.4),
    },
});

