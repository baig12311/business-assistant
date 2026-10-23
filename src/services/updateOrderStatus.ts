
// import { supabase } from '../lib/supabase';

// type OrderStatus = 'Pending' | 'Confirmed' | 'Shipped' | 'Cancelled';

// interface UpdateOrderStatusParams {
//     orderId: string;
//     businessId: string;
//     status: OrderStatus;
// }

// export const updateOrderStatus = async ({
//     orderId,
//     businessId,
//     status,
// }: UpdateOrderStatusParams): Promise<void> => {
//     const { data, error } = await supabase
//         .from('orders')
//         .update({ status })
//         .eq('id', orderId)
//         .eq('business_id', businessId)
//         .select('id');

//     if (error) throw error;

//     if (!data?.length) {
//         throw new Error('Unable to update order status.');
//     }
// };





import { supabase } from '../lib/supabase';

type OrderStatus = 'Pending' | 'Confirmed' | 'Shipped' | 'Cancelled';

interface UpdateOrderStatusParams {
    orderId: string;
    businessId: string;
    status: OrderStatus;
}

export const updateOrderStatus = async ({
    orderId,
    businessId,
    status,
}: UpdateOrderStatusParams): Promise<void> => {
    // Cancellation must use the atomic database function.
    if (status === 'Cancelled') {
        const { error } = await supabase.rpc('cancel_order', {
            p_order_id: orderId,
            p_business_id: businessId,
        });

        if (error) {
            throw error;
        }

        return;
    }

    // Keep the existing status-update behavior for other statuses.
    const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)
        .eq('business_id', businessId)
        .select('id');

    if (error) {
        throw error;
    }

    if (!data?.length) {
        throw new Error('Unable to update order status.');
    }
};

