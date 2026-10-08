import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adjustStock } from '../services/adjustStock';

export const useAdjustStock = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: adjustStock,

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['product', variables.productId],
            });

            queryClient.invalidateQueries({
                queryKey: ['products', variables.businessId],
            });

            queryClient.invalidateQueries({
                queryKey: ['inventory-movements', variables.productId],
            });
        },
    });
};