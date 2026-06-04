import {supabase} from '../utils/supabase.js'
import {checkUser} from '../utils/checkUser.js'
import {generateToken} from '../utils/generateToken.js'
import bcrypt from 'bcrypt';

// move all business logic to the controller


//_____________ signup Service ___________________________ have to check email as well
export const createUser = async (userData) =>{
    try{
        const {email, encryptPassword} = userData

        const {data,error} = await supabase
            .from('ComputerVision')
            .insert({email: email, password: encryptPassword})
            .select()
        
        console.log(data)
        const {accessToken, refreshToken} = generateToken(data[0])
        return {user: data, accessToken, refreshToken}
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

        const savedPassword = user[0].password
        const correctPassword = await bcrypt.compare(password,savedPassword)
        console.log(correctPassword)

        if(!correctPassword){
            throw new Error(' password is incorrect ')
        }
        // generate token on backend because we are using id
        const {accessToken, refreshToken} = generateToken(data[0])
        return {user: data, accessToken, refreshToken}
    }
    catch(error){
        console.log(error)
        throw error
    }
}


//_______________get user info upon token____________

export const getUserInformation = async(id)=>{
    try{
        console.log(id)
        const {data, error} = await supabase
            .from("ComputerVision")
            .select()
            .eq('id', id)

        if(data.length<1){
            throw new Error('user is not here')
        }
        return data
    }
    catch(error){ 
        throw error
    }
}

//____________ create user _________

export const insertCanvas = async(name) =>{
  
    try{ 
        const {data,error} = await supabase
            .from("Canvas")
            .insert({name: name})
            .select()
    
        return data
    }   
    catch(error){
        console.log(error)
        throw error
    }
}

export const getCanvasData = async() =>{
    try{
        const {data,error} = await supabase
            .from("Canvas")
            .select()
        
        return data
    }
    catch(error){
        throw error
    }
}

export const updateCanvasData = async(publicUrl, id) =>{
    try{
        const {data,error} = await supabase
            .from("Canvas")
            .update({img_url: publicUrl})
            .eq('id', id)
    }
    catch(error){
        throw error
    }
}
export const uploadImageData = async(file, id) =>{
    try{
        const {error} = await supabase.storage
            .from('previewStorage')
            .upload(`${id}.png`, file, {upsert:true, contentType: 'image/png'}) 
        console.log('made it to the end')
        
    }
    catch(error){
        console.log(error)
        throw error
    }
}

export const getImageData = (id) =>{
    const {data} = supabase.storage
        .from('previewStorage')
        .getPublicUrl(`${id}.png`)
    console.log(data)
    return data
}

