import express from 'express'
import {BACKEND_URL} from '@repo/common/config'
const app = express()

app.get('/',(req,res)=>{
    res.send('Hello from Express!')
    res.send(BACKEND_URL)
})

app.listen('3002')