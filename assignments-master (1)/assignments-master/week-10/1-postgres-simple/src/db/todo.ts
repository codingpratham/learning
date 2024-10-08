import { client } from "../index";

// Define interfaces for the Todo object
interface Todo {
    title: string;
    description: string;
    done: boolean;
    id: number;
    userId: number; // Make sure this matches your database column
}

/*
 * Function to insert a new todo for a user
 * Should return a todo object or null if fails
 */
export async function createTodo(userId: number, title: string, description: string): Promise<Todo | null> {
    try {
        await client.connect();

        const createQuery = `
            INSERT INTO todo (userId, title, description, done) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *`;
        
        const values = [userId, title, description, false]; // 'done' starts as false
        const result = await client.query(createQuery, values);

        if (result.rows.length > 0) {
            return result.rows[0] as Todo; // Return the created todo object
        }
        return null;

    } catch (error) {
        console.error("Error while creating todo", error);
        throw error;
    } finally {
        await client.end();
    }
}

/*
 * Mark done as true for this specific todo
 * Should return a todo object or null if fails
 */
export async function updateTodo(todoId: number): Promise<Todo | null> {
    try {
        await client.connect();

        const updateQuery = `
            UPDATE todo 
            SET done = true 
            WHERE id = $1 
            RETURNING *`;
        
        const values = [todoId];
        const result = await client.query(updateQuery, values);

        if (result.rows.length > 0) {
            return result.rows[0] as Todo; // Return the updated todo object
        }
        return null;

    } catch (error) {
        console.error("Error while updating todo", error);
        throw error;
    } finally {
        await client.end();
    }
}

/*
 * Get all the todos of a given user
 * Should return an array of todos
 */
export async function getTodos(userId: number): Promise<Todo[]> {
    try {
        await client.connect();

        const getQuery = `SELECT * FROM todo WHERE userId = $1`;
        const values = [userId];
        const result = await client.query(getQuery, values);

        return result.rows as Todo[]; // Return an array of todos

    } catch (error) {
        console.error("Error while retrieving todos", error);
        throw error;
    } finally {
        await client.end();
    }
}
