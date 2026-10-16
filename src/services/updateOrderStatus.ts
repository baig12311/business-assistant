
import { supabase } from '../lib/supabase';

type OrderStatus = 'Pending' | 'Confirmed' | 'Shipped';

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
    const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)
        .eq('business_id', businessId)
        .select('id');

    if (error) throw error;

    if (!data?.length) {
        throw new Error('Unable to update order status.');
    }
};
