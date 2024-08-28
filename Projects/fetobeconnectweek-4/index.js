const express=require('express')
const cors = require("cors");
const app=express()
app.use(cors())
app.use(express.json())

app.get('/sumsadd',function(req,res){
    let a=parseInt(req.query.a)
    let b=parseInt(req.query.b)

    let result=a+b

    res.send(result.toString())
})

app.get("/todo", function (req, res) {
    const work = req.query.work;

    if (work) {
        res.send(work.toString());
    } else {
        res.status(400).send("Work parameter is missing");
    }
});



app.listen(3000)