import { supabase } from '../lib/supabase';

export const getInventoryMovements = async (productId: string) => {
    const { data, error } = await supabase
        .from('inventory_movements')
        .select(`
            *,
            orders:reference_id (
                order_number
            )
        `)
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};