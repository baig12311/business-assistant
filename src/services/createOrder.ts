// import {OrderItem} from '../types/orderTypes';
// import {supabase} from '../lib/supabase';
// export const createOrder = async ({
//     businessId,
//     customerId,
//     totalAmount,
//     paidAmount,
//     items,
// }: {
//     businessId: string;
//     customerId: string | null;
//     totalAmount: number;
//     paidAmount: number;
//     items: OrderItem[];
// }) => {

//     const { data, error } = await supabase.rpc('create_order', {
//         p_business_id: businessId,
//         p_customer_id: customerId,
//         p_total_amount: totalAmount,
//         p_paid_amount: paidAmount,
//         p_items: items,
//     });
    

//     if (error) {
//         throw new Error(error.message);
//     }

//     return data;
// };



import { OrderItem } from '../types/orderTypes';
import { supabase } from '../lib/supabase';

export type OrderSource = 'online' | 'physical';

interface CreateOrderParams {
    businessId: string;
    customerId: string | null;
    totalAmount: number;
    paidAmount: number;
    items: OrderItem[];
    orderSource: OrderSource;
}

export const createOrder = async ({
    businessId,
    customerId,
    totalAmount,
    paidAmount,
    items,
    orderSource,
}: CreateOrderParams): Promise<string> => {
    const { data, error } = await supabase.rpc('create_order', {
        p_business_id: businessId,
        p_customer_id: customerId,
        p_total_amount: totalAmount,
        p_paid_amount: paidAmount,
        p_items: items,
        p_order_source: orderSource,
    });

    if (error) {
        throw new Error(error.message);
    }

    if (!data) {
        throw new Error('Order could not be created.');
    }

    return data;
};