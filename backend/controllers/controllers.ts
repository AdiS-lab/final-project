import { Request, Response, NextFunction } from 'express'
import { createUser, authUser, getUserInformation, insertCanvas, getCanvasData, updateCanvasData, uploadImageData, getImageData, deleteCanvasSession, signOutUser } from '../services/services.js'
import { checkUser } from '../utils/checkUser.js'

//________________ Sign up Controller _______________________

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) return res.status(400).send('req body has something wrong')

    try {
        const { email, password } = req.body
        const userExists = await checkUser(email)
        if (userExists && userExists.length > 0) return res.status(400).send('account already made with provided email')

        console.log({ email, password })
        const response = await createUser({ email, password })

        const { user, accessToken, refreshToken } = response
        return res.status(200).send({ user, accessToken, refreshToken })
    }
    catch (error) {
        return res.status(400).send(error)
    }
}

// _________________ Log In Controller _________________________

export const login = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) return res.send('req body has something wrong')

    try {
        const { email } = req.body
        const userExists = await checkUser(email)
        if (!userExists || userExists.length < 1) return res.status(400).send('email could not be found')

        const response = await authUser(req.body)

        const { user, accessToken, refreshToken } = response
        return res.status(200).send({ user, accessToken, refreshToken })
    }
    catch (error: any) {
        console.log(error)
        return res.status(400).send(error.message)
    }
}

//_____________ get a user  __________________

export const getUserInfo = async (req: Request, res: Response) => {
    try {
        const data = await getUserInformation((req as any).user)
        return res.status(200).send(data)
    }
    catch (error: any) {
        return res.status(400).send(error.message)
    }
}

export const createCanvas = async (req: Request, res: Response) => {
    const { nameOf } = req.body
    const userId = (req as any).user
    console.log('in controller id is ' + userId)
    if (!userId) return res.status(400).send('something is wrong with access token')
    if (!nameOf) return res.status(400).send('please enter a name')
    try {
        const response = await insertCanvas(nameOf, userId)
        console.log('after service finishes response is  ' + response)
        res.status(200).send(response)
    }
    catch (error) {
        return res.status(500).send('could not be created')
    }
}

export const getCanvas = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user

        const response = await getCanvasData(userId)

        return res.status(200).json({ msg: 'Successfully Retrieved Data', response })
    }
    catch (error) {
        return res.status(404).json({ msg: 'no canvas information found' })
    }
}

export const updateCanvas = async (req: Request, res: Response) => {
    const { publicUrl } = req.body
    const { id } = req.params
    if (!publicUrl) return res.status(400).json({ msg: 'no imgUrl included' })
    if (!id) return res.status(400).json({ msg: 'youre url has a problem' })

    try {
        console.log(publicUrl)
        await updateCanvasData(publicUrl, id)
        return res.status(200).json({ msg: 'successfully updated' })
    }
    catch (error) {
        throw error
    }
}

export const uploadBlob = async (req: Request, res: Response) => {
    const file = (req as any).file?.buffer
    const { id } = req.params
    const userId = (req as any).user
    console.log('made it to uploadBlob')
    if (!file) return res.status(400).json({ msg: 'no blob found' })
    try {
        uploadImageData(file, id, userId)
        const { publicUrl } = getImageData(id, userId)
        console.log(publicUrl)
        return res.status(200).send(`${publicUrl}?t=${Date.now()}`)
    }
    catch (error) {
        return res.status(500).json({ msg: 'failed to upload' })
    }
}

export const deleteCanvas = async (req: Request, res: Response) => {
    const { id } = req.params
    console.log((req as any).user)
    const userId = (req as any).user
    console.log('MADE IT TO DELETE CONTROLLER ' + userId)
    if (!id || !userId) return res.status(400).send('include id next time')
    try {
        await deleteCanvasSession(id, userId)
        return res.status(200).send('successfully deleted')
    }
    catch (error) {
        console.log(error)
        return res.status(404).send('canvas to delete not found')
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const userId = (req as any).user
    console.log('delte user ' + userId)
    console.log('made iT HERE _)_________________________')
    if (!userId) return res.status(400).send('id is wrong')
    try {
        await signOutUser(userId)
    } catch (error) {
        return res.status(404).send('could not be deleted')
    }
}
