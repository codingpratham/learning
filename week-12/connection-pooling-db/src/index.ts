import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export interface Env{
	DATABASE_URL: string;
}

export default{
	async fetch(
		request:Request,
		env:Env,
		ctx:ExecutionContext
	):Promise<Response>{

		const prisma= new PrismaClient({
			datasourceUrl:env.DATABASE_URL
		}).$extends(withAccelerate())
		
	const respone=	await prisma.log.create({
		data:{
			level:"Info",
			message:`htftfty`,
			meta:{
				headers:JSON.stringify(request.headers)
			}
		}
	})

	// const {data,info}=await prisma.log.findMany({
	// 	take:20,
	// 	orderBy:{
	// 		id:'desc'
	// 	}
	// })
	// .withAccelerateInfo()
	
	console.log(JSON.stringify(respone));

	return Response.json(respone)
	
}
	
	
}