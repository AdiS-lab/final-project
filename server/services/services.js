import {supabase} from '../utils/supabase.js'
import {checkUser} from '../utils/checkUser.js'
import bcrypt from 'bcrypt';


//_____________ signup Service ___________________________ have to check email as well
export const createUser = async (userData) =>{
    try{
        const {email, password} = userData
        const userExists = await checkUser(email)
        if(userExists.length>0){
            throw new Error('account already made with provided email')
        }

        const encryptPassword = await bcrypt.hash(password,15)

        const {data,error} = await supabase
            .from('ComputerVision')
            .insert({email: email, password: encryptPassword})
            .select()
        
        // const tokens = generateToken(data)

        return data
    }
    catch(error){
        console.log(error)
        throw error // have to throw instead of return
    }

}


//______________login Service_________________

export const authUser = async (userData) =>{
    try{
        console.log(userData)
        const {email, password} = userData
        const user = await checkUser(email)
        console.log(user)

        if (user.length<1){
            throw new Error('email could not be found')
        }
        const savedPassword = user[0].password
        const correctPassword = await bcrypt.compare(password,savedPassword)
        console.log(correctPassword)

        if(!correctPassword){
            throw new Error(' password is incorrect ')
        }

        // const tokens = generateToken(data)


    return data

    }
    catch(error){
        console.log(error)
        throw error
    }
}


