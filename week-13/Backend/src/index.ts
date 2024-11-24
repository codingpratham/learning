import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';
import {userSigninSchema,userSignupSchema,blogCreateSchema,blogUpdateSchema} from '@pratham_koranne/medium-blog'
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
  Variables: {
    userId?: string;
  };
}>();

app.use(cors())

// Middleware for JWT verification
app.use('/api/v1/blog/*', async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader) {
    return c.json({ error: 'Unauthorized: Missing Authorization header' }, 401);
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return c.json({ error: 'Unauthorized: Invalid token format' }, 401);
  }

  try {
    const payload = await verify(token, c.env.JWT_SECRET_KEY);
    if (!payload || typeof payload.id !== 'string') {
      throw new Error('Invalid token payload');
    }

    c.set('userId', payload.id); // Correctly setting the userId
    await next();
  } catch (error) {
    console.error('JWT verification error:', error);
    return c.json({ error: 'Unauthorized: Invalid or expired token' }, 401);
  }
});


// Zod schemas for validation


// User Signup
app.post('/api/v1/user/signup', async (c) => {
  const prisma = new PrismaClient({
    datasources: { db: { url: c.env.DATABASE_URL } },
  }).$extends(withAccelerate());

  try {
    const parsedBody = userSignupSchema.safeParse(await c.req.json());
    if (!parsedBody.success) {
      return c.json({ msg: 'Invalid input', errors: parsedBody.error.flatten() }, 400);
    }

    const { name, email, password } = parsedBody.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return c.json({ msg: 'Email already exists' }, 400);
    }

    const user = await prisma.user.create({
      data: { name, email, password },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET_KEY);

    return c.json({ msg: 'User created successfully', token: jwt });
  } catch (error) {
    console.error('Signup error:', error);
    return c.text('An error occurred', 500);
  } finally {
    await prisma.$disconnect();
  }
});

// User Signin
app.post('/api/v1/user/signin', async (c) => {
  const prisma = new PrismaClient({
    datasources: { db: { url: c.env.DATABASE_URL } },
  }).$extends(withAccelerate());

  try {
    const parsedBody = userSigninSchema.safeParse(await c.req.json());
    if (!parsedBody.success) {
      return c.json({ msg: 'Invalid input', errors: parsedBody.error.flatten() }, 400);
    }

    const { email, password } = parsedBody.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      return c.json({ msg: 'Invalid credentials' }, 401);
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET_KEY);

    return c.json({ msg: 'Signed in successfully', token: jwt, id: user.id });
  } catch (error) {
    console.error('Signin error:', error);
    return c.text('An error occurred', 500);
  } finally {
    await prisma.$disconnect();
  }
});

app.get('/fetch',async(c)=>{
  const prisma = new PrismaClient({
    datasources: { db: { url: c.env.DATABASE_URL } },
  }).$extends(withAccelerate());

  const user=  await prisma.user.findMany({})

  return  c.json({ user})
})

// Create Blog Post
app.post('/api/v1/blog/creating', async (c) => {
  const userId = c.get('userId');
  if (!userId) return c.text('Unauthorized', 401);
  

  const parsedBody = blogCreateSchema.safeParse(await c.req.json());
  if (!parsedBody.success) {
    return c.json({ msg: 'Invalid input', errors: parsedBody.error.flatten() }, 400);
  }

  const prisma = new PrismaClient({
    datasources: { db: { url: c.env.DATABASE_URL } },
  }).$extends(withAccelerate());

  try {
    const { title, content } = parsedBody.data;

    const post = await prisma.post.create({
      data: { title, content, authorId: userId, published: true },
    });

    return c.json({ msg: 'Post created successfully', id: post.id });
  } catch (error) {
    console.error('Create post error:', error);
    return c.text('An error occurred', 500);
  } finally {
    await prisma.$disconnect();
  }
});

// Update Blog Post
app.put('/api/v1/blog/update', async (c) => {
  const userId = c.get('userId');
  if (!userId) return c.text('Unauthorized', 401);

  const parsedBody = blogUpdateSchema.safeParse(await c.req.json());
  if (!parsedBody.success) {
    return c.json({ msg: 'Invalid input', errors: parsedBody.error.flatten() }, 400);
  }

  const prisma = new PrismaClient({
    datasources: { db: { url: c.env.DATABASE_URL } },
  }).$extends(withAccelerate());

  try {
    const { id, title, content } = parsedBody.data;

    await prisma.post.update({
      where: { id, authorId: userId },
      data: { title, content },
    });

    return c.text('Post updated successfully');
  } catch (error) {
    console.error('Update post error:', error);
    return c.text('An error occurred', 500);
  } finally {
    await prisma.$disconnect();
  }
});

// Fetch Single Blog Post
app.get('/api/v1/blog/:id', async (c) => {
  const id = c.req.param('id');

  const prisma = new PrismaClient({
    datasources: { db: { url: c.env.DATABASE_URL } },
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return c.text('Post not found', 404);

    return c.json(post);
  } catch (error) {
    console.error('Fetch post error:', error);
    return c.text('An error occurred', 500);
  } finally {
    await prisma.$disconnect();
  }
});
  
// Fetch Bulk Blog Posts
app.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const posts = await prisma.post.findMany({});

	return c.json(posts);
})

export default app;
