import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../services/orders';

export const useOrders = (businessId?: string) => {
    return useQuery({
        queryKey: ['orders', businessId],
        queryFn: () => getOrders(businessId!),
        enabled: !!businessId,
    });
};