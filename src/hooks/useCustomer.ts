import { useQuery } from '@tanstack/react-query';
import { getCustomers } from '../services/customer';

export const useCustomers = (businessId?: string) => {
    return useQuery({
        queryKey: ['customers', businessId],
        queryFn: () => getCustomers(businessId!),
        enabled: !!businessId,
    });
};