import { supabase } from '../lib/supabase';
import { Order } from '../types/orderTypes';


export const getOrders = async (
    businessId: string
): Promise<Order[]> => {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};