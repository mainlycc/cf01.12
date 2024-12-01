import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

export async function savePersonalData(name: string, postalCode: string) {
  noStore();
  try {
    const result = await sql`
      INSERT INTO personal_data (name, postal_code)
      VALUES (${name}, ${postalCode})
      RETURNING id;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Nie udało się zapisać danych osobowych.');
  }
}

export async function fetchRevenue() {
  // Opcjonalnie wyłącz cache
  noStore();

  try {
    const data = await sql`SELECT * FROM revenue`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}