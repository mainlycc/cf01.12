import { sql } from '@vercel/postgres';

async function seedDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS revenue (
        id SERIAL PRIMARY KEY,
        month VARCHAR(4) NOT NULL,
        revenue INT NOT NULL
      );
    `;

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

seedDatabase();