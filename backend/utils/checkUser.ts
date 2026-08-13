import { supabase } from './supabase.js'

export async function checkUser(email: string) {
    try {
        console.log(email)
        const { data, error } = await supabase
            .from("ComputerVision")
            .select()
            .eq("email", email)

        console.log(data)
        return data
    }
    catch (error) {
        console.log(error)
        throw error
    }
}
