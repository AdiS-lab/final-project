import express from 'express'
import {signup, login, getUserInfo, createCanvas, getCanvas, updateCanvas, uploadBlob} from '../controllers/controllers.js'
import {validateAccessToken, validateRefreshToken} from '../middleware/validateTokens.js'
import multer from 'multer'

const upload = multer({ storage: multer.memoryStorage() })

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/auth/me', validateAccessToken, getUserInfo)
router.post('/auth/refresh', validateRefreshToken)
router.post('/createCanvas', createCanvas)
router.get('/canvasData', getCanvas)
router.put('/canvas/:id', updateCanvas)
router.post('/uploadBlob/:id', upload.single('image'), uploadBlob)


export default router

