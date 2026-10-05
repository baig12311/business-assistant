import {OrderItem} from '../types/orderTypes';
import {supabase} from '../lib/supabase';
export const createOrder = async ({
    businessId,
    customerId,
    totalAmount,
    notes,
    items,
}: {
    businessId: string;
    customerId: string | null;
    totalAmount: number;
    notes: string | null;
    items: OrderItem[];
}) => {

    const { data, error } = await supabase.rpc('create_order', {
        p_business_id: businessId,
        p_customer_id: customerId,
        p_total_amount: totalAmount,
        p_notes: notes,
        p_items: items,
    });
    console.log('Order creaitnf', data);
    

    if (error) {
        throw new Error(error.message);
    }

    return data;
};