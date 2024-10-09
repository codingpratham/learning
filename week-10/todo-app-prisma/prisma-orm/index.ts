import express, { Request, Response } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import zod from 'zod';
import { PrismaClient } from '@prisma/client';

const SECRET_KEY = 'my_secret_key';

const app = express();

app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();

const UserSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(4).max(8)
});

app.post('/register', async (req: Request, res: Response): Promise <void> => {
  const parsed = UserSchema.safeParse(req.body);

  if (!parsed.success) {
     res.status(411).json({ msg: 'Invalid' });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: req.body.email }
    });

    if (existingUser) {
       res.status(411).json({ msg: 'Email already exists' })
    }

    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        password: req.body.password
      }
    });

    const token = jwt.sign({ id: newUser.id }, SECRET_KEY);
    res.json({ token });

    console.log("Successfully added user");
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const AuthenticatedUserSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(4).max(8)
});

app.post('/login',async(req: Request, res: Response): Promise <void> => {
  const parsed =AuthenticatedUserSchema.safeParse(req.body)

 
  if (!parsed.success) {
    res.status(411).json({ msg: 'Invalid' });
  }

  
  try {
    const existingUser=await prisma.user.findUnique({
      where: { 
        email: req.body.email ,
        password: req.body.password
      }
    })

    if(existingUser){
      const token=jwt.sign({ id: existingUser.id }, SECRET_KEY)
      res.json({msg:"loggen in"})
    

    } else {
      res.status(401).json({ msg: 'Invalid credentials' });
    }

  } catch (error) {
    console.log(error)
    
  }

})

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
