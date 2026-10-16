import { useQuery } from '@tanstack/react-query';
import { getCustomerPayments } from '../services/customerPayment';

export const useCustomerPayments = (
    businessId?: string,
    customerId?: string,
) => {
    return useQuery({
        queryKey: ['customerPayments', businessId, customerId],

        queryFn: () =>
            getCustomerPayments({
                businessId: businessId!,
                customerId: customerId!,
            }),

        enabled: !!businessId && !!customerId
    });
};