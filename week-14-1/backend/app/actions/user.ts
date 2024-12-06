'use server'
import prisma from "../db";
export async function signUp(username: string, password: string){
   const users= await prisma.user.create({
        data:{
            username:username,
            password:password
        }
    })
    console.log(users.id)
}

export async function getUser(){
    const user=await prisma.user.findMany()
    return user
}