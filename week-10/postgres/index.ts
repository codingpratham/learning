import { Client } from 'pg';

export const createTable = async () => {
  const client = new Client({
    connectionString: 'postgresql://postgres:newpassword@localhost:5432/postgres?sslmode=disable',
  });

  try {
    await client.connect();

    const USERtableQuery = `CREATE TABLE IF NOT EXISTS newusers (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    const AddressTable = `CREATE TABLE IF NOT EXISTS address_table (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES newusers(id) ON DELETE CASCADE,
      city VARCHAR(255) NOT NULL,
      country VARCHAR(255) NOT NULL,
      street VARCHAR(255) NOT NULL,
      pincode VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    await client.query(USERtableQuery);
    await client.query(AddressTable);

    console.log("Tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  } finally {
    await client.end();
  }
};

export const createUser = async (
  username: string,
  email: string,
  password: string,
  city: string,
  country: string,
  street: string,
  pincode: string
) => {
  const client = new Client({
    connectionString: 'postgresql://postgres:newpassword@localhost:5432/postgres?sslmode=disable',
  });

  try {
    await client.connect();

    await client.query('BEGIN'); // Start a transaction

    const userQuery = `INSERT INTO newusers (username, email, password) VALUES ($1, $2, $3) RETURNING id`;
    const userValues = [username, email, password];
    const userRes = await client.query(userQuery, userValues);
    const userId = userRes.rows[0].id;

    const addressQuery = `INSERT INTO address_table (user_id, city, country, street, pincode) VALUES ($1, $2, $3, $4, $5)`;
    const addressValues = [userId, city, country, street, pincode];
    await client.query(addressQuery, addressValues);

    await client.query('COMMIT'); // Commit the transaction

    console.log('User and Address created successfully');
  } catch (error) {
    await client.query('ROLLBACK'); // Rollback transaction in case of error
    console.error('Error creating user and address:', error);
  } finally {
    await client.end();
  }
};

export const getUser = async (email: string) => {
  const client = new Client({
    connectionString: 'postgresql://postgres:newpassword@localhost:5432/postgres?sslmode=disable',
  });

  try {
    await client.connect();

    // Corrected SQL query to join newusers with address_table
    const getUser = `
      SELECT u.*, a.* 
      FROM newusers u
      LEFT JOIN address_table a ON u.id = a.user_id
      WHERE u.email = $1
    `;

    // Pass the email as a parameter
    const result = await client.query(getUser, [email]);

    // Check if user exists and log before return
    if (result.rows.length > 0) {
      console.log(result.rows[0]); // Log user details along with address
      return result.rows[0]; // Return the user details
    } else {
      console.log("User not found");
      return null; // Return null if no user found
    }
  } catch (error) {
    console.error("Error fetching user:", error); // Log error
  } finally {
    await client.end(); // Ensure the client is closed
  }
};

// Example usage
getUser('john.doe@example.com');



// (async () => {
  // await createTable();

  // await createUser(
  //   'johndoe',
  //   'john.doe@example.com',
  //   'securepassword123',
  //   'New York',
  //   'USA',
  //   '123 Broadway St',
  //   '10001'
  // );
  
// })();
getUser('john.doe@example.com')

