import { Client } from 'pg';

async function insertUserAndAddress(
    username: string,
    email: string,
    password: string,
    city: string,
    country: string,
    street: string,
    pincode: string
) {
    const client = new Client({
        connectionString: 'postgresql://test_owner:9LrIVpsfZuw1@ep-square-dew-a561i974.us-east-2.aws.neon.tech/test?sslmode=require'
    })

    try {
        await client.connect();

        // Start transaction
        await client.query('BEGIN');

        // Insert user
        const insertUserText = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id;
        `;
        const userRes = await client.query(insertUserText, [username, email, password]);
        const userId = userRes.rows[0].id;

        // Insert address using the returned user ID
        const insertAddressText = `
            INSERT INTO addresses (user_id, city, country, street, pincode)
            VALUES ($1, $2, $3, $4, $5);
        `;
        await client.query(insertAddressText, [userId, city, country, street, pincode]);

        // Commit transaction
        await client.query('COMMIT');

        console.log('User and address inserted successfully');
    } catch (err) {
        await client.query('ROLLBACK'); // Roll back the transaction on error
        console.error('Error during transaction, rolled back.', err);
        throw err;
    } finally {
        await client.end(); // Close the client connection
    }
}

// Example usage
insertUserAndAddress(
    'johndoe',
    'john.doe@example.com',
    'securepassword123',
    'New York',
    'USA',
    '123 Broadway St',
    '10001'
);

// async function getuser(email: string) {
//     const client = new Client({
//         connectionString: 'postgresql://test_owner:9LrIVpsfZuw1@ep-square-dew-a561i974.us-east-2.aws.neon.tech/test?sslmode=require'
//     })

//     try {
//         await client.connect();
//         const insertQuery = "SELECT * FROM users WHERE email = $1";
//         const values = [email];
//         const result = await client.query(insertQuery, values);
//         console.log("Result: ", result);

//         if (result.rows.length > 0) {
//             console.log('User found:', result.rows[0]); // Output user data
//             return result.rows[0]; // Return the user data
//         } else {
//             console.log('No user found with the given email.');
//             return null; // Return null if no user was found
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

// getuser('raj@gmail.com');

// async function createAddressTable() {
//     const client = new Client({
//         connectionString: 'postgresql://test_owner:9LrIVpsfZuw1@ep-square-dew-a561i974.us-east-2.aws.neon.tech/test?sslmode=require'
//     })
//     await client.connect();
//     const result = await client.query(`
//         CREATE TABLE addresses (
//             id SERIAL PRIMARY KEY,
//             user_id INTEGER NOT NULL,
//             city VARCHAR(100) NOT NULL,
//             country VARCHAR(100) NOT NULL,
//             street VARCHAR(255) NOT NULL,
//             pincode VARCHAR(20),
//             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//             FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
//         );
//     `);
//     console.log(result)
// }

// createAddressTable();

// async function insertAddressData(user_id: number, city: string, country: string, street: string, pincode: string) {
//     const client = new Client({
//         connectionString: 'postgresql://test_owner:9LrIVpsfZuw1@ep-square-dew-a561i974.us-east-2.aws.neon.tech/test?sslmode=require'
//     })

//     async function getUserDetails(id: number) {
//         const insertQuery = "SELECT city, country, street, pincode FROM addresses WHERE user_id = $1"
//         const values = [id];
//         const res = await client.query(insertQuery, values);
//         console.log("user detail: ", res)
//     }

//     try {
//         await client.connect();
//         const insertQuery = "INSERT INTO addresses (user_id, city, country, street, pincode) VALUES ($1, $2, $3, $4, $5)";
//         const values = [user_id, city, country, street, pincode];
//         const res = await client.query(insertQuery, values);
//         getUserDetails(user_id);
//     } catch (error) {
//         console.log(error)
//     }
// }

// insertAddressData(2, "London", "UK", "Berrington", "222333");

// async function insertData(username: string, email: string, password: string) {
//     const client = new Client({
//         connectionString: 'postgresql://test_owner:9LrIVpsfZuw1@ep-square-dew-a561i974.us-east-2.aws.neon.tech/test?sslmode=require'
//     })

//     try {
//         await client.connect();
//         const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
//         const values = [username, email, password];
//         const res = await client.query(insertQuery, values);
//         console.log("Res: ", res);
//     } catch (error) {
//         console.log(error)
//     }
// }

// insertData('rohit', 'rohit@gmail.com', 'rohit@123');

// async function createUsersTable() {
//     await client.connect();
//     const result = await client.query(`
//         CREATE TABLE users (
//             id SERIAL PRIMARY KEY,
//             username VARCHAR(50) UNIQUE NOT NULL,
//             email VARCHAR(255) UNIQUE NOT NULL,
//             password VARCHAR(255) NOT NULL,
//             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//         );
//     `);
//     console.log(result)
// }

// createUsersTable();