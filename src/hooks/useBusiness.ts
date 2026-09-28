import { useQuery } from "@tanstack/react-query";
import { getBusiness } from "../services/business";
export const useBusiness=(userId?:string)=>{
    return useQuery({
        queryKey: ['business', userId],
        queryFn:()=>getBusiness(userId!),
        enabled:!!userId
    })
}