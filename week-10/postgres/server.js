const express =require ('express');
const zod = require ('zod');
const { InsertData, getUserData } = require ('../index'); // Import the database functions

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

// Define schema for validating POST data
const insertDataSchema = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(6, "Password must be at least 6 characters long"),
});

// POST route to insert user data
app.post('/insert', async (req, res) => {
  // Validate the incoming request body against the schema
  const validationResult = insertDataSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(411).json({ message: "Error inserting: Invalid data format" });
  }

  const { username, email, password } = req.body;

  try {
    await InsertData(username, email, password); // Pass validated data to InsertData function
    return res.status(201).json({
      message: "Data inserted successfully",
    });
  } catch (err) {
    console.error("Insert error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Schema for validating email in the GET request
const emailSchema = zod.object({
  email: zod.string().email(),
});

// GET route to fetch user data by email
app.get('/get', async (req, res) => {
  // Validate the incoming query parameter
  const validationResult = emailSchema.safeParse(req.query);

  if (!validationResult.success) {
    return res.status(411).json({ message: "Error fetching: Invalid email format" });
  }

  try {
    const result = await getUserData(req.query.emailSchema); // Fetch user data
    if (result) {
      return res.status(200).json(result); // Return fetched data if successful
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
