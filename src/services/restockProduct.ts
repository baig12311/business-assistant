import { supabase } from '../lib/supabase';

export const restockProduct = async ({
    businessId,
    productId,
    quantity,
    reason,
}: {
    businessId: string;
    productId: string;
    quantity: number;
    reason?: string;
}) => {
    const { data, error } = await supabase.rpc('restock_product', {
        p_business_id: businessId,
        p_product_id: productId,
        p_quantity: quantity,
        p_reason: reason ?? null,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};