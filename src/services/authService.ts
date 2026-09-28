import { supabase } from '../lib/supabase';
import { router } from 'expo-router';
export const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw error;
    }
    router.replace('/OnBoard')
};

export const getCurrentUser = async () => {
    const {
        data: { user },
        error
    } = await supabase.auth.getUser()
    if (error) {
        throw new Error(error.message)
    }
    return user
}