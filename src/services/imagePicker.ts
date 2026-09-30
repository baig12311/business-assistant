import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const takePhoto = async (): Promise<string | null> => {
    const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
        Alert.alert(
            'Permission Required',
            'Permission to access camera is required'
        );
        return null;
    }

    const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });

    if (result.canceled) {
        return null;
    }

    return result.assets[0].uri;
};

export const pickFromLibrary = async (): Promise<string | null> => {
    const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
        Alert.alert(
            'Permission Required',
            'Permission to access media library is required'
        );
        return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });

    if (result.canceled) {
        return null;
    }

    return result.assets[0].uri;
};