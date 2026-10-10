import { useQuery} from '@tanstack/react-query';
import { getCustomers, getCustomerById} from '../services/customer';

export const useCustomers = (businessId?: string) => {
    return useQuery({
        queryKey: ['customers', businessId],
        queryFn: () => getCustomers(businessId!),
        enabled: !!businessId,
    });
};



export const useCustomerById = (customerId?: string) => {
    return useQuery({
        queryKey: ['customer', customerId],
        queryFn: () => getCustomerById(customerId!),
        enabled: !!customerId,
    });
};