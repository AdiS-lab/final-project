import express from 'express'
import {signup, login, getUserInfo, createCanvas, getCanvas, updateCanvas, uploadBlob,deleteCanvas, deleteUser } from '../controllers/controllers.js'
import {validateAccessToken} from '../middleware/validateTokens.js'
import multer from 'multer'

const upload = multer({ storage: multer.memoryStorage() })

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/auth/me', validateAccessToken, getUserInfo)
// router.post('/auth/refresh', validateRefreshToken)
router.post('/createCanvas', validateAccessToken, createCanvas)
router.get('/canvasData', validateAccessToken, getCanvas)
router.put('/canvas/:id', updateCanvas)
router.post('/uploadBlob/:id', upload.single('image'), validateAccessToken, uploadBlob)
router.delete('/deleteCanvas/:id', validateAccessToken, deleteCanvas)
router.delete('/deleteUser', validateAccessToken ,deleteUser)


export default router

