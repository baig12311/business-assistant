import { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import styles from './BusinessStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../../src/components/common/Input';
import SelectInput from '../../src/components/common/SelectInput';
import Button from '../../src/components/common/Button';
import { takePhoto, pickFromLibrary } from '../../src/services/imagePicker';
import { supabase } from '../../src/lib/supabase';
import { useUser } from '../../src/hooks/useUser';
import { router, useLocalSearchParams } from 'expo-router';
import { uploadImage } from '../../src/services/convertImage';
import Icon from '../../src/components/common/Icon';
import Colors from '../../src/constants/colors';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Header from '../../src/components/common/Header';
import ImageSheet from '../../src/components/uploadImage/ImageSheet';
import { businessSchema } from '../../src/services/schema/businessSchema';
import CustomBottomSheet from '../../src/components/common/CustomBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { currencies } from '../../src/services/data/currencies';
import { businessCategories } from '../../src/services/data/categories';
import { Image } from 'expo-image';
const BusinessSetup = () => {

    const { data: user, isLoading, error } = useUser()

    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState('')
    const [currency, setCurrency] = useState('')
    const [businessName, setBusinessName] = useState('')
    const [number, setNumber] = useState('')
    const [image, setImage] = useState<string | null>(null)
    const [imageSheet, setShowImageSheet] = useState(false)
    const [showSheet, setShowSheet] = useState(false)
    const [sheetTitle, setSheetTitle] = useState('');
    const [sheetOptions, setSheetOptions] = useState<string[]>([]);
    const [sheetValue, setSheetValue] = useState('');
    const sheetRef = useRef<BottomSheet>(null)
    const imageSheetRef = useRef<BottomSheet>(null)
    const [errors, setErrors] = useState<{
        businessName?: string;
        number?: string;
        currency?: string;
        category?: string
    }>({})
    const isDisabled = !businessName || !category || !currency || !number
    // Open Sheet
    const openSheet = (
        title: string,
        options: string[],
        value: string
    ) => {
        setSheetTitle(title);
        setSheetOptions(options);
        setSheetValue(value);

        sheetRef.current?.snapToIndex(0);
    };

    // Select Value Handler
    const handleSelect = (value: string) => {
        if (sheetTitle === 'Select Category') {
            setCategory(value);
        }
        if (sheetTitle === 'Select Currency') {
            setCurrency(value);
        }
        sheetRef.current?.close();
        setShowSheet(false);
    };

    // handle image action
    const handleImageAction = async (action: 'camera' | 'gallery' | 'remove') => {
        imageSheetRef.current?.close()
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

    // Hande Create Business
    const createBusiness = async () => {
        setLoading(true)
        const result = businessSchema.safeParse({
            businessName,
            category,
            number,
            currency,
        });

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;

            setErrors({
                businessName: fieldErrors.businessName?.[0],
                category: fieldErrors.category?.[0],
                currency: fieldErrors.currency?.[0],
                number: fieldErrors.number?.[0]
            })
            setLoading(false);
            return;
        }
        if (!user) {
            console.log('No authenticated user');
            return;
        }
        let imageUrl
        if (image) {
            imageUrl = await uploadImage(image,
                'business-logos',
                user?.id
            )
        }

        const { data, error } = await supabase
            .from('businesses')
            .insert({
                owner_id: user.id,
                name: businessName,
                category: category,
                currency: currency,
                whatsapp_number: number,
                logo_url: imageUrl
            })
            .select()
            .single();
        if (error) {
            console.log('Create Business Error:', error.message);
            setLoading(false)
            return;
        }
        router.replace('/Home')
        setLoading(false)
    };

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <Header title='Setup Business'
                        onPress={() => router.back()} />
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={styles.heading}>Let's setup your business</Text>
                        <Text style={styles.sub}>Tell us few deatails to get started.</Text>
                        <View style={styles.logoContainer}>
                            {
                                image ? (
                                    <Image
                                        style={styles.image}
                                        source={{ uri: image }}
                                    />
                                ) : (<TouchableOpacity
                                    style={styles.uploadImage}
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        setShowImageSheet(true),
                                            imageSheetRef.current?.snapToIndex(0)
                                    }}
                                >
                                    <Icon
                                        name='upload-file'
                                        type='MaterialIcons'
                                        color={Colors.primary}
                                        size={wp(10)}

                                    />
                                </TouchableOpacity>)

                            }
                            <Text style={styles.uploadText}>{image ? 'selected logo' : 'upload business logo'}</Text>
                        </View>
                        <Input
                            title='Business Name*'
                            placeholder='John Traders'
                            iconName='storefront-outline'
                            iconType='Ionicons'
                            value={businessName}
                            onChangeText={(text: string) => {
                                setBusinessName(text),
                                    setErrors({
                                        ...errors,
                                        businessName: undefined
                                    })
                            }}
                            error={errors.businessName}
                        />
                        <SelectInput
                            title='Category*'
                            placeholder='Select Category'
                            value={category}
                            iconName='apps-outline'
                            iconType='Ionicons'
                            error={errors.category}
                            onPress={() => {
                                setShowSheet(true)
                                openSheet(
                                    'Select Category',
                                    businessCategories,
                                    category

                                )
                            }}
                        />
                        <Input
                            title='Whatsapp number*'
                            placeholder='+92 XXXXXXXXXX'
                            iconName='call-outline'
                            iconType='Ionicons'
                            keyboard='phone-pad'
                            value={number}
                            onChangeText={(text: string) => {
                                setNumber(text),
                                    setErrors({
                                        ...errors,
                                        number: undefined
                                    })
                            }}
                            error={errors.number}
                        />
                        <SelectInput
                            title='Currency*'
                            placeholder='Select Currency'
                            iconName='currency-usd'
                            iconType='MaterialDesignIcons'
                            value={currency}
                            error={errors.currency}
                            onPress={() => {
                                setShowSheet(true)
                                openSheet(
                                    'Select Currency',
                                    currencies,
                                    currency

                                )
                            }}
                        />
                        <View style={styles.button}>
                            <Button
                                title='Create Business'
                                onPress={createBusiness}
                                isLoading={loading}
                                disabled={isDisabled}
                            />
                        </View>



                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
            {
                showSheet && (
                    <CustomBottomSheet
                        bottomSheetRef={sheetRef}
                        options={sheetOptions}
                        title={sheetTitle}
                        onSelect={handleSelect}
                    //value=
                    />
                )

            }
            {
                imageSheet && (
                    <ImageSheet
                        bottomSheetRef={imageSheetRef}
                        onAction={handleImageAction}
                    //value=
                    />
                )
            }
        </View>

    );
};

export default BusinessSetup;
