import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { z } from 'zod'
import dotenv from 'dotenv'
import { sign, verify} from 'hono/jwt'

dotenv.config()


// Initialize PrismaClient with Accelerate extension outside the route
const prisma = new PrismaClient().$extends(withAccelerate())

const app = new Hono()
app.use('/api/v1/blog/*',async(c,next)=>{
    const jwt=await c.req.header('Authorization')

    if(!jwt) return c.text('unauthorized')
    
        const token=jwt.split(' ')[1]

        const payload= await verify(token,process.env.JWT_TOKEN as string,)

        if(!payload) return c.text('unauthorized')

            c.set("userID",payload.id)
    await next()
})

const signUpBody = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(1),
  })


app.post('/api/v1/signup', async (c) => {
    try {
      // Parse and validate request body using Zod
      const body = await c.req.json()
      const parsedBody = signUpBody.safeParse(body)
  
      if (!parsedBody.success) {
        return c.json({ error: 'Invalid input', details: parsedBody.error.errors }, 400)
      }
  
      const { email, password, name } = parsedBody.data
  
      // Create a new user in the database
      const user = await prisma.user.create({
        data: {
          email,
          password,
          name,
        },
      })

      const jwt=await sign({id:user.id},process.env.JWT_SECRET as string,)
  
      return c.json({user,jwt})
    } catch (err) {
      console.error(err)
      return c.json({ error: 'An error occurred' }, 500)
    }
  })

  const signInBody=z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

app.post('/api/v1/signin', async (c) => {
  // Implement your signin logic here
  const body =await c.req.json()
  const parsedBody = signInBody.safeParse(body)

  if (!parsedBody.success) {
    return c.json({ error: 'Invalid input', details: parsedBody.error.errors }, 400)
  }

  const { email, password } = parsedBody.data

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user || user.password!== password) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  const jwt=await sign({id:user.id},process.env.JWT_SECRET as string,)
  
  return c.json({ user,jwt})

})

app.post('/api/v1/blog', async (c) => {
  // Implement your blog creation logic here
})

app.get('/api/v1/blog/:id', async (c) => {
  // Implement your blog retrieval logic here
})

app.put('/api/v1/blog/:id', async (c) => {
  // Implement your blog update logic here
})

export default app
