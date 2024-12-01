import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

const DATABASE_URL = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DATABASE}?sslmode=require`;

export async function savePersonalData(name: string, postalCode: string) {
  noStore();
  try {
    console.log('Próba zapisania danych:', { name, postalCode });
    
    const result = await sql.query(
      'INSERT INTO personal_data (name, postal_code) VALUES ($1, $2) RETURNING id, name, postal_code',
      [name, postalCode]
    );
    
    console.log('Wynik zapytania:', result);
    return result.rows[0];
  } catch (error: any) {
    console.error('Szczegóły błędu bazy danych:', {
      message: error?.message,
      code: error?.code,
      detail: error?.detail,
      where: error?.where,
      hint: error?.hint,
      connectionString: DATABASE_URL.replace(process.env.POSTGRES_PASSWORD || '', '****')
    });
    throw new Error(`Nie udało się zapisać danych osobowych: ${error?.message || 'Nieznany błąd'}`);
  }
}

export async function fetchRevenue() {
  noStore();
  try {
    const data = await sql`SELECT * FROM revenue`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
} 