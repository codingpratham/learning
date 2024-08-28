const express=require('express')
const zod=require('zod')
const app=express()
const schema=zod.object({
    email:zod.string(),
    password:zod.string()
})
app.use(express.json())

app.post('/health-checkup',function(req,res){
    const kidney=req.body.kidney
    const response=schema.safeParse(kidney)

    if (!response.success) {
        res.status(411).json({
            msg:"dfdev"
        })
    }
    res.send({
        response
    })
})
app.listen(3000)