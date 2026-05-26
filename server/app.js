import 'dotenv/config'
import express from 'express'
import router from './routers/router.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

app.use(router)


app.listen(3000)

