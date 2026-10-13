
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { receiveCustomerPayment, ReceiveCustomerPaymentParams} from '../services/receivePayment';

export const useReceiveCustomerPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ReceiveCustomerPaymentParams) =>
      receiveCustomerPayment(params),

    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['customers', variables.businessId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['customer', variables.customerId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['orders', variables.businessId],
        }),
        queryClient.invalidateQueries({
      queryKey: [
        'customerOrders',
        variables.businessId,
        variables.customerId,
      ],
    }),
      ]);
    },
  });
};
