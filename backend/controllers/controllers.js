import {createUser, authUser, getUserInformation, insertCanvas, getCanvasData, updateCanvasData, uploadImageData, getImageData} from '../services/services.js'
import {checkUser} from '../utils/checkUser.js'
import bcrypt from 'bcrypt'


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

export const createCanvas = async(req,res)=>{
    
    console.log('made it to contoller')
    const {nameOf} = req.body
    const userId = req.user
    if(!userId) return res.status(400).send('something is wrong with access token')
    if(!nameOf) return res.status(400).send('please enter a name')
    try{
        const response = await insertCanvas(nameOf, userId)
        res.status(200).send(response)
    }
    catch(error){
        return res.status(500).send('could not be created')
    }
}

export const getCanvas = async(req,res) =>{
    try{
        const userId = req.user
        console.log('getCanvas controller: ' + userId)
        const response = await getCanvasData(userId)
        console.log(response)
        return res.status(200).json({msg: 'Successfully Retrieved Data', response})
    }
    catch(error){
        return res.status(404).json({msg: 'no canvas information found'})
    }
}

export const updateCanvas = async(req,res) =>{
    const {publicUrl} = req.body
    const {id} = req.params
    if(!publicUrl) return res.status(400).json({msg: 'no imgUrl included'})
    if(!id) return res.status(400).json({msg: 'youre url has a problem'})

    try{
        console.log(publicUrl)
        await updateCanvasData(publicUrl, id)
        return res.status(200).json({msg: 'successfully updated'})
    }
    catch(error){
        throw error
    }
}

export const uploadBlob = async(req,res) =>{
    const file = req.file.buffer
    const {id} = req.params
    console.log('made it to uploadBlob')
    if(!file) return res.status(400).json({msg: 'no blob found'})
    try{  

        uploadImageData(file, id)
        const {publicUrl} = getImageData(id)
        console.log(publicUrl)
        return res.status(200).send(`${publicUrl}?t=${Date.now()}`)
    }
    catch(error){
        return res.status(500).json({msg: 'failed to upload'})
    }
}



