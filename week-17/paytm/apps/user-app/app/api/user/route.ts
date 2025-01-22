import {PrismaClient} from "@repo/db/client"
import { NextResponse } from "next/server"

const client= new PrismaClient()

export const GET=async()=>{
    await client.user.create({
        data:{
            name:"Pratham",
            email:"pratham@gmail.com",
            password:"12345"
        }
    })

    return NextResponse.json({
        msg:"hii there"
    })
}