import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma=new PrismaClient()

export async function POST(req:NextRequest){
    const body=await req.json()
    console.log(body);
    const user=prisma.user.create({
        data:{
            username:body.username,
            password:body.password
        }
    })

    console.log((await user).id);
    
    return NextResponse.json({
        msg:"signed Up"
    })
}

export async function GET(){
    const users=await prisma.user.findMany()
    return NextResponse.json(users)
}