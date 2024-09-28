const express = require('express');
const zod = require('zod');
const {InsertData,getUserData} = require('./index')
const app = express()

app.use(express.json())

const insert=InsertData
const getuser=getUserData

const insertDataSchema = zod.object({
  username:zod.string(),
  email: zod.string().email(),
  password: zod.string()
})

app.post('/insert',async (req, res) => {
    const {success} = insertDataSchema.safeParse(req.body)

   if(!success){
     res.status(411).json({message:"Error inserting"})
   }

   try{
     const confirmation= await insert(insertDataSchema,req.body)

     res.status(201).json({message:"Data inserted successfully",data:confirmation})
   }catch(err){
    console.log(err);
    
   }
})

const emailSchema = zod.object({
  email: zod.string().email()
});

// GET request to fetch user data
app.get('/get', async (req, res) => {
  const validationResult = emailSchema.safeParse(req.query);  // Validate query parameters

  if (!validationResult.success) {
    return res.status(411).json({ message: "Error fetching: Invalid email format" });
  }

  try {
    const result = await getuser(req.query.email);  // Pass the validated email directly to the function
    if (result) {
      return res.status(200).json(result);  // Return fetched data if successful
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start the server
app.listen(3000)