import { supabase } from '../lib/supabase';

interface GetCustomerPaymentsParams {
    businessId: string;
    customerId: string;
}

export const getCustomerPayments = async ({
    businessId,
    customerId,
}: GetCustomerPaymentsParams) => {
    const { data, error } = await supabase
        .from('customer_payments')
        .select(`
            id,
            amount,
            note,
            created_at,
            customer_payment_allocations (
                amount,
                order_id,
                orders (
                    order_number,
                    total_amount
                )
            )
        `)
        .eq('business_id', businessId)
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    
    

    return data;
};