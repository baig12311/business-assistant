import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '../services/orders';
export const useOrderById = (orderId?: string) => {
    return useQuery({
        queryKey: ['order', orderId],
        queryFn: () => getOrderById(orderId!),
        enabled: !!orderId,
    });
};