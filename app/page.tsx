import { Client } from 'pg';
import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';
import dotenv from 'dotenv';

dotenv.config();

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const connectionString = process.env.POSTGRES_URL_NON_POOLING;

  const client = new Client({ connectionString });
  await client.connect();
  const search = searchParams.q ?? '';

  try {
    console.log("this is a change here")
    const result = await client.query(`
      SELECT id, name, username, email 
      FROM users 
      WHERE name ILIKE $1;
    `, [`%${search}%`]);

    console.log("this is a change here")
    const users = result.rows as User[];

    console.log("this is a change here")
    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Title>Users</Title>
        <Text>A list of users retrieved from a Postgres database.</Text>
        <Search />
        <Card className="mt-6">
          <UsersTable users={users} />
        </Card>
      </main>
    );
  } catch (error) {
    console.log("this is a change here")
    console.error('Error fetching users:', error);
    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Title>Users</Title>
        <Text>Failed to retrieve users from the database.</Text>
      </main>
    );
  } finally {
    console.log("this is a change here")
    await client.end();
  }
}
