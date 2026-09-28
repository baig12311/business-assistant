import { supabase } from "../lib/supabase";
export const getProducts =async(businessId:string)=>{
    const {data, error} = await supabase
    .from('products')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', {ascending:false})

    if(error)
    {
        throw new Error(error.message)
    }
    return data
}