import {Client} from 'pg'

export async function InsertData(
    username:string,
    email:string,
    password:string,
){
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'mysecretpassword',
        database: 'postgres'
    })

    try {
        await client.connect()

        const insertQuery=`
        INSERT INTO users(username, email, password)
        VALUES
        ($1, $2, $3)
        `

        const values=[
            username, 
            email, 
            password
        ]

        const res=await client.query(insertQuery,values)

        console.log("successfully inserted",res);
        
    } catch (error) {
        console.log(error);
    }finally{
        await client.end()
    }
}

// InsertData('gkffhu','bdyhubwhuf@gmail.com',"bdbluyh")

export async function getUserData(email:string){
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'mysecretpassword',
        database: 'postgres'
    })

    try {
        await client.connect()

        const selectQuery=`
        SELECT * FROM users
        WHERE email=$1
        `
        const values=[
            email
        ]

        const res=await client.query(selectQuery,values)

        if (res.rows.length>0){
            console.log("User data:",res.rows[0]);
            return res.rows[0]
        }else{
            console.log("User not found");
            return null
        }
    } catch (error) {
        console.log(error); 
    }finally{
        await client.end()
    }
}
