import express from 'express'

const app = express()

app.get('/',(req,res)=>{
    res.send('Hello from Express!')
})

app.listen('3002')