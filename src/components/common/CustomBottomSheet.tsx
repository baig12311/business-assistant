import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Colors from '../../constants/colors';
import fonts, { fontSize } from '../../constants/typography';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Button from './Button';
interface Props {
    bottomSheetRef: React.RefObject<BottomSheet | null>;
    options: string[]
    title: string
    onSelect: (value: string) => void;
}

const CustomBottomSheet: React.FC<Props> = ({ bottomSheetRef, options, title, onSelect }) => {
    const insets = useSafeAreaInsets()


    return (
        <BottomSheet
            ref={bottomSheetRef}
            //index={-1}
            //snapPoints={['65%']}
            enablePanDownToClose
            enableDynamicSizing={true}
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
            <BottomSheetView
                style={[styles.sheet, { paddingBottom: insets.bottom }]}
            >
                <View style={{ marginBottom: hp(3) }}>
                    <Text style={styles.title}>{title}</Text>
                    {
                        options.map((option, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={0.7}
                                    onPress={() => onSelect(option)}
                                    style={[styles.optionButton,

                                    index === 0 && { borderTopWidth: 1 },]}
                                >
                                    <Text style={styles.options}>{option}</Text>
                                </TouchableOpacity>

                            )
                        })
                    }
                </View>

            </BottomSheetView>
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
        //marginBottom:hp(1),
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
