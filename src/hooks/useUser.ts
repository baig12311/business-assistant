import { getCurrentUser } from "../services/authService";
import { useQuery } from "@tanstack/react-query";
export const useUser=()=>{
    return useQuery({
        queryKey:['user'],
        queryFn: getCurrentUser
    })
}