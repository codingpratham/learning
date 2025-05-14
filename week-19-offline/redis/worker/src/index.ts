import { createClient } from "redis";

const client = createClient()
client.on('error',(err:any)=>{
    console.log('Redis Client Error', err);
})

async function processSubmission(job:any){
    const {code,language,problemId,userId} = JSON.parse(job);
    console.log("Processing submission", {
        userId,
        code,
        language,
        problemId
    })
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Submission processed",problemId);
    client.publish("problem_done",JSON.stringify({
        problemId,
        status:"TLE"
    }))
}

async function startWorker(){
    try {
        await client.connect()
        console.log("Connected to Redis");
        while(true){
            try {
                const job = await await client.brPop("problems",0);
                
                await processSubmission(job.element);
            } catch (error) {
                console.log("Error processing job", error);
                
            }
        }
    } catch (error) {
        console.log("Error starting worker", error);
        
    }
}

startWorker()

