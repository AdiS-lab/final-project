import 'dotenv/config'
import cookieParser from 'cookie-parser'
import express from 'express'
import router from './routers/router.js'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(express.json({limit: '25mb'}))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true})) // have to specify origin for creating cookies

app.use(cookieParser()) // to read cookies have to be able to parse



app.use(router)
app.listen(3000)

