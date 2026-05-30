import jwt from 'jsonwebtoken'

export function generateToken(user){
    console.log(user)
    const {id} = user

    const accessToken = jwt.sign({userId: id}, process.env.SECRET_ACCESS_KEY, {expiresIn:"20m"})
    const refreshToken = jwt.sign({userId: id}, process.env.SECRET_REFRESH_KEY, {expiresIn: "7d"})

    return {accessToken, refreshToken}
}
