import {createUser, authUser, getUserInformation, insertCanvas, getCanvasData, updateCanvasData, uploadImageData, getImageData, deleteCanvasSession, signOutUser} from '../services/services.js'
import {checkUser} from '../utils/checkUser.js'
import bcrypt from 'bcrypt'


//________________ Sign up Controller _______________________

export const signup = async (req,res,next)=>{
    if (!req.body) return res.status(400).send('req body has something wrong')

    try{
        const {email, password} = req.body
        const userExists = await checkUser(email)
        if (userExists.length>0) return res.status(400).send('account already made with provided email')
            

        console.log({email, password})
        // const encryptPassword = await bcrypt.hash(password,15)
        const response = await createUser({email, password})


        const {user, accessToken, refreshToken} = response
        // res.cookie('refreshToken', refreshToken, {httpOnly:true, sameSite:'lax'})
        return res.status(200).send({user, accessToken, refreshToken})
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
        if (!userExists.length<1) return res.status(400).send('email could not be found')
    
        const response = await authUser(req.body)
        //__________response should contain data + tokens ________
        
        const {user, accessToken, refreshToken} = response
        // res.cookie('refreshToken',refreshToken, {httpOnly:true})
        return res.status(200).send({user, accessToken, refreshToken})
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
    
    const {nameOf} = req.body
    const userId = req.user
    console.log('in controller id is ' + userId)
    if(!userId) return res.status(400).send('something is wrong with access token')
    if(!nameOf) return res.status(400).send('please enter a name')
    try{
        const response = await insertCanvas(nameOf, userId)
        console.log ('after service finishes response is  ' + response)
        res.status(200).send(response)
    }
    catch(error){
        return res.status(500).send('could not be created')
    }
}

export const getCanvas = async(req,res) =>{
    try{
        const userId = req.user

        const response = await getCanvasData(userId)
      
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
    const userId = req.user
    console.log('made it to uploadBlob')
    if(!file) return res.status(400).json({msg: 'no blob found'})
    try{  

        uploadImageData(file, id, userId)
        const {publicUrl} = getImageData(id, userId)
        console.log(publicUrl)
        return res.status(200).send(`${publicUrl}?t=${Date.now()}`)
    }
    catch(error){
        return res.status(500).json({msg: 'failed to upload'})
    }
}

export const deleteCanvas = async(req,res)=>{
    const {id} = req.params
    console.log(req.user)
    const userId = req.user
    console.log('MADE IT TO DELETE CONTROLLER ' + userId)
    if(!id || !userId) return res.status(400).send('include id next time')
    try{
        await deleteCanvasSession(id, userId)
        return res.status(200).send('successfully deleted')
    }
    catch(error){
        console.log(error) 
        return res.status(404).send('canvas to delete not found')
    }
}

export const deleteUser = async(req,res)=>{
    const userId  =  req.user
    console.log('delte user ' + userId)
    console.log('made iT HERE _)_________________________')
    if(!userId) return res.status(400).send('id is wrong')
    try{    
        await signOutUser(userId)     
    }catch(error){
        return res.status(404).send('could not be deleted')
    }
}


