import { useQuery } from '@tanstack/react-query';
import { getCustomerOrders} from '../services/customerOrder';

export const useCustomerOrders = (businessId?: string, customerId?: string) => {
    return useQuery({
        queryKey: ['customerOrders', businessId, customerId],
        queryFn: () => getCustomerOrders(businessId!, customerId!),
        enabled: !!businessId && !!customerId,
    });
};