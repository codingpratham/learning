const {Client}=require('pg')

const client = new Client({
    connectionString: 'postgresql://postgres:newpassword@localhost:5432/postgres?sslmode=disable',
})

client.connect(err=>{
    if(err) {
        console.error('Connection error', err.stack)
    } else {
        console.log('Connected to the PostgreSQL database.')
    }
})

client.query('SELECT NOW()',(err,res)=>{
    if(err) {
        console.error('Query error', err.stack)
    } else {
        console.log('Current date and time:', res.rows[0].now)
    }
    client.end()
})