import { useMutation, useQueryClient } from '@tanstack/react-query';
import {createOrder} from '../services/createOrder';
export const useCreateOrder = (businessId?: string) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createOrder,

        onSuccess: async () => {

            await queryClient.invalidateQueries({
                queryKey: ['orders', businessId],
            });

            await queryClient.invalidateQueries({
                queryKey: ['products', businessId],
            });

            await queryClient.invalidateQueries({
                queryKey: ['customerOrders'],
            });
        },
    });
};