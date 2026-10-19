import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserName } from '../services/profile';

export const useUpdateUserName = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateUserName,

        onSuccess: async (updatedUser) => {
            await queryClient.invalidateQueries({
                queryKey: ['user'],
            });

            queryClient.setQueryData(['user'], updatedUser);
        },
    });
};