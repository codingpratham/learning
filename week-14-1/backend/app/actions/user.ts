import prisma from "../db";


export async function signUp(username: string, password: string){
    return await prisma.user.create({
        data:{

            username,
            password
        }
    })
}