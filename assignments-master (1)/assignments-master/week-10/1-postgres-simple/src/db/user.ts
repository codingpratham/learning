import { client } from "../index";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
interface User {
    username: string;
    password: string;
    name: string;
}
export async function createUser(username: string, password: string, name: string): Promise<User | null> {
    try {
        await client.connect();

        const insertQuery = `
            INSERT INTO users (username, password, name) 
            VALUES ($1, $2, $3) 
            RETURNING *`;
        
        const values = [username, password, name];
        const result = await client.query(insertQuery, values);

        console.log("Successfully inserted into the users table:", result.rows[0]);
        return result.rows[0]; // Return the created user object

    } catch (error) {
        console.error("Error while creating user", error);
        throw error; // Optional: rethrow the error for higher-level handling
    } finally {
        await client.end();
    }
}

/*
 * Should return the User object
 */
export async function getUser(userId: number): Promise<User | null> {
    try {
        await client.connect();

        const selectQuery = `SELECT * FROM users WHERE id = $1`;
        const values = [userId];

        const result = await client.query(selectQuery, values);

        console.log("Retrieved user:", result.rows[0]);
        return result.rows[0]; // Return the user object

    } catch (error) {
        console.error("Error while retrieving user", error);
        throw error; // Optional: rethrow the error for higher-level handling
    } finally {
        await client.end();
    }
}