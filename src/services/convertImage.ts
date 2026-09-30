import { File } from 'expo-file-system';
import { supabase } from '../lib/supabase';

export const uploadImage = async (
    imageUri: string,
    bucketName: string,
    folderName: string
) => {
    const file = new File(imageUri);

    const arrayBuffer = await file.arrayBuffer();

    const fileName = `${Date.now()}.jpg`;
    const filePath = `${folderName}/${fileName}`;

    const { error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, arrayBuffer, {
            contentType: 'image/jpeg',
            upsert: false,
        });

    if (error) {
        throw new Error(error.message);
    }

    const { data } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

    return data.publicUrl;
};