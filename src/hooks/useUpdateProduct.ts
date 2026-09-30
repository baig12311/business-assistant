import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '../services/product';

export const useUpdateProduct = (businessId?: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProduct,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['products', businessId],
            });
        },
    });
};