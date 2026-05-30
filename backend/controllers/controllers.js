import {createUser, authUser, getUserInformation} from '../services/services.js'
import {checkUser} from '../utils/checkUser.js'


//________________ Sign up Controller _______________________

export const signup = async (req,res,next)=>{
    if (!req.body) return res.status(400).send('req body has something wrong')

    try{
        const {email, password} = req.body
        const userExists = await checkUser(email)
        if (userExists.length>0) return res.status(400).send('account already made with provided email')
    
        const encryptPassword = await bcrypt.hash(password,15)

        const response = await createUser({email, encryptPassword})
        const {user, accessToken, refreshToken} = response
        res.cookie('refreshToken', refreshToken, {httpOnly:true, sameSite:'lax'})
        return res.status(200).send({user, accessToken})
    }
    catch(error){
        return res.status(400).send(error) // make sure to include status this is very important for axios to catch
    }
}

// _________________ Log In Controller _________________________

export const login = async (req,res,next)=>{
    if (!req.body) return res.send('req body has something wrong')

    try{

        const userExists = await checkUser(email)
        if (userExists.length<1) return res.status(400).send('email could not be found')
    
        const response = await authUser(req.body)
        //__________response should contain data + tokens ________
        
        const {user, accessToken, refreshToken} = response
        res.cookie('refreshToken',refreshToken, {httpOnly:true})
        return res.status(200).send({user, accessToken})
    }   
    catch(error){
        console.log(error)
        return res.status(400).send(error.message)
    } 
}

//_____________ get a user  __________________

export const getUserInfo = async(req,res)=>{
    try{
        const data = await getUserInformation(req.user)  // how do you send the id down the stream
        return res.status(200).send(data)
    }
    catch(error){
        return res.status(400).send(error.message)
    }
}



