import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProduct } from '../services/product';

export const useAddProduct = (businessId?: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addProduct,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['products', businessId],
            });
        },
    });
};