import { supabase } from '../lib/supabase';

export const getCustomers = async (businessId: string) => {
    const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};