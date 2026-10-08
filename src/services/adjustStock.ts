import { supabase } from '../lib/supabase';

export const adjustStock = async ({
    businessId,
    productId,
    newStock,
    reason,
}: {
    businessId: string;
    productId: string;
    newStock: number;
    reason: string;
}) => {
    const { data, error } = await supabase.rpc('adjust_stock', {
        p_business_id: businessId,
        p_product_id: productId,
        p_new_stock: newStock,
        p_reason: reason,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};