import {PrismaClient} from '@prisma/client'
import { log } from 'console'

const prisma=new PrismaClient()

const InsertData=async(
    username:string,
    email:string,
    password:string,
    lastname:string,
)=>{

    const res=await prisma.user.create({
        data:{
            username,
            email,
            password,
            lastname
        },
        select:{
            id:true,
            password:true
        }
    })

    console.log(res);
    
}

InsertData('John','johndoe@example.com','password123','Doe')

interface UpdateData {
    username: string;
    lastname: string;
}

const updateData = async (email: string, { username, lastname }: UpdateData) => {
    const res = await prisma.user.update({
        where: {
            email,
        },
        data: {
            username,
            lastname,
        },
    });
    console.log(res);
};

// // Calling the function
// updateData("johndoe@example.com", {
//     username: "Jane Doe",
//     lastname: "Smith",
// });

const getUser= async (email: string)=>{
    const res=await prisma.user.findUnique({
        where:{
            email
        },
        select:{
            id:true,
            username:true,
            email:true,
            lastname:true
        }
    })
    console.log(res);
}

getUser('johndoe@example.com')

const deleteUser=async(email:string)=>{
    const res =await prisma.user.delete({
        where:{
            email
        },select:{
            id:true,
            username:true,
            email:true,
            lastname:true
        }
    })
    console.log(res);
}

// deleteUser('johndoe@example.com')