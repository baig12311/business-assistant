import { useQuery } from '@tanstack/react-query';
import { getInventoryMovements } from '../services/getInventoryMovements';

export const useInventoryMovements = (productId?: string) => {
    return useQuery({
        queryKey: ['inventory-movements', productId],
        queryFn: () => getInventoryMovements(productId!),
        enabled: !!productId,
    });
};