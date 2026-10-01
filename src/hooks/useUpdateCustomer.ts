import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCustomer } from '../services/customer';

export const useUpdateCustomer = (businessId?: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCustomer,

        onSuccess: async (_, variables) => {
    await queryClient.invalidateQueries({
        queryKey: ['customers', businessId],
    });

    await queryClient.invalidateQueries({
        queryKey: ['customer', variables.customerId],
    });
},
    });
};