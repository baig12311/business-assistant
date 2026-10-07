import { useMutation, useQueryClient } from '@tanstack/react-query';

import { restockProduct } from '../services/restockProduct';

export const useRestockProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: restockProduct,

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