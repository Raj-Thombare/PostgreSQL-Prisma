import { Client } from "pg";


async function getUserDetailsWithAddress(userId: string) {
    const client = new Client({
        connectionString: 'postgresql://test_owner:9LrIVpsfZuw1@ep-square-dew-a561i974.us-east-2.aws.neon.tech/test?sslmode=require'
    })

    try {
        await client.connect();
        const query = `
            SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
            FROM users u
            JOIN addresses a ON u.id = a.user_id
            WHERE u.id = $1
        `;
        const result = await client.query(query, [userId]);

        if (result.rows.length > 0) {
            console.log('User and address found:', result.rows[0]);
            return result.rows[0];
        } else {
            console.log('No user or address found with the given ID.');
            return null;
        }
    } catch (err) {
        console.error('Error during fetching user and address:', err);
        throw err;
    } finally {
        await client.end();
    }
}

getUserDetailsWithAddress("1");

