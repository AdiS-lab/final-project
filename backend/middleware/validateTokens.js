import jwt from 'jsonwebtoken'


export const validateAccessToken = async(req,res,next)=>{
    console.log('made it to validateAccessToken')
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1]
    console.log(token)
    if(!token) return res.status(401).send('uncreated token')
    try{
        const payload = jwt.verify(token, process.env.SECRET_ACCESS_KEY)
        console.log(payload.userId)
        req.user = payload.userId
        console.log(req.user)
        console.log(payload)
        next()
    }
    catch(error){
        console.log('expired acess')
        return res.status(401).send(error)
    }   
}


export const validateRefreshToken = async(req,res,next)=>{
    try{
        console.log(req.cookies)
        const token = req.cookies.refreshToken // however you would get the refreshToken
        const payload = jwt.verify(token, process.env.SECRET_REFRESH_KEY)
        const userId = payload.userId
        const accessToken = jwt.sign({userId}, process.env.SECRET_ACCESS_KEY, {expiresIn: '15min'})
        console.log("access token created by refresh" + accessToken)
        return res.status(200).send(accessToken)
    }
    catch(error){
        return res.status(500).send('refresh token is expired/missing')
    }

}

