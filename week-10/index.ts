import { Client } from "pg"
const client =new Client({
    connectionString:"postgresql://postgres:mysecretpassword@localhost/postgres"
})

async function createUserTable(){
    await client.connect()
    const result=await client.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
    `)

    console.log(result)
}

createUserTable()