import { supabase } from '../lib/supabase';

export const updateUserName = async (name: string) => {
    const { data, error } = await supabase.auth.updateUser({
        data: {
            name: name.trim(),
        },
    });

    if (error) {
        throw error;
    }

    return data.user;
};