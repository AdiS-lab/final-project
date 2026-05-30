import express from 'express'
import {signup, login, getUserInfo} from '../controllers/controllers.js'
import {validateAccessToken, validateRefreshToken} from '../middleware/validateTokens.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/auth/me', validateAccessToken, getUserInfo)
router.post('/auth/refresh', validateRefreshToken)


export default router