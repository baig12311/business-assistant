
import { supabase } from '../lib/supabase';

export interface ReceiveCustomerPaymentParams {
    businessId: string;
    customerId: string;
    amount: number;
    note?: string;
}

export interface ReceiveCustomerPaymentResult {
    payment_id: string;
    received_amount: number;
    remaining_due: number;
}

export const receiveCustomerPayment = async ({
    businessId,
    customerId,
    amount,
    note,
}: ReceiveCustomerPaymentParams): Promise<ReceiveCustomerPaymentResult> => {
    const { data, error } = await supabase.rpc(
        'receive_customer_payment',
        {
            p_business_id: businessId,
            p_customer_id: customerId,
            p_amount: amount,
            p_note: note ?? null,
        }
    );

    if (error) {
        throw error;
    }

    return data as ReceiveCustomerPaymentResult;
};
