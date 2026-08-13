import jwt from 'jsonwebtoken'
import { config } from '../config.js'

export function generateToken(user: { id: string }) {
    const { id } = user

    const accessToken = jwt.sign({ userId: id }, config.secretAccessKey, { expiresIn: "20m" })
    const refreshToken = jwt.sign({ userId: id }, config.secretRefreshKey, { expiresIn: "7d" })

    return { accessToken, refreshToken }
}
