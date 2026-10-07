import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '../services/product';

export const useUpdateProduct = (businessId?: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProduct,

        onSuccess: async (data) => {
            await queryClient.invalidateQueries({
                queryKey: ['products', businessId],
            });

            await queryClient.invalidateQueries({
                queryKey: ['product', data.id],
            });
        },
    });
};