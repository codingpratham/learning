const express=require('express')
const app=express()

//middleware
app.use(express.json())

app.post('/health',function(req,res){
    console.log(req.body)
    const kidney=req.body.kidney;
    const kidneylength=kidney.length

    res.send("kidney length is \n"+ kidneylength)
})

//global catches
app.use(function(err,req,res,next){
    res.json({
        msg:"sorry"
    })
})
app.listen(3000)