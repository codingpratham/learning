import { Client } from 'pg';

// Function to insert data into the users table
export async function InsertData(
  username: string,
  email: string,
  password: string
): Promise<void> {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'mysecretpassword',
    database: 'postgres',
  });

  try {
    await client.connect();
    const insertQuery = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
    `;

    const values = [username, email, password];
    const res = await client.query(insertQuery, values);

    console.log("Successfully inserted:", res);
  } catch (error) {
    console.error("Insert error:", error);
  } finally {
    await client.end();
  }
}

// Function to fetch user data based on email
export async function getUserData(email: string): Promise<any | null> {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'mysecretpassword',
    database: 'postgres',
  });

  try {
    await client.connect();

    const selectQuery = `
      SELECT * FROM users
      WHERE email = $1
    `;
    const values = [email];
    const res = await client.query(selectQuery, values);

    if (res.rows.length > 0) {
      console.log("User data:", res.rows[0]);
      return res.rows[0];
    } else {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Select error:", error);
    return null;
  } finally {
    await client.end();
  }
}
