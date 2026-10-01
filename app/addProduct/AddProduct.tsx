import { useState, useRef, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Platform, Alert, TouchableOpacity } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import { takePhoto, pickFromLibrary } from '../../src/services/imagePicker';
import ImageSheet from '../../src/components/uploadImage/ImageSheet';
import { router } from 'expo-router';
import Colors from '../../src/constants/colors';
import Icon from '../../src/components/common/Icon';
import Input from '../../src/components/common/Input';
import Button from '../../src/components/common/Button';
import { useUser } from '../../src/hooks/useUser';
import { useBusiness } from '../../src/hooks/useBusiness';
import { supabase } from '../../src/lib/supabase';
import { useLocalSearchParams } from 'expo-router';
import Header from '../../src/components/common/Header';
import { useAddProduct } from '../../src/hooks/useAddProduct';
import { useProducts, useProductById} from '../../src/hooks/useProducts';
import { useUpdateProduct } from '../../src/hooks/useUpdateProduct';
import { Image } from 'expo-image';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { productSchema } from '../../src/services/schema/productSchema';
import styles from './AddProductStyle';
import { uploadImage } from '../../src/services/convertImage';
import { readonly } from 'zod';
import BottomSheet from '@gorhom/bottom-sheet';
const AddProduct = () => {
    const { productId } = useLocalSearchParams<{
    productId: string;
}>();
    const [image, setImage] = useState<string | null>(null)
    const [existingImage, setExistingImage] = useState<string | null>(null);
    const [showSheet, setShowSheet] = useState(false)
    const [sheetEdit, setSheetEdit] = useState(false)
    const sheetRef = useRef<BottomSheet>(null)
    const { data: user } = useUser()
    const { data: business } = useBusiness(user?.id)
    const businessId = business.id
    const {data: selectedProduct, isLoading:loadingProduct, error} = useProductById(productId)
    const {
        mutateAsync: addProductMutation,
        isPending,
    } = useAddProduct(businessId);
    const {
        mutateAsync: updateProductMutation,
        isPending: pending,
    } = useUpdateProduct(businessId);
    const isLoading = isPending || pending
    const { data: productData } = useProducts(businessId)
    // const selectedProduct = productData?.find(
    //     (item: any) => item.id === productId
    // )

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

    //chekcing existing info
    const setSelectedProduct = () => {
        if (selectedProduct) {
            setProduct({
                productName: selectedProduct.name ?? '',
                description: selectedProduct.description ?? '',
                price: selectedProduct.price.toString() ?? '',
                costPrice: selectedProduct.cost_price.toString() ?? '',
                stockQuantity: selectedProduct.stock_quantity.toString() ?? '',
                lowStockThreshold: selectedProduct.low_stock_threshold.toString() ?? '',

            })
            if (selectedProduct.image_url) {
                setImage(selectedProduct.image_url ?? '')

                setSheetEdit(true)
                setExistingImage(selectedProduct.image_url);
            }





        }
    }
    useEffect(() => {
        setSelectedProduct()
    }, [selectedProduct])

    // image action
    const handleImageAction = async (action: 'camera' | 'gallery' | 'remove') => {
        sheetRef.current?.close()
        if (action === 'camera') {
            const imageUri = await takePhoto()
            if (imageUri) {
                setImage(imageUri);
            }
        }
        else if (action === 'gallery') {
            const imageUri = await pickFromLibrary()
            if (imageUri) {
                setImage(imageUri);
            }
        }
        // else if (action === 'remove') {
        //     await removeImage()
        // }
    }
    // update product 
    const updateProducts = async () => {
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
            return
        }
        let imageUrl = existingImage;

if (image && image !== existingImage) {
    imageUrl = await uploadImage(
        image,
        'product-images',
        businessId
    );
}
        await updateProductMutation({
            productId,
            name: product.productName,
            description: product.description,
            price: Number(product.price),
            costPrice: Number(product.costPrice),
            stockQuantity: Number(product.stockQuantity),
            lowStockThreshold: Number(product.lowStockThreshold),
            imageUrl,
        });
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
    // add product
    const AddProduct = async () => {
        if (productId) {
            await updateProducts()
        }
        else {

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

                return
            }
            let imageUrl = null;

            if (image) {
                imageUrl = await uploadImage(image,
                    'product-images',
                    businessId);
            }
            await addProductMutation({
                businessId,
                name: product.productName,
                description: product.description,
                price: Number(product.price),
                costPrice: Number(product.costPrice),
                stockQuantity: Number(product.stockQuantity),
                lowStockThreshold: Number(product.lowStockThreshold),
                imageUrl,
            });
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

    }
    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <Header title={productId ? 'Edit Product' : 'Add Product'}
                    onPress={() => router.back()}
                />
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        {
                            !productId && (<Text style={styles.subHeading}>Add product details to keep your inventory organized..</Text>
)
                        }
                        {/* <Text style={styles.heading}>Add new product</Text> */}
                        <View style={styles.imageContainer}>
                            {
                                image ? (
                                    <Image
                                        source={{ uri: image }}
                                        style={styles.image}
                                    />
                                ) : (
                                    <TouchableOpacity
                                        style={styles.selectImage}
                                        activeOpacity={0.7}
                                        onPress={() => {
                                            setShowSheet(true),
                                                sheetRef.current?.snapToIndex(0)
                                        }}
                                    >

                                        <Icon
                                            name='upload-file'
                                            type='MaterialIcons'
                                            size={wp(10)}
                                            color={Colors.primaryDark}
                                        />



                                    </TouchableOpacity>
                                )
                            }
                            {
                                (!productId && !image) && (
                                    <Text style={styles.text}>Upload product image</Text>

                                )
                            }
                            {
                                (productId || image) && (
                                    <TouchableOpacity
                                        style={styles.row}
                                        activeOpacity={0.7}
                                        onPress={() => {
                                            setShowSheet(true),
                                                sheetRef.current?.snapToIndex(0)
                                        }}
                                    >
                                        <Icon
                                            name='edit'
                                            type='Feather'
                                            size={wp(5)}
                                            color={Colors.success}
                                        />

                                        <Text style={[styles.rowText, { color: Colors.success }]}>Change product image</Text>

                                    </TouchableOpacity>
                                )
                            }

                        </View>
                        <Input
                            title='Product Name*'
                            placeholder='Product'
                            value={product.productName}

                            onChangeText={(text: string) => {
                                setProduct({
                                    ...product,
                                    productName: text,
                                });

                                setErrors({
                                    ...errors,
                                    name: undefined,
                                });
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
                                setErrors({
                                    ...errors,
                                    desc: undefined
                                })
                            }}
                            error={errors.desc}

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
                                setErrors({
                                    ...errors,
                                    price: undefined
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
                                setErrors({
                                    ...errors,
                                    costPrice: undefined
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
                                setErrors({
                                    ...errors,
                                    stock: undefined
                                })
                            }}
                            error={errors.stock}
                        />
                        <Input
                            title='Low Stock Threshold*'
                            placeholder='0'
                            keyboard='numeric'
                            value={product.lowStockThreshold}
                            onChangeText={(text: string) => {
                                setProduct({
                                    ...product,
                                    lowStockThreshold: text
                                })
                                setErrors({
                                    ...errors,
                                    lowStock: undefined
                                })
                            }}
                            error={errors.lowStock}

                        />
                        <View style={styles.button}>
                            <Button
                                title={productId ? 'Edit Product' : 'Add Product'}
                                onPress={AddProduct}
                                isLoading={isLoading}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

            </SafeAreaView>
            {
                showSheet && (
                    <ImageSheet
                        bottomSheetRef={sheetRef}
                        isEdit={sheetEdit}
                        onAction={handleImageAction}
                    />
                )
            }
        </View>

    );
};

export default AddProduct;
