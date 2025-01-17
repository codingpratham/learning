const express=require('express')
const app=express()
//importation of zod
const zod=require('zod')
//middleware
app.use(express.json())

//zod 
const schema=zod.array(zod.number())

//making schema using ZOD
const schema1=zod.object({
    email:zod.string(),
    password:zod.string(),
    country:zod.literal("IN").or(zod.literal("US")),
    kidney: zod.array(zod.number()) 
})


app.post('/health',function(req,res){
    const kidney=req.body.kidney;


    const response=schema.safeParse(kidney)

    if(!response.success){
        res.status(411).json({
            msg:"invalid input"
        })
    }else{
        res.send({response})
    }
})

//global catches
app.use(function(err,req,res,next){
    res.json({
        msg:"sorry"
    })
})


app.listen(3000)