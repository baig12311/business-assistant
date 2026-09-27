import { supabase } from '../lib/supabase';
import { router } from 'expo-router';
export const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw error;
    }
    router.replace('/OnBoard')
};