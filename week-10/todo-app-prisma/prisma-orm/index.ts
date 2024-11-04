import express, { Request, Response } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import zod from 'zod';
import { PrismaClient } from '@prisma/client';

const SECRET_KEY = 'my_secret_key';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
}));

app.use(express.json());

const prisma = new PrismaClient();

const UserSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(4).max(8),
});

// Register route
app.post('/register', async (req: Request, res: Response): Promise<void> => {
  const parsed = UserSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ msg: 'Invalid data' });
    return; // Exit the function if validation fails
  }

  const { email, password } = parsed.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(409).json({ msg: 'Email already exists' });
      return; // Exit if user already exists
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        password, // Note: Consider using some form of hashing in a real app
      },
    });

    const token = jwt.sign({ id: newUser.id }, SECRET_KEY);
    res.status(201).json({ token, newUser });

    console.log("Successfully added user");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const AuthenticatedUserSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(4).max(8),
});

// Login route
app.post('/login', async (req: Request, res: Response): Promise<void> => {
  const parsed = AuthenticatedUserSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ msg: 'Invalid data' });
    return; // Exit the function if validation fails
  }

  const { email, password } = parsed.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser && existingUser.password === password) {
      const token = jwt.sign({ id: existingUser.id }, SECRET_KEY);
      res.json({ msg: "Logged in", token });
    } else {
      res.status(401).json({ msg: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
