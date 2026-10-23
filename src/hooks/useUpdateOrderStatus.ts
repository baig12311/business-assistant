
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOrderStatus } from '../services/updateOrderStatus';

type OrderStatus = 'Pending' | 'Confirmed' | 'Shipped' | 'Cancelled';

interface Params {
    orderId: string;
    businessId: string;
}

export const useUpdateOrderStatus = ({
    orderId,
    businessId,
}: Params) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (status: OrderStatus) =>
            updateOrderStatus({
                orderId,
                businessId,
                status,
            }),

        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ['orders', businessId],
                }),
                queryClient.invalidateQueries({
                    queryKey: ['order', orderId],
                }),
                queryClient.invalidateQueries({
            queryKey: ['products', businessId],
        }),
                queryClient.invalidateQueries({
                    queryKey: ['customerOrders', businessId],
                }),
                queryClient.invalidateQueries({
            queryKey: ['customers', businessId],
        }),
            ]);
        },
    });
};
