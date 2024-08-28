const express=require('express')
const app=express();

app.use(express.json())

function usernamechecker(req,res,next) {
    const username=req.headers.username
    const password=req.headers.password
    if(username!="pratham" || password!="1234"){
        res.status(411).json({
            msg:"user doesn't exist"
        })
    }  
    next();
}

function kidneychecker(req,res,next){
    const kidneyId=req.query.kidneyId
    if(kidneyId!=1 && kidneyId!=2){
        res.status(411).json({
            msg:"incorrect"
        })
    }
    next()
}

app.get("/health",usernamechecker,kidneychecker,function(req,res){
    res.send("you are healthy")
})
app.listen(3000)