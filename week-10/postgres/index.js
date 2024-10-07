"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.createUser = exports.createTable = void 0;
const pg_1 = require("pg");
const createTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = new pg_1.Client({
        connectionString: 'postgresql://postgres:newpassword@localhost:5432/postgres?sslmode=disable',
    });
    try {
        yield client.connect();
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
        yield client.query(USERtableQuery);
        yield client.query(AddressTable);
        console.log("Tables created successfully");
    }
    catch (error) {
        console.error("Error creating tables:", error);
    }
    finally {
        yield client.end();
    }
});
exports.createTable = createTable;
const createUser = (username, email, password, city, country, street, pincode) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new pg_1.Client({
        connectionString: 'postgresql://postgres:newpassword@localhost:5432/postgres?sslmode=disable',
    });
    try {
        yield client.connect();
        yield client.query('BEGIN'); // Start a transaction
        const userQuery = `INSERT INTO newusers (username, email, password) VALUES ($1, $2, $3) RETURNING id`;
        const userValues = [username, email, password];
        const userRes = yield client.query(userQuery, userValues);
        const userId = userRes.rows[0].id;
        const addressQuery = `INSERT INTO address_table (user_id, city, country, street, pincode) VALUES ($1, $2, $3, $4, $5)`;
        const addressValues = [userId, city, country, street, pincode];
        yield client.query(addressQuery, addressValues);
        yield client.query('COMMIT'); // Commit the transaction
        console.log('User and Address created successfully');
    }
    catch (error) {
        yield client.query('ROLLBACK'); // Rollback transaction in case of error
        console.error('Error creating user and address:', error);
    }
    finally {
        yield client.end();
    }
});
exports.createUser = createUser;
const getUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new pg_1.Client({
        connectionString: 'postgresql://postgres:newpassword@localhost:5432/postgres?sslmode=disable',
    });
    try {
        yield client.connect();
        // Corrected SQL query to join newusers with address_table
        const getUser = `
      SELECT u.*, a.* 
      FROM newusers u
      LEFT JOIN address_table a ON u.id = a.user_id
      WHERE u.email = $1
    `;
        // Pass the email as a parameter
        const result = yield client.query(getUser, [email]);
        // Check if user exists and log before return
        if (result.rows.length > 0) {
            console.log(result.rows[0]); // Log user details along with address
            return result.rows[0]; // Return the user details
        }
        else {
            console.log("User not found");
            return null; // Return null if no user found
        }
    }
    catch (error) {
        console.error("Error fetching user:", error); // Log error
    }
    finally {
        yield client.end(); // Ensure the client is closed
    }
});
exports.getUser = getUser;
// Example usage
(0, exports.getUser)('john.doe@example.com');
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
(0, exports.getUser)('john.doe@example.com');
