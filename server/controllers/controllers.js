import {createUser, authUser} from '../services/services.js'

//________________ Sign up Controller _______________________

export const signup = async (req,res,next)=>{
    if (!req.body) return res.send('req body has something wrong')

    try{
        const token = req.header.authorization?.split(" ")[1]
        console.log('made it!')
        console.log(token)

        console.log(req.body)
        const response = await createUser(req.body)

        console.log(response)
        return res.status(200).send(response)
    }   
    catch(error){
        return res.status(400).send(error) // make sure to include status this is very important for axios to catch 
    }
}

// _________________ Log In Controller _________________________

export const login = async (req,res,next)=>{
    if (!req.body) return res.send('req body has something wrong')

    try{
        console.log(req.body)
        console.log(req.headers)
        const response = await authUser(req.body)
        //__________response should contain data + tokens ________


        console.log('controller' + response)
        return res.status(200).send(response)
    }   
    catch(error){
        console.log(error)
        return res.status(400).send(error.message)
    } 
}