const express = require('express')

const jwt = require('jsonwebtoken')

const jwtpass = '123456'

const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://bro123:pratham@pratham.j9fifsz.mongodb.net/")

const app = express()

app.use(express.json())

const userschema=new mongoose.Schema({
    email:{
        type:String,Number
    },
    password:{
        type:String
    }
})

const Usersdata=mongoose.model('User', userschema)

app.post('/registration',async function(req,res){
    const email=req.body.email
    const password=req.body.password

    const userExists= await Usersdata.findOne({email:email})
    if(userExists){
        res.status(411).json({
            msg:"Username already exist"
        })
    }

    
    const user = new Usersdata(
        { 
        email: email,
        password: password }
    );
    user.save()

    const token=jwt.sign({email},jwtpass)
    return res.json({
        token,
        msg:"successfully created"
    })
})

app.get('/info',function(req,res){

    const TToken=req.headers.authorization

    if(!TToken){
        res.status(403).json({
            msg:"enter the input"
        })
    }

    try{

        const decoded=jwt.verify(TToken,jwtpass)

        const email=decoded.email

        res.status(200).json({
            email: email
        });

    }

    catch(err){
        return res.status(403).json({
            msg:'invalid'
        })
    }
})

app.use(function(err,req,res,next){
    res.status(403).json({
        msg:"not found"
    })
})


app.listen(3001,()=>{
    console.log('3000');
})