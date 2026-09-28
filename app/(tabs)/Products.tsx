import { View, Text, StyleSheet, Touchable, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../../src/constants/colors';

import { useUser } from '../../src/hooks/useUser';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { router } from 'expo-router';
import fonts, { fontSize } from '../../src/constants/typography';
import Header from '../../src/components/common/Header';
import { useBusiness } from '../../src/hooks/useBusiness';
import Icon from '../../src/components/common/Icon';
import { quickActions } from '../../src/services/data/quickActions';
import Input from '../../src/components/common/Input';
import { useProducts } from '../../src/hooks/useProducts';
import ProductCard from '../../src/components/product/ProductCard';
import ActionCard from '../../src/components/home/ActionCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardCard from '../../src/components/home/DashboardCard';
import { useState } from 'react';
const Products = () => {
    const { data } = useUser()
    const userId = data?.id
    const { data: business } = useBusiness(userId)
    const { data: products } = useProducts(business?.id)
    const [searchText, setSearchText] = useState('')
    // search products
    const filterProducts = products?.filter(item =>
        item.name.toLowerCase().
            includes(searchText.trim().toLocaleLowerCase())
    )
    // render product
    const renderProduct = ({ item }: any) => {
        return (
            <ProductCard
                name={item.name}
                price={item.price}
                stock={item.stock_quantity}
                lowStock={item.low_stock_threshold}
                currency={business?.currency}
                imageurl={item.image_url}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title='Products' onPress={() => router.back()} />
            <Input
                placeholder='Search products...'
                value={searchText}
                onChangeText={setSearchText}
                iconName='search-outline'
                iconType='Ionicons'
            />
            <FlatList
                contentContainerStyle={{ flexGrow: 1, marginBottom: hp(6) }}
                data={filterProducts ?? []}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    searchText.trim() !== '' ? (
                        <View>
                            <Text>Nothing found matching {searchText}</Text>
                        </View>
                    ) : (
                        <View>
                            <Text>No products added yet</Text>
                        </View>
                    )
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        padding: wp(3),
        flex: 1
    },

});

export default Products;
