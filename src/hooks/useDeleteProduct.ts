import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from '../services/product';

export const useDeleteProduct = (businessId?: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productId: string) =>
            deleteProduct(productId),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['products', businessId],
            });
        },
    });
};