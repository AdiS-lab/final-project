import { Request, Response, NextFunction } from 'express'
import { supabase } from '../utils/supabase.js'

export const validateAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers.authorization)
    const token = req.headers.authorization?.split(" ")[1]
    console.log("made it to validate token")
    if (!token) return res.status(401).send('uncreated token')
    try {
        const { data } = await supabase.auth.getUser(token)
        if (!data.user) return res.status(401).send('invalid token')
        console.log('token is good heres the data' + data.user.id);
        (req as any).user = data.user.id
        next()
    }
    catch (error) {
        console.log('expired acess')
        return res.status(401).send(error)
    }
}
