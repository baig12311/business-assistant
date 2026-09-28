import { getProducts } from "../services/product";
import { useQuery } from "@tanstack/react-query";
export const useProducts=(businessId?:string)=>{
    return useQuery({
        queryKey:['products', businessId],
        queryFn:()=>getProducts(businessId!),
        enabled: !!businessId
    })
}