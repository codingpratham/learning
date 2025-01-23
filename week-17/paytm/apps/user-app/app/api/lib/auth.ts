/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import prisma from '@repo/db/client'

export const authOptions = () => {
    return {
        providers: [
            Credentials({
                name: "credentials",
                credentials: {
                    phone: { label: "Phone", type: "text", placeholder: "98xxxxxxxx7" },
                    password: { label: "Password", type: "password", placeholder: "password" }
                },
                async authorize(credentials: any) {
                    const hashedPasssword = await bcrypt.hash(credentials.password, 10)
                    const existingUser = await prisma.user.findFirst({
                        where: {
                            number: credentials.phone
                        }
                    })

                    if (existingUser) {
                        const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password)
                        if (passwordValidation) {
                            return {
                                id: existingUser.id.toString(),
                                name: existingUser.name,
                                email: existingUser.number
                            }
                        }
                        return null;
                    }
                    try {
                        const user = await prisma.user.create({
                            data: {
                                number: credentials.phone,
                                password: hashedPasssword
                            }
                        })
                        return {
                            id: user.id.toString(),
                            name: user.name,
                            email: user.number
                        }
                    } catch (error) {
                        console.error(error)
                    }
                    return null
                }

            })
        ],
        secret: process.env.NEXTAUTH_SECRET || "secret",
        callback:{
            async session ({token,session}:any){
                session.user.id = token.sub
                return session
            },
        }
    }
}