import express  from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());
const client = createClient()

client.on('error',(err)=>{
    console.log('Redis Client Error', err);
})

app.post('/submit',async(req,res)=>{
    const {code,language,problemId} = req.body;

    try {
        await client.lPush("problems",JSON.stringify({
            code,
            language,
            problemId
        }))
        res.status(200).json({
            message: "Code submitted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error submitting code",})
    }
})

async function startServer(){
    try {
        await client.connect();
        console.log("Connected to Redis");

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    } catch (error) {
        console.log("Error starting server", error);
        
    }
}

startServer()