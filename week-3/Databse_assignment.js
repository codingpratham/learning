const express=require('express')
const mongoose=require("mongoose");
const { string } = require("zod");
const jwt=require('jsonwebtoken')
const jwtPassword='123456'
const app=express()

mongoose.connect("")

app.use(express.json())

const User = mongoose.model('Users', { name: String , email: String, password: String});


app.post('/signin',async function(req,res){
    const name=req.body.name
    const email=req.body.email
    const password=req.body.password

    const userExists= await User.findOne({email:email})
    if(userExists){
        res.status(411).json({
            msg:"Username already exist"
        })
    }

    const user = new User(
        { name: name, 
        email: email,
        password: password }
    );
    user.save()

    const token=jwt.sign({email},jwtPassword)
    return res.json({
        token,
        msg:"User created successfully"
    })
})

app.get('/users' ,function(req,res){
    const TToken=req.headers.authorization

    if(!TToken){
        res.status(403).json({
            msg:"sorry"
        })
    }
    try{
        const decoded=jwt.verify(TToken,jwtPassword)
        const email=decoded.email
    }
    catch(err){
        return res.status(403).json({
            msg:"invalid"
        })
    }
})

app.listen(3000)