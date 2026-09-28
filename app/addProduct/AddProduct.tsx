import { useState, useRef } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Platform, Alert, TouchableOpacity } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { File } from 'expo-file-system';
import ImageSheet from '../../src/components/uploadImage/ImageSheet';
import { router } from 'expo-router';
import Colors from '../../src/constants/colors';
import Icon from '../../src/components/common/Icon';
import Input from '../../src/components/common/Input';
import Button from '../../src/components/common/Button';
import { useUser } from '../../src/hooks/useUser';
import { useBusiness } from '../../src/hooks/useBusiness';
import { supabase } from '../../src/lib/supabase';
import Header from '../../src/components/common/Header';
import { Image } from 'expo-image';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { productSchema } from '../../src/services/schema/productSchema';
import styles from './AddProductStyle';
import { readonly } from 'zod';
import BottomSheet from '@gorhom/bottom-sheet';
const AddProduct = () => {
    const queryClient = useQueryClient()
    const [image, setImage] = useState<string | null>(null)
    const [showSheet, setShowSheet] = useState(false)
    const sheetRef = useRef<BottomSheet>(null)
    const [Loading, setLoading] = useState(false)
    const { data: user } = useUser()
    const { data: business } = useBusiness(user?.id)
    const businessId = business.id

    const [product, setProduct] = useState({
        productName: '',
        description: '',
        costPrice: '',
        price: '',
        stockQuantity: '',
        lowStockThreshold: ''
    })
    const [errors, setErrors] = useState<{
        name?: string;
        desc?: string;
        price?: string;
        costPrice?: string
        stock?: string
        lowStock?: string
    }>({})
    //taking photo from camera
    const takePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync()

        if (!permissionResult.granted) {
            Alert.alert('Permission Required', 'Permission to access camera is required')
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;



            setImage(imageUri);
        }
    }

    // choosing photo from gallery
    const pickFromLibrary = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (!permissionResult.granted) {
            Alert.alert('Permission Required', 'Permission to access media library is required')
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;

            console.log('SELECTED IMAGE:', imageUri);

            setImage(imageUri);
        }

    }

    // image action
    const handleImageAction = async (action: 'camera' | 'gallery' | 'remove') => {
        sheetRef.current?.close()
        if (action === 'camera') {
            await takePhoto()
        }
        else if (action === 'gallery') {
            await pickFromLibrary()
        }
        // else if (action === 'remove') {
        //     await removeImage()
        // }
    }
    // imageURL extract
    const uploadImage = async (imageUri: string) => {
        const file = new File(imageUri);

        const arrayBuffer = await file.arrayBuffer();

        const fileName = `${Date.now()}.jpg`;
        const filePath = `${businessId}/${fileName}`;

        const { error } = await supabase.storage
            .from('product-images')
            .upload(filePath, arrayBuffer, {
                contentType: 'image/jpeg',
                upsert: false,
            });

        if (error) {
            throw new Error(error.message);
        }

        const { data } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath);

        return data.publicUrl;
    };
    // add product
    const AddProduct = async () => {
        setLoading(true)

        const result = productSchema.safeParse(product)
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors({
                name: fieldErrors.productName?.[0],
                desc: fieldErrors.description?.[0],
                costPrice: fieldErrors.costPrice?.[0],
                price: fieldErrors.price?.[0],
                stock: fieldErrors.stockQuantity?.[0],
                lowStock: fieldErrors.lowStockThreshold?.[0]
            })
        }
        let imageUrl = null;

        if (image) {
            imageUrl = await uploadImage(image);
        }
        const { data, error } = await supabase
            .from('products')
            .insert({
                business_id: businessId,
                name: product.productName,
                description: product.description,
                price: Number(product.price),
                cost_price: Number(product.costPrice),
                stock_quantity: Number(product.stockQuantity),
                low_stock_threshold: Number(product.lowStockThreshold),
                image_url: imageUrl
            });

        if (error) {
            console.log('Product Error:', error.message);
            setLoading(false);
            return;
        }
        await queryClient.invalidateQueries({
            queryKey: ['products', business.id],
        });
        setLoading(false)
        router.back()
        setProduct({
            productName: '',
            description: '',
            costPrice: '',
            price: '',
            stockQuantity: '',
            lowStockThreshold: ''
        })
    }
    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <Header title='Add Product' onPress={() => router.back()} />
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        {/* <Text style={styles.heading}>Add new product</Text> */}
                        <View style={styles.imageContainer}>
                            <TouchableOpacity
                                style={styles.selectImage}
                                activeOpacity={0.7}
                                onPress={() => {
                                    setShowSheet(true),
                                        sheetRef.current?.snapToIndex(0)
                                }}
                            >
                                {
                                    image ? (
                                        <Image
                                            source={{ uri: image }}
                                            style={styles.image}
                                        />
                                    ) : (
                                        <Icon
                                            name='cloud-upload-outline'
                                            type='Ionicons'
                                            size={wp(13)}
                                            color={Colors.primaryDark}
                                        />
                                    )
                                }

                            </TouchableOpacity>
                            <Text style={styles.text}>{image ? 'selected image' : 'upload product image'}</Text>
                        </View>
                        <Input
                            title='Product Name*'
                            placeholder='Product'
                            value={product.productName}
                            onChangeText={(text: string) => {
                                setProduct({
                                    ...product,
                                    productName: text
                                })
                            }}
                            error={errors.name}
                        // iconName='person-outline'
                        // iconType='Ionicons'
                        />
                        <Input
                            title='Description (optional)'
                            placeholder='This product is ......'
                            value={product.description}
                            onChangeText={(text: string) => {
                                setProduct({
                                    ...product,
                                    description: text
                                })
                            }}
                            error={errors.desc}
                        // iconName='mail-outline'
                        // iconType='Ionicons'
                        // keyboard='email-address'
                        />
                        <Input
                            title='Selling Price*'
                            placeholder='123'
                            keyboard='numeric'
                            value={product.price}
                            onChangeText={(text: string) => {
                                setProduct({
                                    ...product,
                                    price: text
                                })
                            }}
                            error={errors.price}
                        // iconName='lock'
                        // iconType='SimpleLineIcons'

                        />
                        <Input
                            title='Cost Price*'
                            placeholder='123'
                            keyboard='numeric'
                            value={product.costPrice}
                            onChangeText={(text: string) => {
                                setProduct({
                                    ...product,
                                    costPrice: text
                                })
                            }}
                            error={errors.costPrice}
                        // iconName='lock'
                        // iconType='SimpleLineIcons'
                        />
                        <Input
                            title='Stock Quantity*'
                            placeholder='0'
                            keyboard='numeric'
                            value={product.stockQuantity}
                            onChangeText={(text: string) => {
                                setProduct({
                                    ...product,
                                    stockQuantity: text
                                })
                            }}
                            error={errors.stock}
                        />
                        <Input
                            title='Low Stock Threshold (optional)'
                            placeholder='0'
                            keyboard='numeric'
                            value={product.lowStockThreshold}
                            onChangeText={(text: string) => {
                                setProduct({
                                    ...product,
                                    lowStockThreshold: text
                                })
                            }}
                            error={errors.lowStock}

                        />
                        <View style={styles.button}>
                            <Button
                                title='Add Product'
                                onPress={AddProduct}
                                isLoading={Loading}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

            </SafeAreaView>
            {
                showSheet && (
                    <ImageSheet
                        bottomSheetRef={sheetRef}

                        onAction={handleImageAction}
                    />
                )
            }
        </View>

    );
};

export default AddProduct;
