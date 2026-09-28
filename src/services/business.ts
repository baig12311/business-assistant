import { supabase } from "../lib/supabase";
export const getBusiness = async (userId:string)=>{
    const {data, error} = await supabase
    .from('businesses')
    .select('*')
    .eq('owner_id', userId)
    .maybeSingle();

    if (error)
    {
        throw new Error(error.message)
    }
    return data
}