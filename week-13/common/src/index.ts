import z from 'zod'

export const userSignupSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  });

export type SignupType=z.infer<typeof userSignupSchema>
  
export const userSigninSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });
  
  export type SigninType = z.infer<typeof userSigninSchema>

export const blogCreateSchema = z.object({
    title: z.string(),
    content: z.string(),
  });
  
  export type blogType = z.infer<typeof blogCreateSchema>

export const blogUpdateSchema = z.object({
    id: z.string(),
    title: z.string().optional(),
    content: z.string().optional(),
  });
  export type blogUpdateType = z.infer<typeof blogUpdateSchema>
