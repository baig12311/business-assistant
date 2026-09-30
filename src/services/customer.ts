import { supabase } from '../lib/supabase';
// get customer
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


// add customer
export const addCustomer = async ({
    businessId,
    name,
    phone,
    email,
    address,
    city,
}: {
    businessId: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
}) => {
    const { data, error } = await supabase
        .from('customers')
        .insert({
            business_id: businessId,
            name,
            phone,
            email: email || null,
            address: address || null,
            city: city || null,
        })
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};