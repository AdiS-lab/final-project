export function generateToken(user){
    const {email} = user

    const accessToken = jwt.sign(email, ACCESS_TOKEN, {expire:"10min"})
    const refreshToken = jwt.sign(email, REFRESH_TOKEN, {expire: "3months"})

    return {acessToken, refreshToken}
}
