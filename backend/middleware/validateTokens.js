import jwt from 'jsonwebtoken'
import {supabase} from '../utils/supabase.js'
 


export const validateAccessToken = async(req,res,next)=>{
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1]
    console.log("made it to validate token")
    if(!token) return res.status(401).send('uncreated token')
    try{
        const {data} = await supabase.auth.getUser(token)
        // const payload = jwt.verify(token, process.env.SECRET_ACCESS_KEY)
        //req.user = payload.userId
        if (!data.user) return res.status(401).send('invalid token')
        console.log('token is good heres the data' + data.user.id)
        req.user = data.user.id
        next()
    }
    catch(error){
        console.log('expired acess')
        return res.status(401).send(error)
    }   
}


// export const validateRefreshToken = async(req,res,next)=>{
//     try{
//         console.log(req.cookies)
//         const token = req.cookies.refreshToken // however you would get the refreshToken
//         const payload = jwt.verify(token, process.env.SECRET_REFRESH_KEY)
//         const userId = payload.userId
//         const accessToken = jwt.sign({userId}, process.env.SECRET_ACCESS_KEY, {expiresIn: '15min'})
//         console.log("access token created by refresh" + accessToken)
//         return res.status(200).send(accessToken)
//     }
//     catch(error){
//         return res.status(500).send('refresh token is expired/missing')
//     }

// }

