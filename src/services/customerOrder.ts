import { supabase } from '../lib/supabase';
export const getCustomerOrders = async (
    businessId: string,
    customerId: string
) => {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('business_id', businessId)
        .eq('customer_id', customerId);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};