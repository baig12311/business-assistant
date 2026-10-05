import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Colors from '../../constants/colors';
import fonts, { fontSize } from '../../constants/typography';
import Input from './Input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Button from './Button';
interface Props {
    bottomSheetRef: React.RefObject<BottomSheet | null>;
    //options: any[]
    options: Record<string, any>[];
    searchable: boolean
    displayKeys: string[]
    searchPlaceholder: string
    title: string
    currency?:string
    onSelect: (value: any) => void;
}

const CustomBottomSheet: React.FC<Props> = ({ currency, displayKeys, searchPlaceholder, bottomSheetRef, options, title, onSelect, searchable }) => {
    const insets = useSafeAreaInsets()
    const [searchText, setSearchText] = useState('')
    //const countryNames=options.map(item => item.name)
    //     const filteredOptions = options.filter((option) =>
    //         typeof option === string ? option
    //     option.name
    //         ?.toLowerCase()
    //         .includes(searchText.trim().toLowerCase())
    // );

    const filteredOptions = options.filter((option) => {
        const text =
            typeof option === 'string'
                ? option
                : String(option.name ?? '');

        return text
            .toLowerCase()
            .includes(searchText.trim().toLowerCase());
    });
    return (
        <BottomSheet
            ref={bottomSheetRef}
            //index={-1}
            snapPoints={['60%', '90%']}
            enablePanDownToClose
            enableDynamicSizing={false}
            backdropComponent={(props) => (
                <BottomSheetBackdrop
                    {...props}
                    appearsOnIndex={0}
                    disappearsOnIndex={-1}
                    opacity={0.6}
                    pressBehavior="close"
                />
            )}
            backgroundStyle={{
                backgroundColor: Colors.background,
            }}
        >
            <BottomSheetScrollView
                showsVerticalScrollIndicator={false}
                style={[styles.sheet, { paddingBottom: insets.bottom }]}
            >
                <View style={{ marginBottom: hp(10) }}>
                    <Text style={styles.title}>{title}</Text>
                    {
                        searchable && (
                            <Input
                                placeholder={`Search ${searchPlaceholder}...`}
                                value={searchText}
                                onChangeText={setSearchText}
                                iconName='search-outline'
                                iconType='Ionicons'
                            />
                        )
                    }

                    {
                        filteredOptions.map((option, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={0.7}
                                    onPress={() => onSelect(option)}
                                    style={[styles.optionButton,

                                    index === 0 && { borderTopWidth: 1 },]}
                                >
                                    {
                                        typeof option === 'string' ? (
                                            <Text style={styles.options}>{option}</Text>

                                        ) : (
                                            //     displayKeys?.map((key)=>(
                                            //     <Text key={key}>{option[key]}</Text>
                                            // ))
                                            <View style={styles.optionContent}>

                                                {/* Left side */}
                                                <View style={styles.optionLeft}>
                                                    {displayKeys.includes('flag') && (
                                                        <Text style={styles.options}>
                                                            {option.flag}
                                                        </Text>
                                                    )}

                                                    {displayKeys.includes('name') && (
                                                        <Text style={styles.options}>
                                                            {option.name}
                                                        </Text>
                                                    )}

                                                    {displayKeys.includes('price') && (
                                                        <Text style={styles.options}>
                                                            {`${currency} ${option.price}`}
                                                        </Text>
                                                    )}
                                                </View>

                                                {/* Right side */}
                                                {displayKeys.includes('code') && (
                                                    <Text style={styles.options}>
                                                        {option.code}
                                                    </Text>
                                                )}

                                                {displayKeys.includes('stock_quantity') && (
                                                        <Text style={styles.options}>
                                                            {`Stock: ${option.stock_quantity}`}
                                                        </Text>
                                                    )}

                                                {displayKeys.includes('dialCode') && (
                                                    <Text style={styles.options}>
                                                        {option.dialCode}
                                                    </Text>
                                                )}

                                            </View>
                                        )
                                    }

                                </TouchableOpacity>

                            )
                        })
                    }
                </View>

            </BottomSheetScrollView>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    sheet: {
        padding: hp(2),
    },
    optionButton: {
        //borderWidth:1,
        paddingVertical: hp(1.5),
        borderBottomWidth: 1,
        borderColor: Colors.border,
        //flexDirection: 'row',
        justifyContent: 'space-between'
        //marginBottom:hp(1),
    },
    optionContent:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    optionLeft:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    title: {
        fontFamily: fonts.bold,
        fontSize: fontSize.subHeading,
        color: Colors.text,
        marginBottom: hp(1)
    },
    options: {
        fontFamily: fonts.medium,
        fontSize: fontSize.text,
        color: Colors.text,
    }

});

//make this component available to the app
export default CustomBottomSheet;
