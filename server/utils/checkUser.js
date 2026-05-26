
import {supabase} from '../utils/supabase.js'

export async function checkUser(email){
    console.log(email)
    const {data, error} = await supabase
        .from('ComputerVision')
        .select()
        .eq('email',email)
    return data
}