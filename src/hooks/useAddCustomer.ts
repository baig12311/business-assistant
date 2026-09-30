import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCustomer } from '../services/customer';

export const useAddCustomer = (businessId?: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addCustomer,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['customers', businessId],
            });
        },
    });
};