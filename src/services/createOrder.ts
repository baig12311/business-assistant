import {OrderItem} from '../types/orderTypes';
import {supabase} from '../lib/supabase';
export const createOrder = async ({
    businessId,
    customerId,
    totalAmount,
    paidAmount,
    items,
}: {
    businessId: string;
    customerId: string | null;
    totalAmount: number;
    paidAmount: number;
    items: OrderItem[];
}) => {

    const { data, error } = await supabase.rpc('create_order', {
        p_business_id: businessId,
        p_customer_id: customerId,
        p_total_amount: totalAmount,
        p_paid_amount: paidAmount,
        p_items: items,
    });
    

    if (error) {
        throw new Error(error.message);
    }

    return data;
};