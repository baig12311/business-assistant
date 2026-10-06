import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetFlatList} from '@gorhom/bottom-sheet';
import Colors from '../../constants/colors';
import fonts, { fontSize } from '../../constants/typography';
import Input from './Input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import CustomEmptyComponent from './CustomEmptyComponent';
import Button from './Button';
interface Props {
    bottomSheetRef: React.RefObject<BottomSheet | null>;
    //options: any[]
    options: Record<string, any>[];
    searchable: boolean
    displayKeys: string[]
    searchPlaceholder: string
    title: string
    currency?: string
    emptyMessage?:string
    emptyTitle?:string
    onSelect: (value: any) => void;
}

const CustomBottomSheet: React.FC<Props> = ({emptyMessage, emptyTitle, currency, displayKeys, searchPlaceholder, bottomSheetRef, options, title, onSelect, searchable }) => {
    const insets = useSafeAreaInsets()
    const [searchText, setSearchText] = useState('')
    // filter item
    const filteredOptions = options.filter((option) => {
        const text =
            typeof option === 'string'
                ? option
                : String(option.name ?? '');

        return text
            .toLowerCase()
            .includes(searchText.trim().toLowerCase());
    });

    // render options
    const renderOptions = ({ item: option, index }: { item: any, index: number }) => {
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
    }
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
           
            
                <View style={[styles.sheet, {paddingBottom: insets.bottom + hp(6)}]}>
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
                    <BottomSheetFlatList
                    data={filteredOptions}
                    renderItem={renderOptions}
                    showsVerticalScrollIndicator={false}
                    style={{borderWidth:1, borderColor: Colors.background
                    }}
                    contentContainerStyle={{paddingBottom:hp(6), marginBottom: hp(4)}}
                    ListEmptyComponent={
                        
                             <CustomEmptyComponent
                        mainText={emptyTitle}
                        subText={emptyMessage}
                        />
                       
                       
                    }

                    />
                </View>
          
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    sheet: {
        padding: hp(2),
        //borderWidth: 4,
        marginBottom: hp(5)
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
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    optionLeft: {
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
